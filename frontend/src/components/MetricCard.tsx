import type { ReactNode } from "react";

interface Props {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
  tone?: "blue" | "orange" | "green" | "purple";
}

export default function MetricCard({ label, value, hint, icon, tone = "blue" }: Props) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}>{icon}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-hint">{hint}</div>
    </article>
  );
}
