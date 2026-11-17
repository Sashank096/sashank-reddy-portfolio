export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

/** Small emoji burst at a screen position. Skipped when the visitor prefers reduced motion. */
export function burst(x: number, y: number, emojis: string[], count = 10) {
  if (typeof document === "undefined") return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("span");
    el.className = "burst";
    el.textContent = emojis[i % emojis.length];
    const angle = (Math.PI * 2 * i) / count + Math.random() * 0.6;
    const dist = 50 + Math.random() * 60;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--dy", `${Math.sin(angle) * dist - 30}px`);
    el.style.setProperty("--rot", `${(Math.random() - 0.5) * 80}deg`);
    document.body.appendChild(el);
    window.setTimeout(() => el.remove(), 900);
  }
}

export function burstFrom(e: { currentTarget: Element }, emojis: string[], count = 8) {
  const r = e.currentTarget.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, emojis, count);
}
