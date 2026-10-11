# StudentSense — Early Identification of At-Risk Students Using Machine Learning

![Python](https://img.shields.io/badge/Python-3.10%2B-blue)
![React](https://img.shields.io/badge/React-18-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688)
![Machine Learning](https://img.shields.io/badge/Machine%20Learning-Classification-orange)
![Status](https://img.shields.io/badge/Project-Academic%20Prototype-purple)

**Module:** IT3091 – Machine Learning  
**Group:** 2026-AI-53  
**Repository:** [harini281/ml_assignment_final](https://github.com/harini281/ml_assignment_final)

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Problem Statement](#2-problem-statement)
3. [Project Objectives](#3-project-objectives)
4. [Technology Stack](#4-technology-stack)
5. [Dataset Description](#5-dataset-description)
6. [Target Variable](#6-target-variable)
7. [Machine Learning Models](#7-machine-learning-models)
8. [Model Evaluation Metrics](#8-model-evaluation-metrics)
9. [Model Comparison](#9-model-comparison)
10. [Comparison and Discussion](#10-comparison-and-discussion)
11. [System Architecture](#11-system-architecture)
12. [Dashboard Features](#12-dashboard-features)
13. [Project Structure](#13-project-structure)
14. [Installation and Setup](#14-installation-and-setup)
15. [Backend API Endpoints](#15-backend-api-endpoints)
16. [Machine Learning Workflow](#16-machine-learning-workflow)
17. [Reproducibility and Data Integrity](#17-reproducibility-and-data-integrity)
18. [Limitations](#18-limitations)
19. [Future Improvements](#19-future-improvements)
20. [Ethical Considerations](#20-ethical-considerations)
21. [Acknowledgements](#21-acknowledgements)
22. [Conclusion](#22-conclusion)

---

## 1. Project Overview

StudentSense is a machine-learning-based academic decision-support web application developed to explore the early identification of students who may be at risk of poor academic performance.

The system applies supervised machine learning classification techniques to student performance data. It classifies students into two categories:

- **At-Risk:** Students classified by the model as potentially requiring additional academic support.
- **Not At-Risk:** Students not classified as at risk by the selected model.

The project combines data analysis, machine learning model development, performance evaluation, backend API development, and frontend dashboard implementation.

The web application provides an overview of student classification statistics, a student prediction interface, and a comparison of five machine learning models.

StudentSense is an academic prototype intended to demonstrate the potential of predictive analytics in supporting early academic intervention. Its predictions should be interpreted as estimates rather than definitive assessments of students.

## 2. Problem Statement

Students may encounter academic difficulties for a variety of reasons. However, these difficulties are not always identified early enough for appropriate support to be provided.

Traditional approaches may depend on manual observation or the retrospective examination of academic results. Machine learning can help analyse student-related data and identify patterns associated with academic risk.

This project investigates how supervised classification algorithms can be used to predict academic risk and how their results can be presented through an interactive web-based dashboard.

The goal is to support the exploration of data-informed academic interventions while recognising that predictive models cannot fully represent the individual circumstances of every student.

## 3. Project Objectives

The main objectives of StudentSense are to:

1. Explore and understand student performance data.
2. Perform data preparation and preprocessing for machine learning.
3. Define a binary academic risk classification target.
4. Develop multiple supervised classification models.
5. Evaluate model performance using appropriate classification metrics.
6. Compare baseline and tuned models where tuning is implemented.
7. Develop a web-based dashboard for displaying model performance.
8. Provide an interface for entering student information and requesting predictions.
9. Integrate the frontend with a Python-based backend API.
10. Present prediction results in an understandable format.
11. Demonstrate how machine learning could support early academic risk identification.

## 4. Technology Stack

| Component | Technologies |
|---|---|
| Programming language | Python |
| Frontend framework | React |
| Frontend language | TypeScript |
| Frontend build tool | Vite |
| Styling | CSS |
| Backend framework | FastAPI |
| Machine learning | scikit-learn |
| Data manipulation | Pandas, NumPy |
| Model evaluation | scikit-learn metrics |
| Dashboard charts | Recharts |
| API documentation | FastAPI / Swagger UI |
| Notebook environment | Jupyter Notebook |
| Code editor | Visual Studio Code |
| Version control | Git and GitHub |

## 5. Dataset Description

The project uses the **Student Performance Dataset** from the UCI Machine Learning Repository.

**Official dataset:**  
https://archive.ics.uci.edu/dataset/320/student%2Bperformance

The dataset contains student demographic, social, and academic information that can be explored to investigate factors associated with student performance.

The dataset provides two CSV files:

| File | Description |
|---|---|
| `student-mat.csv` | Student performance data for Mathematics |
| `student-por.csv` | Student performance data for Portuguese |

The original files are semicolon-separated CSV files.

### Dataset preparation

The general data preparation workflow includes:

1. Loading the CSV files.
2. Inspecting columns, data types, and dataset dimensions.
3. Performing exploratory data analysis.
4. Examining class distributions and feature relationships.
5. Identifying and handling data quality issues where necessary.
6. Preparing numerical and categorical features.
7. Defining the target variable.
8. Separating the features and target.
9. Creating training and testing datasets.

The exact preprocessing procedures and selected features should be verified in the corresponding model-development notebooks.

### Dataset location

The current backend expects the CSV files directly inside the project's `data/` folder:

```text
data/
├── student-mat.csv
├── student-por.csv
├── raw/
├── processed/
└── README.md
```

The actual required path is determined by the backend configuration. If the files are placed in a different directory, the backend may return a dataset-not-found error.

Dataset files do not need to be committed to GitHub. They can be downloaded from the official source and placed in the required local directory.

## 6. Target Variable

The intended classification target represents whether a student is considered academically at risk.

The project uses the following binary target definition:

| Target value | Class | Definition |
|---|---|---|
| `1` | At-Risk | Final Mathematics grade `G3 < 10` |
| `0` | Not At-Risk | Final Mathematics grade `G3 >= 10` |

This threshold defines the target used for the intended classification task.

### Avoiding data leakage

If the final grade `G3` is used to generate the target, it must not also be supplied as a predictive input feature. Grade information that directly reveals the target must be excluded to avoid target leakage.

The feature selection and target construction in the deployed backend must be consistent with the model-development notebooks.

## 7. Machine Learning Models

StudentSense includes five supervised classification algorithms.

### 7.1 Logistic Regression

Logistic Regression is used as a linear classification approach. It estimates the probability that an observation belongs to a class and uses a decision threshold to assign the final prediction.

**Advantages:**
- Provides a useful baseline for classification.
- Can be relatively easy to interpret.
- Supports probability estimation.

**Considerations:**
- Its decision boundary is linear unless additional transformations or features are used.
- Its performance depends on feature preparation and model configuration.

### 7.2 Decision Tree

Decision Tree classifies observations using a sequence of feature-based decision rules.

**Advantages:**
- Can represent nonlinear relationships.
- Can capture interactions between features.
- Provides a tree structure that can help explain decisions.

**Considerations:**
- Deep trees can overfit the training data.
- Performance depends on parameters such as tree depth and minimum samples per leaf.

### 7.3 Random Forest

Random Forest combines predictions from multiple decision trees to produce an ensemble classification.

**Advantages:**
- Can capture nonlinear relationships.
- Combines multiple trees to reduce dependence on a single tree.
- Can provide feature-importance information.

**Considerations:**
- Can require more computational resources than a single tree.
- The ensemble is generally less straightforward to interpret than an individual decision tree.

### 7.4 Support Vector Machine (SVM)

Support Vector Machine attempts to identify a decision boundary that separates the classes. Depending on the kernel, it can model linear or nonlinear boundaries.

**Advantages:**
- Can be effective in classification problems with complex boundaries.
- Supports different kernel functions.
- Provides a useful comparison against tree-based and linear models.

**Considerations:**
- Feature scaling is often important.
- Parameter and kernel selection can affect performance.
- Probability estimates require appropriate model configuration.

### 7.5 Gradient Boosting

Gradient Boosting constructs an ensemble of decision trees sequentially, with subsequent trees attempting to improve the existing model.

**Advantages:**
- Can capture complex relationships.
- Combines multiple weak learners.
- Provides a useful ensemble comparison against Random Forest.

**Considerations:**
- Performance depends on parameters such as learning rate, number of estimators, and tree depth.
- Inappropriate configuration can lead to overfitting or weak minority-class detection.

## 8. Model Evaluation Metrics

The project uses standard classification metrics to compare the models.

| Metric | Meaning |
|---|---|
| Accuracy | Proportion of all predictions that are correct. |
| Precision | Proportion of predicted at-risk students who are actually at risk. |
| Recall | Proportion of actual at-risk students correctly identified. |
| F1-score | Harmonic mean of precision and recall. |
| ROC-AUC | Measures the model's ability to distinguish between the classes across thresholds. |

### Accuracy

Accuracy measures the overall proportion of correct predictions. However, accuracy alone may be insufficient when the classes are imbalanced or when different classification errors have different consequences.

### Precision

Precision indicates how many students predicted as at risk actually belong to the at-risk class. Higher precision means fewer false positives among predicted at-risk students.

### Recall

Recall measures the proportion of actual at-risk students identified by the model.

For an early identification application, recall is particularly important because a false negative means that a student who is at risk was classified as not at risk.

### F1-score

F1-score combines precision and recall into a single metric. It is useful when both missed at-risk students and false alarms need to be considered.

### ROC-AUC

ROC-AUC evaluates how well the model separates the two classes across possible decision thresholds. A higher value generally indicates stronger ranking discrimination.

The preferred model should be selected according to the project objective and the consequences of false-positive and false-negative predictions.

## 9. Model Comparison

The following results are from the **current backend dashboard API response**. They are included to document the results currently reported by the running application.

They should not automatically be interpreted as the final tuned-model results from the individual notebooks until the evaluation configuration has been verified.

### 9.1 Performance comparison table

| Model | Accuracy | Precision | Recall | F1-score | ROC-AUC |
|---|---:|---:|---:|---:|---:|
| Logistic Regression | 73.27% | 44.12% | 64.62% | 52.22% | 75.15% |
| Decision Tree | 69.83% | 37.02% | 37.31% | 36.00% | 54.49% |
| Random Forest | 76.98% | 50.99% | 50.00% | 50.34% | 76.68% |
| Support Vector Machine (SVM) | 73.05% | 43.79% | 49.42% | 46.43% | 76.30% |
| Gradient Boosting | 74.83% | 45.56% | 23.46% | 30.87% | 73.16% |

### 9.2 Best result by metric

| Metric | Best model | Reported value |
|---|---|---:|
| Accuracy | Random Forest | 76.98% |
| Precision | Random Forest | 50.99% |
| Recall | Logistic Regression | 64.62% |
| F1-score | Logistic Regression | 52.22% |
| ROC-AUC | Random Forest | 76.68% |

### 9.3 Accuracy comparison

Random Forest reports the highest accuracy among the five models in the current backend response.

```text
Random Forest          76.98%
Gradient Boosting      74.83%
Logistic Regression    73.27%
SVM                    73.05%
Decision Tree          69.83%
```

Accuracy should be considered together with recall and F1-score because a model can achieve reasonable overall accuracy while failing to identify a substantial proportion of at-risk students.

### 9.4 Recall comparison

Recall is especially relevant to the early identification objective.

```text
Logistic Regression    64.62%
Random Forest          50.00%
SVM                    49.42%
Decision Tree          37.31%
Gradient Boosting      23.46%
```

Logistic Regression has the highest reported recall. This means it identifies a larger proportion of actual at-risk students than the other models under the current evaluation configuration.

Gradient Boosting has the lowest reported recall, indicating that it misses a larger proportion of actual at-risk students in these results.

### 9.5 F1-score comparison

```text
Logistic Regression    52.22%
Random Forest          50.34%
SVM                    46.43%
Decision Tree          36.00%
Gradient Boosting      30.87%
```

Logistic Regression achieves the highest reported F1-score, followed by Random Forest. These results indicate a stronger balance between precision and recall for these two models in the current backend response.

### 9.6 ROC-AUC comparison

```text
Random Forest          76.68%
SVM                    76.30%
Logistic Regression    75.15%
Gradient Boosting      73.16%
Decision Tree          54.49%
```

Random Forest reports the highest ROC-AUC, closely followed by SVM. Decision Tree has the lowest reported ROC-AUC in the current results.

### 9.7 Comparison summary

| Model | Main strength in current results | Main concern in current results |
|---|---|---|
| Logistic Regression | Highest recall and F1-score | Lower precision than Random Forest |
| Decision Tree | Simple rule-based structure | Lowest accuracy and ROC-AUC |
| Random Forest | Highest accuracy, precision, and ROC-AUC | Recall is lower than Logistic Regression |
| SVM | Competitive ROC-AUC | Lower recall and F1-score than the leading models |
| Gradient Boosting | Accuracy above the Logistic Regression and SVM results | Lowest recall and F1-score |

## 10. Comparison and Discussion

### Logistic Regression

Logistic Regression reports an accuracy of 73.27%, recall of 64.62%, and F1-score of 52.22%.

Its recall is the highest among the models in the current backend response. This makes it a relevant candidate when the objective is to identify a greater proportion of students who may be at risk.

However, its precision is 44.12%, indicating that some students predicted as at risk are not members of the actual at-risk class under the reported evaluation.

### Decision Tree

Decision Tree reports an accuracy of 69.83%, recall of 37.31%, and ROC-AUC of 54.49%.

These are the weakest overall results among the five models in the current backend response. Nevertheless, decision trees can be useful for understanding feature-based classification rules, and their performance may change with feature preparation and hyperparameter tuning.

### Random Forest

Random Forest reports the highest accuracy at 76.98%, highest precision at 50.99%, and highest ROC-AUC at 76.68%.

It also achieves an F1-score of 50.34% and recall of 50.00%.

Based on the current backend results, Random Forest provides the strongest overall performance across accuracy, precision, and ROC-AUC. However, it identifies a smaller proportion of actual at-risk students than Logistic Regression.

### Support Vector Machine

SVM reports an accuracy of 73.05%, recall of 49.42%, F1-score of 46.43%, and ROC-AUC of 76.30%.

Its ROC-AUC is close to the Random Forest result, suggesting competitive class-ranking performance under the reported evaluation. Its precision, recall, and F1-score are lower than the leading values in the table.

### Gradient Boosting

Gradient Boosting reports an accuracy of 74.83% but a recall of 23.46% and F1-score of 30.87%.

The relatively low recall is important for this project because it indicates that many actual at-risk students are not identified under the current configuration.

Further investigation of class weighting, decision thresholds, hyperparameters, and the training workflow may be appropriate, but any improvement must be established through valid evaluation.

### Overall conclusion of model comparison

Based on the current backend results:

- **Random Forest** is the strongest model for accuracy, precision, and ROC-AUC.
- **Logistic Regression** achieves the highest recall and F1-score.
- **SVM** achieves ROC-AUC close to Random Forest.
- **Decision Tree** has the lowest accuracy and ROC-AUC in the current response.
- **Gradient Boosting** has the lowest recall and F1-score in the current response.

If the primary objective is to identify as many potentially at-risk students as possible, Logistic Regression is a strong candidate for further investigation because of its higher recall.

If overall accuracy, precision, and ROC-AUC are prioritised, Random Forest is a strong candidate based on these reported metrics.

The final selection should be made after verifying that all models were evaluated using the same data split, target definition, preprocessing workflow, and evaluation procedure.

**Important:** These results describe the currently running backend. They should not be presented as the final comparison of tuned notebook models unless the same trained pipelines and evaluation configuration are used.

## 11. System Architecture

StudentSense follows a frontend-backend architecture.

```text
                        USER
                          |
                          v
             React + TypeScript Frontend
                          |
                          | HTTP Requests
                          v
                   FastAPI Backend
                          |
               +----------+----------+
               |                     |
               v                     v
        Data Processing       ML Pipelines
                                     |
                +--------------------+--------------------+
                |          |          |         |         |
                v          v          v         v         v
                LR         DT         RF        SVM       GB
                |          |          |         |         |
                +--------------------+--------------------+
                                     |
                                     v
                         Predictions and Metrics
                                     |
                                     v
                              Dashboard UI
```

### Frontend

The frontend provides the user interface for viewing statistics, selecting models, entering student information, and displaying predictions.

### Backend

The FastAPI backend exposes HTTP endpoints for health checks, dashboard data, and prediction requests.

### Machine learning layer

The machine learning layer provides the classification pipelines used to produce predictions and evaluation metrics.

The exact model-loading and training behaviour is determined by the implementation in the backend source code.

## 12. Dashboard Features

### 12.1 Overview Dashboard

The overview page displays high-level information supplied by the backend, including:

- Total students evaluated.
- Number of students classified as at risk.
- Distribution of at-risk and not-at-risk classifications.
- Model performance metrics.
- Visual comparisons of the available classification algorithms.

### 12.2 Student Prediction Interface

The prediction interface allows the user to:

1. Select a machine learning model.
2. Enter student information.
3. Submit the prediction request.
4. View the predicted class.
5. View a probability or related output when provided by the backend.

The form must collect the features expected by the selected model. The backend must apply the same preprocessing and encoding procedures used during training.

### 12.3 Model Comparison Dashboard

The model comparison page presents the five classification algorithms and their reported metrics.

This allows users to compare accuracy, precision, recall, F1-score, and ROC-AUC.

### 12.4 Model Availability

The dashboard displays model statuses returned by the API.

A model marked as `ready` indicates that the backend reports it as available. It does not independently establish that the model is fully validated for real-world academic use.

## 13. Project Structure

The intended project organisation is shown below. Exact notebook filenames may differ in the repository.

```text
student-at-risk-full-project/
│
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── README.md
│
├── data/
│   ├── raw/
│   ├── processed/
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.ts
│   └── README.md
│
├── models/
│
├── notebooks/
│   ├── 02_logistic_regression_refactored.ipynb
│   ├── 03_svm_refactored.ipynb
│   ├── 04_gradient_boosting_refactored.ipynb
│   ├── IT24104159_Decision_Tree.ipynb
│   └── IT24103546_Random_Forest.ipynb
│
├── reports/
│
├── .gitignore
└── README.md
```

### Directory descriptions

| Directory | Purpose |
|---|---|
| `backend/` | FastAPI application and Python dependencies |
| `data/` | Dataset documentation and local dataset directories |
| `frontend/` | React and TypeScript dashboard |
| `models/` | Location for trained model artifacts, depending on backend configuration |
| `notebooks/` | Jupyter notebooks for machine learning experiments |
| `reports/` | Project reports and generated documentation |

## 14. Installation and Setup

### Prerequisites

Install the following tools:

- Python 3.10 or later.
- Node.js 18 or later.
- npm.
- Git.
- Visual Studio Code.

### Step 1: Clone the repository

```bash
git clone https://github.com/harini281/ml_assignment_final.git
cd ml_assignment_final
```

### Step 2: Download the dataset

Download the dataset from:

https://archive.ics.uci.edu/dataset/320/student%2Bperformance

Extract the archive and place the required CSV files in the directory expected by the backend.

For the current configuration:

```text
data/
├── student-mat.csv
└── student-por.csv
```

Keep the files in the expected directory and preserve their semicolon-separated format.

### Step 3: Create the Python environment

From the project root, run:

```powershell
py -m venv .venv
```

Install the backend dependencies:

```powershell
.venv\Scripts\python.exe -m pip install -r backend/requirements.txt
```

### Step 4: Start the backend

Run:

```powershell
.venv\Scripts\python.exe -m uvicorn backend.main:app --reload --port 8000
```

The API should be available at:

http://127.0.0.1:8000

The interactive API documentation should be available at:

http://127.0.0.1:8000/docs

Keep this terminal open while running the frontend.

### Step 5: Install the frontend dependencies

Open a second terminal and run:

```powershell
cd frontend
npm install
```

### Step 6: Start the frontend

Run:

```powershell
npm run dev
```

Open the local URL printed in the terminal, usually:

http://localhost:5173

Both the backend and frontend must be running for the complete application to work.

## 15. Backend API Endpoints

The current backend exposes the following endpoints.

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Checks whether the API is responding. |
| GET | `/api/dashboard` | Returns student statistics, class distribution, model statuses, and metrics. |
| POST | `/api/predict` | Accepts a prediction request and returns the selected model's result. |

### Health check

**Request:**

```http
GET /api/health
```

**Example response:**

```json
{
  "status": "ok",
  "service": "StudentSense ML API"
}
```

### Dashboard data

**Request:**

```http
GET /api/dashboard
```

The response includes:

- Total number of students evaluated.
- Number of students classified as at risk.
- Class distribution.
- Available model identifiers and labels.
- Model statuses.
- Accuracy, precision, recall, F1-score, and ROC-AUC when available.

### Student prediction

**Request:**

```http
POST /api/predict
```

The required request body is defined by the backend's `PredictionRequest` schema. Refer to the interactive API documentation at `/docs` for the exact required fields.

The prediction response follows the schema implemented by the backend and may include the selected model, predicted class, label, probability, or explanatory note.

## 16. Machine Learning Workflow

The notebooks provide the environment for developing and evaluating the classification models.

The general workflow includes:

1. Importing the required libraries.
2. Loading the student performance dataset.
3. Performing exploratory data analysis.
4. Inspecting data quality and feature distributions.
5. Preparing the input features.
6. Defining the binary academic risk target.
7. Separating predictors from the target.
8. Splitting the data into training and testing sets.
9. Training a baseline classifier.
10. Evaluating baseline performance.
11. Applying hyperparameter tuning where implemented.
12. Evaluating the resulting model.
13. Comparing evaluation metrics.
14. Interpreting results and documenting limitations.

The individual notebooks should be used as the source of truth for the actual preprocessing steps, model parameters, tuning procedures, and experimental results.

### Baseline versus tuned models

A baseline model provides an initial performance reference. A tuned model uses selected hyperparameters determined through a suitable validation procedure.

A fair comparison should use consistent evaluation conditions. Test data should not be repeatedly used to select hyperparameters.

The current backend comparison must be verified against the final notebook results before claiming that it represents the final tuned models.

## 17. Reproducibility and Data Integrity

For reliable experimentation and comparison:

- Use a consistent target definition.
- Exclude features that directly reveal the target.
- Fit preprocessing transformations on training data only.
- Keep test data separate from tuning.
- Use comparable data splits for all models.
- Record random seeds and model configurations where applicable.
- Save preprocessing and classification steps together.
- Verify that the API uses the correct feature order and data types.
- Compare deployed model results with the notebook evaluation results.
- Document the model version and evaluation configuration.

These practices reduce data leakage and help make the model comparisons more meaningful.

## 18. Limitations

StudentSense has several limitations.

1. The dataset may not represent all schools, institutions, or student populations.
2. Model performance depends on the dataset, target definition, feature selection, and evaluation procedure.
3. Missing or incorrect input values can affect predictions.
4. The deployed API must be verified against the final notebook pipelines.
5. A classification result cannot guarantee a student's future academic outcome.
6. Probability outputs should not automatically be interpreted as calibrated real-world risk.
7. Overall accuracy alone is insufficient for evaluating early identification performance.
8. False positives and false negatives can have different consequences.
9. Fairness and generalisation require additional investigation.
10. The current application should not be considered a validated production system without further testing.

## 19. Future Improvements

Possible future work includes:

- Connecting the final tuned model artifacts from the notebooks.
- Ensuring the prediction form includes all required features.
- Improving validation and error handling.
- Adding baseline-versus-tuned model comparisons.
- Displaying confusion matrices and ROC curves.
- Adding feature-importance or explainability views.
- Evaluating probability calibration.
- Investigating alternative classification thresholds.
- Evaluating class weighting or other imbalance-handling methods where appropriate.
- Testing model performance across relevant student groups.
- Adding automated frontend and backend tests.
- Improving deployment configuration and security.
- Adding authentication and role-based access where required.

## 20. Ethical Considerations

StudentSense is intended to support exploration of academic risk, not to label students permanently or make decisions without human review.

Important considerations include:

- Protecting student privacy and confidential information.
- Avoiding the use of predictions as the sole basis for academic decisions.
- Ensuring educators review results before taking action.
- Investigating possible bias and unequal error rates.
- Considering the consequences of missed at-risk students and false alarms.
- Using predictions to support appropriate interventions.
- Following applicable institutional and data protection requirements.

A student's predicted class should not be treated as proof of ability, motivation, or future performance.

## 21. Acknowledgements

The project uses the UCI Student Performance dataset for educational machine learning experimentation.

**Dataset:** Student Performance  
**Source:** UCI Machine Learning Repository

https://archive.ics.uci.edu/dataset/320/student%2Bperformance

Dataset reference:

Cortez, P., & Silva, A. (2008). *Using Data Mining to Predict Secondary School Student Performance*. Proceedings of the 5th Future Business Technology Conference.

## 22. Conclusion

StudentSense demonstrates a full-stack approach to exploring academic risk classification using machine learning.

The project brings together student data preparation, five supervised classification algorithms, evaluation metrics, a Python backend API, and an interactive web dashboard.

The current backend results show that Random Forest reports the highest accuracy, precision, and ROC-AUC, while Logistic Regression reports the highest recall and F1-score. These findings illustrate why model selection should consider multiple metrics rather than accuracy alone.

Further verification is required to ensure that the dashboard's reported results match the final notebook experiments and deployed model pipelines.

The project provides a foundation for further investigation into explainable, responsible, and data-informed academic support systems.

---

## Repository

**GitHub:** https://github.com/harini281/ml_assignment_final

**Disclaimer:** StudentSense is an academic prototype developed for educational and research purposes. Its predictions are estimates and must not be treated as definitive assessments of students or used as the sole basis for academic decisions.
