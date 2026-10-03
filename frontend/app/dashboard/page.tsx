import { Sidebar } from "../../components/sidebar";
import { TrendCard } from "../../components/trend-card";

const trends = [
  { topic: "AI Agents", source: "Hacker News", category: "AI", score: 94, change: "+28.4%" },
  { topic: "Local-first Apps", source: "GitHub", category: "DevTools", score: 86, change: "+17.2%" },
  { topic: "Small Language Models", source: "GitHub", category: "AI", score: 82, change: "+13.7%" },
];

export default function DashboardPage() {
  return (
    <main className="dashboard">
      <Sidebar />
      <section className="mainArea">
        <div className="topbar">
          <div>
            <p className="kicker">LIVE DASHBOARD</p>
            <h1 style={{ margin: 0 }}>TrendPulse AI</h1>
          </div>
          <a className="button ghost" href="/login">Log out</a>
        </div>

        <div className="grid">
          <div className="metricCard"><small>Live trends</small><strong>128</strong></div>
          <div className="metricCard"><small>Momentum avg</small><strong>87.4</strong></div>
          <div className="metricCard"><small>Sources</small><strong>4</strong></div>
        </div>

        <section className="panel">
          <div className="sectionHeading" style={{ marginBottom: 16 }}>
            <div>
              <p className="kicker">TREND STREAM</p>
              <h2>Top momentum signals</h2>
            </div>
            <span className="muted">Connected to /api/trends/live</span>
          </div>

          <div className="list">
            {trends.map((trend) => (
              <TrendCard key={trend.topic} {...trend} />
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
