# StudentSense backend

## Dataset required
Copy the UCI Student Performance files into the project's `data/` folder:
- `student-mat.csv`
- `student-por.csv`

They are semicolon-separated CSV files. This API uses `G3 < 10` as At-Risk and excludes `G1`, `G2`, and `G3` from predictors, matching the supplied notebooks' feature policy.

## Run on Windows
From the project root, open a terminal:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
py -m pip install -r backend/requirements.txt
py -m uvicorn backend.main:app --reload --host 127.0.0.1 --port 8000
```

On first dashboard request, the API trains the five demo pipelines and saves them to `models/`; computed holdout metrics are written to `reports/dashboard_model_metrics.csv`. First startup may take a little time, especially for SVM. The pipeline split is 80/20, stratified, random_state=42.

Routes:
- `GET /api/health`
- `GET /api/dashboard`
- `POST /api/predict`

**Prediction limitation:** The starter UI captures only a subset of the dataset's columns. For missing attributes the API uses median/mode values from the selected subject's full dataset. The response says so. For a real individual prediction, expand the form to collect all relevant fields.
