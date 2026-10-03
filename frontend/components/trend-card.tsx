type TrendCardProps = {
  topic: string;
  source: string;
  category: string;
  score: number;
  change: string;
};

export function TrendCard({ topic, source, category, score, change }: TrendCardProps) {
  return (
    <article className="trendRow">
      <div>
        <p className="muted" style={{ margin: 0 }}>{source} · {category}</p>
        <h3>{topic}</h3>
        <p>Trend momentum score and growth estimate based on live signals.</p>
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="pill">{score}/100</div>
        <div className="muted" style={{ marginTop: 10 }}>{change}</div>
      </div>
    </article>
  );
}
