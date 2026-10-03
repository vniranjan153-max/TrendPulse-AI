import { Sidebar } from "../../components/sidebar";
import { TrendCard } from "../../components/trend-card";

type Trend = {
  id: string | number;
  topic: string;
  source: string;
  category: string;
  momentum: number;
  summary?: string | null;
  url?: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function getLiveTrends(): Promise<Trend[]> {
  const response = await fetch(`${API_URL}/api/trends/live`, {
    cache: "no-store",
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}

export default async function DashboardPage() {
  const trends = await getLiveTrends();
  const momentumAverage = trends.length
    ? Math.round(trends.reduce((sum, item) => sum + item.momentum, 0) / trends.length)
    : 0;
  const sources = new Set(trends.map((item) => item.source)).size;

  return (
    <main className="dashboard">
      <Sidebar />
      <section className="mainArea">
        <div className="topbar">
          <div>
            <p className="kicker">LIVE DASHBOARD</p>
            <h1 style={{ margin: 0 }}>TrendPulse AI</h1>
          </div>
          <a className="button ghost" href="/login">
            Log out
          </a>
        </div>

        <div className="grid">
          <div className="metricCard">
            <small>Live trends</small>
            <strong>{trends.length}</strong>
          </div>
          <div className="metricCard">
            <small>Momentum avg</small>
            <strong>{momentumAverage}</strong>
          </div>
          <div className="metricCard">
            <small>Sources</small>
            <strong>{sources}</strong>
          </div>
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
            {trends.length ? (
              trends.map((trend) => <TrendCard key={trend.id} {...trend} />)
            ) : (
              <p className="muted">No live trend data available yet.</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
