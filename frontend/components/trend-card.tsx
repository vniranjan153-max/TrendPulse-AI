type TrendCardProps = {
  topic: string;
  source: string;
  category: string;
  momentum: number;
  summary?: string | null;
  url?: string | null;
};

export function TrendCard({ topic, source, category, momentum, summary, url }: TrendCardProps) {
  const change = `${Math.max(0, Math.round(momentum / 4))}%`;

  return (
    <article className="trendRow">
      <div>
        <p className="muted" style={{ margin: 0 }}>
          {source} · {category}
        </p>
        <h3>{topic}</h3>
        <p>{summary ?? "Trend momentum score and growth estimate based on live signals."}</p>
        {url ? (
          <a className="textLink" href={url} target="_blank" rel="noreferrer">
            Open source
          </a>
        ) : null}
      </div>
      <div style={{ textAlign: "right" }}>
        <div className="pill">{momentum}/100</div>
        <div className="muted" style={{ marginTop: 10 }}>
          {change}
        </div>
      </div>
    </article>
  );
}
