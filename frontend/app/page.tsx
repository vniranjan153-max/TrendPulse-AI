import { ArrowUpRight, BrainCircuit, Radar, Sparkles, TrendingUp } from "lucide-react";

const trends = [
  { topic: "AI Agents", category: "AI", score: 94, change: "+28.4%" },
  { topic: "Local-first Apps", category: "DevTools", score: 86, change: "+17.2%" },
  { topic: "Small Language Models", category: "AI", score: 82, change: "+13.7%" },
];

export default function Home() {
  return (
    <main>
      <nav className="nav shell">
        <div className="brand"><Radar size={22} /> TrendPulse AI</div>
        <div className="navlinks">
          <a href="#trends">Trends</a>
          <a href="#features">Features</a>
          <a className="button ghost" href="http://localhost:8000/docs">API Docs</a>
        </div>
      </nav>

      <section className="hero shell">
        <div className="eyebrow"><Sparkles size={16} /> Intelligence for what is gaining momentum</div>
        <h1>Discover internet trends <span>before they peak.</span></h1>
        <p>
          TrendPulse combines public signals, momentum scoring, and AI summaries into one
          focused dashboard for creators, builders, and researchers.
        </p>
        <div className="actions">
          <a className="button primary" href="#trends">Explore trends <ArrowUpRight size={17} /></a>
          <a className="button ghost" href="#features">How it works</a>
        </div>
      </section>

      <section id="trends" className="shell section">
        <div className="sectionHeading">
          <div>
            <p className="kicker">LIVE RADAR</p>
            <h2>Momentum board</h2>
          </div>
          <div className="status"><span /> Demo data connected</div>
        </div>

        <div className="trendGrid">
          {trends.map((trend, index) => (
            <article className="card" key={trend.topic}>
              <div className="cardTop">
                <span className="rank">0{index + 1}</span>
                <span className="category">{trend.category}</span>
              </div>
              <h3>{trend.topic}</h3>
              <div className="metricRow">
                <div><small>Momentum</small><strong>{trend.score}</strong></div>
                <div><small>24h change</small><strong className="positive">{trend.change}</strong></div>
              </div>
              <div className="bar"><i style={{ width: `${trend.score}%` }} /></div>
            </article>
          ))}
        </div>
      </section>

      <section id="features" className="shell section features">
        <article>
          <TrendingUp />
          <h3>Momentum scoring</h3>
          <p>Normalize velocity and engagement signals into an easy-to-read trend score.</p>
        </article>
        <article>
          <BrainCircuit />
          <h3>AI summaries</h3>
          <p>Understand what is moving, why it matters, and which signals caused the spike.</p>
        </article>
        <article>
          <Radar />
          <h3>Multi-source radar</h3>
          <p>Designed to combine GitHub, Hacker News, Reddit, search, and other public sources.</p>
        </article>
      </section>

      <footer className="shell footer">TrendPulse AI · Built as an open-source portfolio project</footer>
    </main>
  );
}
