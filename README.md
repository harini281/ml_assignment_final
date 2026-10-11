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
|---|---|
