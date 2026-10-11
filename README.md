# StudentSense — Student At-Risk Prediction Dashboard

<<<<<<< HEAD
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
=======
A full-stack academic prototype for exploring student academic risk using machine-learning classifiers.

## Project structure

- `frontend/` — React, Vite, and TypeScript dashboard
- `backend/` — FastAPI prediction/dashboard API
- `data/` — local CSV dataset location (dataset files are not committed)
- `models/` — locally generated model artifacts (not committed)
- `notebooks/` — model-development notebooks
- `reports/` — generated reports

## Requirements

- Python 3.10+
- Node.js 18+
- UCI Student Performance dataset files `student-mat.csv` and `student-por.csv`

## Run the backend (Windows PowerShell)

From the project root:

```powershell
py -m venv .venv
.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000
```

Place the CSV files directly in `data/` if the backend is configured to read them from that location. Check `backend/README.md` and the backend configuration for the expected path and file format.

API documentation: http://127.0.0.1:8000/docs

## Run the frontend

Open a second terminal:
>>>>>>> ebaafcaada1dd119841782ac13e8cea0431093eb

```powershell
cd frontend
npm install
npm run dev
```

<<<<<<< HEAD
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
=======
Open the URL Vite prints, usually http://localhost:5173.

## Notes

- This is an educational decision-support prototype, not a substitute for educator judgement.
- Confirm the feature schema used in the prediction form matches the selected model's training pipeline.
- Do not commit secrets, personal student records, virtual environments, `node_modules/`, or generated model binaries.
- Interpret results with attention to recall, precision, class imbalance, and the cost of false negatives.
>>>>>>> ebaafcaada1dd119841782ac13e8cea0431093eb
