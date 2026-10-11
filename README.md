# StudentSense — Student At-Risk Prediction Dashboard

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

```powershell
cd frontend
npm install
npm run dev
```

Open the URL Vite prints, usually http://localhost:5173.

## Notes

- This is an educational decision-support prototype, not a substitute for educator judgement.
- Confirm the feature schema used in the prediction form matches the selected model's training pipeline.
- Do not commit secrets, personal student records, virtual environments, `node_modules/`, or generated model binaries.
- Interpret results with attention to recall, precision, class imbalance, and the cost of false negatives.
