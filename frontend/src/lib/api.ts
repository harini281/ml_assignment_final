import type {
  DashboardData,
  ModelId,
  PredictionResponse,
  StudentFeatures,
  Subject
} from "../types";

const API_BASE = "/api";

async function readJson<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const message = await response.text().catch(() => "");
    throw new Error(message || `API request failed (${response.status})`);
  }
  return response.json() as Promise<T>;
}

export async function getDashboard(): Promise<DashboardData> {
  const response = await fetch(`${API_BASE}/dashboard`);
  return readJson<DashboardData>(response);
}

export async function predictStudent(input: {
  model: ModelId;
  subject: Subject;
  student: StudentFeatures;
}): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
  });
  return readJson<PredictionResponse>(response);
}
