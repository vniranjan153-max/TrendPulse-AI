import Link from "next/link";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">TrendPulse AI</div>
      <nav className="stack">
        <Link href="/dashboard" className="active">Dashboard</Link>
        <Link href="#">Watchlist</Link>
        <Link href="#">Analytics</Link>
        <Link href="#">Settings</Link>
      </nav>
    </aside>
  );
}
