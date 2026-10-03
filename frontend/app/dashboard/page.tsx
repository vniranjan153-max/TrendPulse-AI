"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Sidebar } from "../../components/sidebar";
import { TrendCard } from "../../components/trend-card";
import { clearAuthTokens, hasAccessToken } from "../../lib/auth";


  type Trend = {
  id: string | number;
  topic: string;
  source: string;
  category: string;
  momentum: number;
  score?: number;
  change?: string;
  summary?: string | null;
  url?: string | null;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export default function DashboardPage() {
  const router = useRouter();
  const [tokenReady, setTokenReady] = useState(false);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!hasAccessToken()) {
      router.replace("/login");
      return;
    }
    setTokenReady(true);
  }, [router]);

  useEffect(() => {
    if (!tokenReady) return;

    let cancelled = false;

    async function loadTrends() {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/trends/live`, { cache: "no-store" });
        if (!response.ok) {
          throw new Error("Failed to load trends");
        }
        const data = (await response.json()) as Trend[];
        if (!cancelled) {
          setTrends(data);
        }
      } catch {
        if (!cancelled) {
          setTrends([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadTrends();

    return () => {
      cancelled = true;
    };
  }, [tokenReady]);

  if (!tokenReady) {
    return null;
  }

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
          <button
            className="button ghost"
            onClick={() => {
              clearAuthTokens();
              router.push("/login");
            }}
          >
            Log out
          </button>
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
            {loading ? (
              <p className="muted">Loading live trend data…</p>
            ) : trends.length ? (
              trends.map((trend) => (
                <TrendCard
                  key={trend.id}
                  topic={trend.topic}
                  source={trend.source}
                  category={trend.category}
                  score={trend.score ?? trend.momentum}
                  change={trend.change ?? `${trend.momentum > 0 ? "+" : ""}${trend.momentum}%`}
                />
              ))
            ) : (
              <p className="muted">No live trend data available yet.</p>
            )}
          </div>
        </section>
      </section>
    </main>
  );
}
