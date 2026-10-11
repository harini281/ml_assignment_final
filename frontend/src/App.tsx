import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from "react";
import {
  Activity, AlertCircle, ArrowUpRight, BrainCircuit,
  CheckCircle2, ChevronDown, CircleHelp, ClipboardList, Database,
  GraduationCap, LayoutDashboard, LoaderCircle, RefreshCw, ShieldCheck,
  Sparkles, Target, Users, WandSparkles
} from "lucide-react";
import {
  Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip,
  XAxis, YAxis
} from "recharts";
import MetricCard from "./components/MetricCard";
import Panel from "./components/Panel";
import { getDashboard, predictStudent } from "./lib/api";
import { MODEL_OPTIONS, type DashboardData, type ModelId, type PredictionResponse, type StudentFeatures, type Subject } from "./types";

const initialStudent: StudentFeatures = {
  age: 16, studytime: 2, failures: 0, absences: 3,
  schoolsup: "no", famsup: "yes", internet: "yes", activities: "yes"
};

function displayMetric(value?: number | null, percent = true) {
  if (value === null || value === undefined || !Number.isFinite(value)) return "Not connected";
  return percent ? `${(value * 100).toFixed(1)}%` : value.toLocaleString();
}

function App() {
  const [activePage, setActivePage] = useState<"overview" | "predict" | "models">("overview");
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [dashboardError, setDashboardError] = useState("");
  const [loadingDashboard, setLoadingDashboard] = useState(true);
  const [model, setModel] = useState<ModelId>("logistic_regression");
  const [subject, setSubject] = useState<Subject>("math");
  const [student, setStudent] = useState<StudentFeatures>(initialStudent);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [predictError, setPredictError] = useState("");
  const [predicting, setPredicting] = useState(false);

  async function refreshDashboard() {
    setLoadingDashboard(true);
    setDashboardError("");
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch {
      setDashboard(null);
      setDashboardError("Model metrics are not connected yet. Connect your backend to show real evaluation results.");
    } finally {
      setLoadingDashboard(false);
    }
  }

  useEffect(() => {
    void refreshDashboard();
  }, []);

  const models = useMemo(() => dashboard?.models ?? [], [dashboard]);
  const chartData = useMemo(() => {
    return models
      .filter((item) => item.metrics)
      .map((item) => ({
        name: item.label.replace("Logistic Regression", "Logistic Reg."),
        Accuracy: item.metrics?.accuracy == null ? null : Number((item.metrics.accuracy * 100).toFixed(1)),
        Precision: item.metrics?.precision == null ? null : Number((item.metrics.precision * 100).toFixed(1)),
        Recall: item.metrics?.recall == null ? null : Number((item.metrics.recall * 100).toFixed(1)),
        "F1-score": item.metrics?.f1 == null ? null : Number((item.metrics.f1 * 100).toFixed(1))
      }));
  }, [models]);

  function updateStudent<K extends keyof StudentFeatures>(key: K, value: StudentFeatures[K]) {
    setStudent((current) => ({ ...current, [key]: value }));
    setPrediction(null);
  }

  async function submitPrediction(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPredicting(true);
    setPredictError("");
    setPrediction(null);
    try {
      const result = await predictStudent({ model, subject, student });
      setPrediction(result);
    } catch {
      setPredictError("Prediction service is not connected. Start your model API and confirm that POST /api/predict accepts this request schema.");
    } finally {
      setPredicting(false);
    }
  }

  const selectedModel = MODEL_OPTIONS.find((item) => item.id === model)!;

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={23} /></div>
          <div><strong>StudentSense</strong><span>RISK INTELLIGENCE</span></div>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          <button className={activePage === "overview" ? "nav-item active" : "nav-item"} onClick={() => setActivePage("overview")}><LayoutDashboard size={18} /> Overview</button>
          <button className={activePage === "predict" ? "nav-item active" : "nav-item"} onClick={() => setActivePage("predict")}><WandSparkles size={18} /> Student prediction</button>
          <button className={activePage === "models" ? "nav-item active" : "nav-item"} onClick={() => setActivePage("models")}><BrainCircuit size={18} /> Model comparison</button>
        </nav>
        <div className="sidebar-spacer" />
        <div className="sidebar-note">
          <div className="note-icon"><ShieldCheck size={18} /></div>
          <strong>Decision support</strong>
          <p>Predictions should support educator review, not replace human judgement.</p>
        </div>
        <div className="sidebar-footer"><span className="status-dot" /> IT3091 · Machine Learning</div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">Workspace <span>/</span> <strong>{activePage === "overview" ? "Overview" : activePage === "predict" ? "Student prediction" : "Model comparison"}</strong></div>
          <div className="topbar-right"><span className="project-chip"><span className="status-dot" /> Guided Data Track</span><div className="avatar">ML</div></div>
        </header>

        <div className="page-content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><Sparkles size={14} /> STUDENT PERFORMANCE ANALYTICS</div>
              <h1>{activePage === "overview" ? "Student risk overview" : activePage === "predict" ? "Assess a student profile" : "Model performance"}</h1>
              <p className="page-subtitle">
                {activePage === "overview"
                  ? "Explore connected model results and the student-risk workflow."
                  : activePage === "predict"
                    ? "Enter the available student attributes and request a prediction from a trained model."
                    : "Compare baseline and tuned models using verified evaluation metrics."}
              </p>
            </div>
            <button className="button secondary refresh-button" onClick={() => void refreshDashboard()} disabled={loadingDashboard}>
              {loadingDashboard ? <LoaderCircle className="spin" size={16} /> : <RefreshCw size={16} />} Refresh data
            </button>
          </section>

          {activePage === "overview" && (
            <>
              <section className="hero-banner">
                <div className="hero-copy">
                  <span className="hero-kicker">EARLY INTERVENTION SUPPORT</span>
                  <h2>Find the signal.<br /><em>Support the student.</em></h2>
                  <p>A machine-learning workflow designed to help educators review potential risk indicators earlier and more consistently.</p>
                  <button className="button light" onClick={() => setActivePage("predict")}>Start a prediction <ArrowUpRight size={16} /></button>
                </div>
                <div className="hero-art" aria-hidden="true">
                  <div className="orbit orbit-one" /><div className="orbit orbit-two" />
                  <div className="hero-core"><GraduationCap size={43} /></div>
                  <div className="floating-card float-a"><Activity size={15} /><span>Model insights</span></div>
                  <div className="floating-card float-b"><Target size={15} /><span>Early support</span></div>
                  <div className="floating-card float-c"><ShieldCheck size={15} /><span>Human review</span></div>
                </div>
              </section>

              {dashboardError && <div className="notice info"><CircleHelp size={18} /><div><strong>Live model data not connected</strong><p>{dashboardError} The cards and charts below will not invent values.</p></div></div>}

              <section className="metrics-grid">
                <MetricCard label="Students evaluated" value={loadingDashboard ? "Loading…" : dashboard?.totalStudentsEvaluated == null ? "Not connected" : displayMetric(dashboard.totalStudentsEvaluated, false)} hint="Requires real evaluation records" icon={<Users size={19} />} tone="blue" />
                <MetricCard label="At-risk cases" value={loadingDashboard ? "Loading…" : dashboard?.atRiskCount == null ? "Not connected" : displayMetric(dashboard.atRiskCount, false)} hint="Count from connected data only" icon={<AlertCircle size={19} />} tone="orange" />
                <MetricCard label="Models available" value={loadingDashboard ? "Loading…" : models.length ? String(models.filter((m) => m.status === "ready").length) : "Not connected"} hint="Registered by the backend" icon={<BrainCircuit size={19} />} tone="purple" />
                <MetricCard label="Evaluation status" value={loadingDashboard ? "Loading…" : dashboard ? "Connected" : "Not connected"} hint="Metrics are not assumed" icon={<Database size={19} />} tone="green" />
              </section>

              <div className="content-grid two-col">
                <Panel title="Model metrics" subtitle="Actual test metrics returned by your backend" action={<span className="subtle-badge">TEST SET</span>}>
                  {chartData.length ? (
                    <div className="chart-wrap">
                      <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={chartData} margin={{ top: 12, right: 8, left: -18, bottom: 8 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9edf5" />
                          <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#778197" }} axisLine={false} tickLine={false} />
                          <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "#778197" }} axisLine={false} tickLine={false} />
                          <Tooltip formatter={(v) => v == null ? "Unavailable" : `${v}%`} />
                          <Bar dataKey="Accuracy" fill="#6b7df5" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="Precision" fill="#35b8a2" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="Recall" fill="#f4a54d" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="F1-score" fill="#9a78e8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                      <div className="chart-legend"><span><i className="legend-dot indigo" />Accuracy</span><span><i className="legend-dot teal" />Precision</span><span><i className="legend-dot amber" />Recall</span><span><i className="legend-dot violet" />F1-score</span></div>
                    </div>
                  ) : <EmptyState icon={<Activity size={22} />} title="No evaluation data yet" text="Connect GET /api/dashboard with real baseline and tuned test metrics to render this chart." />}
                </Panel>
                <Panel title="Workflow at a glance" subtitle="The project pipeline">
                  <div className="workflow-list">
                    {[
                      ["01", "Load & understand data", "Inspect columns, distributions and data quality.", "complete"],
                      ["02", "Prepare features", "Define target, split data and fit preprocessing.", "complete"],
                      ["03", "Train baseline", "Record the initial held-out test performance.", "active"],
                      ["04", "Tune & validate", "Use cross-validation on training data only.", "pending"],
                      ["05", "Compare & recommend", "Review metrics, limitations and intervention value.", "pending"]
                    ].map(([num, title, desc, state]) => (
                      <div className="workflow-step" key={num}>
                        <div className={`step-number ${state}`}>{state === "complete" ? <CheckCircle2 size={16} /> : num}</div>
                        <div><strong>{title}</strong><p>{desc}</p></div>
                      </div>
                    ))}
                  </div>
                </Panel>
              </div>

              <Panel title="Available model registry" subtitle="Models are selectable in the UI; prediction requires a trained model API.">
                <div className="model-grid">
                  {MODEL_OPTIONS.map((item) => {
                    const registered = models.find((entry) => entry.id === item.id);
                    return <button className="model-tile" key={item.id} onClick={() => { setModel(item.id); setActivePage("predict"); }}>
                      <div className="model-tile-icon"><BrainCircuit size={19} /></div>
                      <div className="model-tile-main"><strong>{item.label}</strong><span>{item.description}</span></div>
                      <span className={`connection-pill ${registered?.status === "ready" ? "ready" : ""}`}>{registered?.status === "ready" ? "Ready" : "Not connected"}</span>
                      <ChevronDown className="tile-arrow" size={16} />
                    </button>;
                  })}
                </div>
              </Panel>
            </>
          )}

          {activePage === "predict" && (
            <div className="content-grid prediction-layout">
              <Panel title="Student profile" subtitle="Enter only fields supported by your trained preprocessing pipeline.">
                <form className="prediction-form" onSubmit={submitPrediction}>
                  <div className="form-section-title"><span>01</span><div><strong>Prediction setup</strong><p>Select the model and subject dataset.</p></div></div>
                  <div className="form-row">
                    <label>Machine learning model
                      <select value={model} onChange={(e) => { setModel(e.target.value as ModelId); setPrediction(null); }}>
                        {MODEL_OPTIONS.map((item) => <option value={item.id} key={item.id}>{item.label}</option>)}
                      </select>
                    </label>
                    <label>Subject dataset
                      <select value={subject} onChange={(e) => { setSubject(e.target.value as Subject); setPrediction(null); }}>
                        <option value="math">Mathematics</option><option value="portuguese">Portuguese</option>
                      </select>
                    </label>
                  </div>
                  <div className="form-section-title"><span>02</span><div><strong>Student attributes</strong><p>Illustrative fields — align these with your notebook before use.</p></div></div>
                  <div className="form-row three">
                    <label>Age <input type="number" min="15" max="22" value={student.age} onChange={(e) => updateStudent("age", Number(e.target.value))} required /></label>
                    <label>Study time <select value={student.studytime} onChange={(e) => updateStudent("studytime", Number(e.target.value))}><option value={1}>1 · Less</option><option value={2}>2 · Moderate</option><option value={3}>3 · More</option><option value={4}>4 · Highest</option></select></label>
                    <label>Past failures <input type="number" min="0" max="4" value={student.failures} onChange={(e) => updateStudent("failures", Number(e.target.value))} required /></label>
                  </div>
                  <div className="form-row">
                    <label>Absences <input type="number" min="0" max="100" value={student.absences} onChange={(e) => updateStudent("absences", Number(e.target.value))} required /></label>
                    <label>School support
                      <select value={student.schoolsup} onChange={(e) => updateStudent("schoolsup", e.target.value as StudentFeatures["schoolsup"])}><option value="no">No</option><option value="yes">Yes</option></select>
                    </label>
                  </div>
                  <div className="form-row three">
                    <label>Family support <select value={student.famsup} onChange={(e) => updateStudent("famsup", e.target.value as StudentFeatures["famsup"])}><option value="no">No</option><option value="yes">Yes</option></select></label>
                    <label>Internet access <select value={student.internet} onChange={(e) => updateStudent("internet", e.target.value as StudentFeatures["internet"])}><option value="no">No</option><option value="yes">Yes</option></select></label>
                    <label>Activities <select value={student.activities} onChange={(e) => updateStudent("activities", e.target.value as StudentFeatures["activities"])}><option value="no">No</option><option value="yes">Yes</option></select></label>
                  </div>
                  <div className="form-disclaimer"><ShieldCheck size={17} /><span>Predictions are decision-support signals only. Review the model's limitations and student context before acting.</span></div>
                  <button className="button primary submit-button" type="submit" disabled={predicting}>
                    {predicting ? <LoaderCircle className="spin" size={17} /> : <WandSparkles size={17} />} {predicting ? "Requesting prediction…" : "Run model prediction"}
                  </button>
                </form>
              </Panel>

              <div className="result-column">
                <Panel title="Prediction result" subtitle="A result appears only after the connected API returns one.">
                  {prediction ? (
                    <div className="prediction-result">
                      <div className={`result-symbol ${prediction.prediction === 1 ? "risk" : "safe"}`}>{prediction.prediction === 1 ? <AlertCircle size={28} /> : <CheckCircle2 size={28} />}</div>
                      <span className="result-eyebrow">MODEL RESPONSE</span>
                      <h3>{prediction.label}</h3>
                      <p>{prediction.prediction === 1 ? "The model classified this profile as At-Risk. This should prompt supportive human review, not an automatic decision." : "The model classified this profile as Not At-Risk. This does not guarantee that the student has no support needs."}</p>
                      {prediction.probability != null && <div className="probability-row"><span>Model-reported probability</span><strong>{(prediction.probability * 100).toFixed(1)}%</strong></div>}
                      <div className="result-meta">Model: {MODEL_OPTIONS.find((item) => item.id === prediction.model)?.label ?? prediction.model}</div>
                      {prediction.note && <p className="result-note">{prediction.note}</p>}
                    </div>
                  ) : predictError ? (
                    <div className="notice warning"><AlertCircle size={19} /><div><strong>Could not generate prediction</strong><p>{predictError}</p></div></div>
                  ) : <EmptyState icon={<Target size={23} />} title="Waiting for a model response" text="Complete the form and run prediction. No sample prediction is shown here." />}
                </Panel>
                <Panel title="Selected model" subtitle="Model details">
                  <div className="selected-model">
                    <div className="selected-model-icon"><BrainCircuit size={23} /></div>
                    <div><strong>{selectedModel.label}</strong><p>{selectedModel.description}</p></div>
                    <span className={`connection-pill ${models.find((entry) => entry.id === model)?.status === "ready" ? "ready" : ""}`}>{models.find((entry) => entry.id === model)?.status === "ready" ? "Ready" : "API required"}</span>
                  </div>
                  <div className="model-guidance"><CircleHelp size={17} /><p>Input fields must match the features and encoding used to train this exact model. Update the form schema and API adapter before using real student data.</p></div>
                </Panel>
              </div>
            </div>
          )}

          {activePage === "models" && (
            <>
              <div className="notice info"><CircleHelp size={18} /><div><strong>Compare real evaluation results</strong><p>This page only displays metrics returned by your backend. It does not generate demonstration scores.</p></div></div>
              <Panel title="Baseline and tuned model comparison" subtitle="Metrics should come from the same held-out test split and metric definitions.">
                {models.length ? (
                  <div className="table-wrap"><table><thead><tr><th>Model</th><th>Status</th><th>Accuracy</th><th>Precision</th><th>Recall</th><th>F1-score</th><th>ROC-AUC</th></tr></thead>
                    <tbody>{models.map((item) => <tr key={item.id}><td><strong>{item.label}</strong></td><td><span className={`connection-pill ${item.status === "ready" ? "ready" : ""}`}>{item.status === "ready" ? "Ready" : "Not connected"}</span></td><td>{displayMetric(item.metrics?.accuracy)}</td><td>{displayMetric(item.metrics?.precision)}</td><td>{displayMetric(item.metrics?.recall)}</td><td>{displayMetric(item.metrics?.f1)}</td><td>{displayMetric(item.metrics?.rocAuc)}</td></tr>)}</tbody>
                  </table></div>
                ) : <EmptyState icon={<ClipboardList size={22} />} title="No model results connected" text="Expose the real baseline and tuned test metrics from your Python backend to populate this comparison." />}
              </Panel>
              <div className="content-grid two-col">
                <Panel title="How to read the metrics" subtitle="Especially important for at-risk identification">
                  <div className="metric-explainer"><strong>Recall</strong><p>Of all truly at-risk students, how many did the model identify? Low recall means more at-risk students may be missed.</p></div>
                  <div className="metric-explainer"><strong>Precision</strong><p>Of students flagged at-risk, how many were truly at-risk? Low precision means more false alarms.</p></div>
                  <div className="metric-explainer"><strong>F1-score</strong><p>A combined measure of precision and recall. It can help compare trade-offs, but does not replace domain judgement.</p></div>
                </Panel>
                <Panel title="Fair comparison checklist" subtitle="Use this before writing your assignment conclusion">
                  <div className="checklist">
                    <div><CheckCircle2 size={17} /><span>Same held-out test split</span></div>
                    <div><CheckCircle2 size={17} /><span>Same target definition and class labels</span></div>
                    <div><CheckCircle2 size={17} /><span>Cross-validation used only for tuning</span></div>
                    <div><CheckCircle2 size={17} /><span>Baseline and tuned results clearly labelled</span></div>
                    <div><CheckCircle2 size={17} /><span>Limitations and human review documented</span></div>
                  </div>
                </Panel>
              </div>
            </>
          )}

          <footer className="page-footer"><span>StudentSense · IT3091 Machine Learning</span><span>Academic decision-support prototype · Not a substitute for educator judgement</span></footer>
        </div>
      </main>
    </div>
  );
}

function EmptyState({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return <div className="empty-state"><div className="empty-icon">{icon}</div><strong>{title}</strong><p>{text}</p></div>;
}

export default App;
