from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from sklearn.compose import ColumnTransformer
from sklearn.impute import SimpleImputer
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC

ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = Path(os.getenv("STUDENT_DATA_DIR", ROOT / "data"))
MODEL_DIR = ROOT / "models"
REPORT_DIR = ROOT / "reports"
TARGET_COLUMN = "G3"
RISK_THRESHOLD = 10
EXCLUDED_FEATURES = ["G1", "G2", "G3"]
SUBJECT_FILES = {"math": "student-mat.csv", "portuguese": "student-por.csv"}
SUBJECT_LABELS = {"math": "Mathematics", "portuguese": "Portuguese"}
MODEL_LABELS = {
    "logistic_regression": "Logistic Regression",
    "decision_tree": "Decision Tree",
    "random_forest": "Random Forest",
    "svm": "Support Vector Machine",
    "gradient_boosting": "Gradient Boosting",
}

app = FastAPI(title="StudentSense ML API", version="1.0.0")
app.add_middleware(
    CORSMiddleware, allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)
# Fitted pipelines and training reference rows are loaded/trained lazily.
registry: dict[str, dict[str, Any]] = {}
dashboard_cache: dict[str, Any] | None = None

class PredictionRequest(BaseModel):
    model: str
    subject: str = "math"
    student: dict[str, Any] = Field(default_factory=dict)

def model_factories():
    return {
        "logistic_regression": LogisticRegression(max_iter=2000, class_weight="balanced", random_state=42),
        "decision_tree": DecisionTreeClassifier(class_weight="balanced", random_state=42, max_depth=6),
        "random_forest": RandomForestClassifier(n_estimators=250, class_weight="balanced", random_state=42, min_samples_leaf=2),
        "svm": SVC(C=1.0, kernel="rbf", class_weight="balanced", probability=True, random_state=42),
        "gradient_boosting": GradientBoostingClassifier(random_state=42),
    }

def make_pipeline(X: pd.DataFrame, classifier):
    numeric = X.select_dtypes(include="number").columns.tolist()
    categorical = X.select_dtypes(exclude="number").columns.tolist()
    numeric_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="median")),
        ("scaler", StandardScaler()),
    ])
    categorical_pipeline = Pipeline([
        ("imputer", SimpleImputer(strategy="most_frequent")),
        ("onehot", OneHotEncoder(handle_unknown="ignore")),
    ])
    preprocessor = ColumnTransformer([
        ("numeric", numeric_pipeline, numeric),
        ("categorical", categorical_pipeline, categorical),
    ])
    return Pipeline([("preprocessor", preprocessor), ("classifier", classifier)])

def load_subject(subject: str) -> pd.DataFrame:
    path = DATA_DIR / SUBJECT_FILES[subject]
    if not path.exists():
        raise FileNotFoundError(
            f"Dataset not found: {path}. Put the UCI student data file in the project's data/ folder. "
            "Expected filenames: student-mat.csv and student-por.csv (semicolon-separated)."
        )
    return pd.read_csv(path, sep=";")

def ensure_trained():
    global dashboard_cache
    if registry:
        return
    all_metrics = []
    total_rows = 0
    total_risk = 0
    dist = {"Not At-Risk": 0, "At-Risk": 0}
    for subject, filename in SUBJECT_FILES.items():
        df = load_subject(subject)
        if TARGET_COLUMN not in df.columns:
            raise ValueError(f"{filename} must contain the target column G3.")
        y = (df[TARGET_COLUMN] < RISK_THRESHOLD).astype(int)
        X = df.drop(columns=[c for c in EXCLUDED_FEATURES if c in df.columns]).copy()
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=0.2, random_state=42, stratify=y
        )
        total_rows += len(df)
        total_risk += int(y.sum())
        dist["At-Risk"] += int(y.sum())
        dist["Not At-Risk"] += int((1-y).sum())
        for model_id, classifier in model_factories().items():
            key = f"{model_id}:{subject}"
            model_path = MODEL_DIR / f"dashboard_{model_id}_{subject}.joblib"
            # Use a saved dashboard pipeline only if it was created by this API version.
            if model_path.exists():
                try:
                    fitted = joblib.load(model_path)
                except Exception:
                    fitted = None
            else:
                fitted = None
            if fitted is None:
                fitted = make_pipeline(X_train, classifier)
                fitted.fit(X_train, y_train)
                MODEL_DIR.mkdir(parents=True, exist_ok=True)
                joblib.dump(fitted, model_path)
            pred = fitted.predict(X_test)
            try:
                prob = fitted.predict_proba(X_test)[:, 1]
                auc = float(roc_auc_score(y_test, prob))
            except Exception:
                auc = None
            metrics = {
                "accuracy": float(accuracy_score(y_test, pred)),
                "precision": float(precision_score(y_test, pred, zero_division=0)),
                "recall": float(recall_score(y_test, pred, zero_division=0)),
                "f1": float(f1_score(y_test, pred, zero_division=0)),
                "rocAuc": auc,
            }
            registry[key] = {
                "pipeline": fitted,
                "columns": X.columns.tolist(),
                "reference": X,
                "metrics": metrics,
                "n_test": len(X_test),
            }
            all_metrics.append({"subject": subject, "model": model_id, **metrics})
    REPORT_DIR.mkdir(parents=True, exist_ok=True)
    pd.DataFrame(all_metrics).to_csv(REPORT_DIR / "dashboard_model_metrics.csv", index=False)
    dashboard_cache = {
        "totalStudentsEvaluated": total_rows,
        "atRiskCount": total_risk,
        "classDistribution": [
            {"label": "Not At-Risk", "count": dist["Not At-Risk"]},
            {"label": "At-Risk", "count": dist["At-Risk"]},
        ],
        "models": [],
    }
    for model_id, label in MODEL_LABELS.items():
        entries = [r for k, r in registry.items() if k.startswith(model_id + ":")]
        # Average the two subject-specific held-out metrics, clearly labeled as an average.
        metric_names = ["accuracy", "precision", "recall", "f1", "rocAuc"]
        averaged = {}
        for name in metric_names:
            vals = [e["metrics"][name] for e in entries if e["metrics"][name] is not None]
            averaged[name] = float(np.mean(vals)) if vals else None
        dashboard_cache["models"].append({
            "id": model_id, "label": label, "status": "ready", "metrics": averaged,
        })

@app.get("/api/health")
def health():
    return {"status": "ok", "service": "StudentSense ML API"}

@app.get("/api/dashboard")
def dashboard():
    try:
        ensure_trained()
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    return dashboard_cache

@app.post("/api/predict")
def predict(request: PredictionRequest):
    try:
        ensure_trained()
    except Exception as exc:
        raise HTTPException(status_code=503, detail=str(exc))
    if request.model not in MODEL_LABELS:
        raise HTTPException(status_code=400, detail=f"Unknown model '{request.model}'.")
    if request.subject not in SUBJECT_FILES:
        raise HTTPException(status_code=400, detail="subject must be 'math' or 'portuguese'.")
    record = registry.get(f"{request.model}:{request.subject}")
    if not record:
        raise HTTPException(status_code=500, detail="Model is not available.")
    # The UI currently captures a subset of attributes. Other fields use a representative
    # row from that subject's training dataset; the response discloses this limitation.
    reference = record["reference"]
    sample = {}
    for col in record["columns"]:
        series = reference[col]
        if pd.api.types.is_numeric_dtype(series):
            sample[col] = float(series.median())
            if float(sample[col]).is_integer():
                sample[col] = int(sample[col])
        else:
            modes = series.mode(dropna=True)
            sample[col] = str(modes.iloc[0]) if not modes.empty else ""
    for key, value in request.student.items():
        if key in sample:
            sample[key] = value
    frame = pd.DataFrame([sample], columns=record["columns"])
    pipeline = record["pipeline"]
    try:
        predicted = int(pipeline.predict(frame)[0])
        probability = None
        if hasattr(pipeline, "predict_proba"):
            probability = float(pipeline.predict_proba(frame)[0][1])
    except Exception as exc:
        raise HTTPException(status_code=422, detail=f"Could not process student features: {exc}")
    return {
        "model": request.model,
        "prediction": predicted,
        "label": "At-Risk" if predicted == 1 else "Not At-Risk",
        "probability": probability,
        "note": "Prediction from a locally trained pipeline. The form currently supplies only some dataset fields; unspecified attributes were filled with representative median/mode values. Treat this as a demo, not an individual student decision.",
        "subject": request.subject,
    }
