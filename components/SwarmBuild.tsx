const colors = ["coral", "violet", "cyan", "lime", "cyan", "coral", "lime", "violet", "lime", "cyan", "violet", "coral"];

export default function SwarmBuild({ label, cover = false, small = false }: { label: string; cover?: boolean; small?: boolean }) {
  return (
    <div className={`swarm-rebuild${cover ? " swarm-rebuild-cover" : ""}${small ? " swarm-rebuild-small" : ""}`} aria-hidden="true">
      {cover && <div className="swarm-rebuild-wash" />}
      <div className="swarm-rebuild-grid" />
      <span className="swarm-build-guide guide-horizontal" />
      <span className="swarm-build-guide guide-vertical" />
      <span className="swarm-build-box build-box-one" />
      <span className="swarm-build-box build-box-two" />
      <span className="swarm-build-caret" />
      {colors.slice(0, small ? 8 : colors.length).map((color, index) => (
        <span
          className={`swarm-agent cursor-${index + 1}`}
          key={`${color}-${index}`}
          style={{ color: `var(--swarm-${color})`, animationDelay: `${index * 0.045}s` }}
        >
          <svg viewBox="0 0 28 34">
            <path d="M2 2v25l7-7 5 11 5-2-5-11h10L2 2Z" />
          </svg>
        </span>
      ))}
      {!small && <span className="swarm-build-status">{label} <i /></span>}
    </div>
  );
}
