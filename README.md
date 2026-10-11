# StudentSense — Student At-Risk Prediction Dashboard

This is a complete starter project containing the React dashboard, FastAPI backend, and the five supplied ML notebooks.

## Project structure

```text
student-at-risk-full-project/
├── backend/       # FastAPI API + model training on first request
├── data/          # Put student-mat.csv and student-por.csv here
├── frontend/      # Complete React/Vite dashboard UI
├── models/        # Trained API pipelines are saved here automatically
├── notebooks/     # Your five supplied notebooks, unchanged
└── reports/       # Computed API metrics CSV is written here
```

## 1. Add the dataset files

Put these UCI Student Performance CSV files into `data/`:
- `student-mat.csv`
- `student-por.csv`

Keep the original filenames. The notebooks indicate the files are semicolon-separated.

## 2. Start the backend (Windows PowerShell)

Open a terminal at this project root and run:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r backend/requirements.txt
py -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

If PowerShell blocks activation, you can skip activation and use `.venv\Scripts\python.exe -m pip install -r backend/requirements.txt`, then `.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000`.

The API trains model pipelines on the first request and saves them under `models/`. Evaluation metrics are computed from a stratified 80/20 holdout split (random_state=42) and written to `reports/dashboard_model_metrics.csv`. These API metrics are newly computed baseline demo models; they are not claimed to be the exact tuned metrics from each notebook.

## 3. Start the frontend

Open a **second terminal** and run:

```powershell
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite (usually `http://localhost:5173`).

## Models included in the dashboard

- Logistic Regression
- Decision Tree
- Random Forest
- Support Vector Machine (SVM)
- Gradient Boosting

The backend uses scikit-learn pipelines with median imputation and scaling for numeric features, and most-frequent imputation plus one-hot encoding for categorical features. `G3 < 10` defines At-Risk (1); `G1`, `G2`, and `G3` are excluded from predictors, following the provided notebooks' feature policy.

## Important prediction limitation

The current UI form only collects a subset of student attributes. To make the API callable now, missing features are filled using median/mode values from the selected subject's dataset. The prediction response explicitly discloses this. **Do not treat that output as a reliable individual student assessment.** Before a serious demo, expand the form to collect the complete relevant feature set and align it to the exact model/data policy approved for your assignment.

## Troubleshooting

- `Dataset not found`: add the two CSV files to `data/`.
- API unavailable in the UI: start the backend on port 8000, then refresh the dashboard.
- First API request takes time: the backend fits models and saves them on first use.
- If you already have saved model artifacts from your notebooks, this starter backend currently trains its own consistently preprocessed demo pipelines; it does not silently claim to use notebook artifacts.
