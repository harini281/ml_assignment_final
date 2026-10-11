export type ModelId =
  | "logistic_regression"
  | "decision_tree"
  | "svm"
  | "random_forest"
  | "gradient_boosting";

export type Subject = "math" | "portuguese";

export interface Metrics {
  accuracy?: number | null;
  precision?: number | null;
  recall?: number | null;
  f1?: number | null;
  rocAuc?: number | null;
}

export interface ModelSummary {
  id: ModelId;
  label: string;
  status: "ready" | "not_connected";
  metrics?: Metrics | null;
}

export interface DashboardData {
  totalStudentsEvaluated?: number | null;
  atRiskCount?: number | null;
  models?: ModelSummary[];
  classDistribution?: { label: string; count: number }[];
}

export interface StudentFeatures {
  age: number;
  studytime: number;
  failures: number;
  absences: number;
  schoolsup: "yes" | "no";
  famsup: "yes" | "no";
  internet: "yes" | "no";
  activities: "yes" | "no";
}

export interface PredictionResponse {
  model: ModelId;
  prediction: 0 | 1;
  label: string;
  probability?: number | null;
  note?: string;
}

export const MODEL_OPTIONS: { id: ModelId; label: string; description: string }[] = [
  { id: "logistic_regression", label: "Logistic Regression", description: "Linear classification baseline" },
  { id: "decision_tree", label: "Decision Tree", description: "Rule-based tree classifier" },
  { id: "svm", label: "Support Vector Machine", description: "Maximum-margin classifier" },
  { id: "random_forest", label: "Random Forest", description: "Ensemble of decision trees" },
  { id: "gradient_boosting", label: "Gradient Boosting", description: "Sequential tree ensemble" }
];
