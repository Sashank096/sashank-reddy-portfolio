"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/data/projects";
import { skillGroups } from "@/data/skills";
import { site } from "@/data/site";
import { SearchIcon } from "./ui/Icons";

type Item = {
  id: string;
  emoji: string;
  title: string;
  hint: string;
  group: string;
  href: string;
  external?: boolean;
  projectId?: string;
  keywords?: string;
};

function buildItems(): Item[] {
  const items: Item[] = [
    { id: "p-home", emoji: "⌂", title: "Home", hint: "Welcome to my digital archive", group: "Page", href: "/#home", keywords: "me intro" },
    { id: "p-projects", emoji: "↗", title: "Projects", hint: "AI, data, and full-stack work", group: "Page", href: "/#projects", keywords: "work portfolio" },
    { id: "p-skills", emoji: "◈", title: "Skills", hint: "Languages, AI/ML, data and tools", group: "Page", href: "/#skills", keywords: "technologies stack" },
    { id: "p-about", emoji: "◉", title: "About", hint: "Background, experience and education", group: "Page", href: "/#about", keywords: "experience education internship certifications" },
    { id: "p-postcards", emoji: "▣", title: "Postcards", hint: "Photo albums and moments", group: "Page", href: "/#postcards", keywords: "photos gallery albums" },
    { id: "p-contact", emoji: "✉️", title: "Contact", hint: "Send me a message", group: "Page", href: "/#contact", keywords: "email hire form message reach" },
    { id: "l-resume", emoji: "📄", title: "Resume", hint: "Open the PDF", group: "Link", href: site.resume, external: true, keywords: "cv download" },
    { id: "l-github", emoji: "🐙", title: "GitHub", hint: "github.com/Sashank096", group: "Link", href: site.github, external: true, keywords: "code repositories" },
    { id: "l-linkedin", emoji: "💼", title: "LinkedIn", hint: "Connect with me", group: "Link", href: site.linkedin, external: true, keywords: "network" },
    { id: "e-infosys", emoji: "▤", title: "Infosys Springboard", hint: "Internship experience", group: "Experience", href: "/about", keywords: "intern internship infosys" },
    { id: "e-aditya", emoji: "▤", title: "Aditya University", hint: "B.Tech in AI & ML, 2025 – 2029", group: "Education", href: "/about", keywords: "btech education college surampalem" },
  ];
  projects.forEach((p) =>
    items.push({
      id: `pr-${p.id}`,
      emoji: "↗",
      title: p.title,
      hint: p.description,
      group: "Project",
      href: `/#${p.id}`,
      projectId: p.id,
      keywords: `${p.tags.join(" ")} ${p.category}`,
    }),
  );
  const seen = new Set<string>();
  skillGroups.forEach((g) =>
    g.items.forEach((s) => {
      if (seen.has(s)) return;
      seen.add(s);
      items.push({ id: `s-${s}`, emoji: "◈", title: s, hint: `Skill in ${g.title}`, group: "Skill", href: "/#skills" });
    }),
  );
  return items;
}

const ITEMS = buildItems();

function score(item: Item, q: string) {
  const title = item.title.toLowerCase();
  const hay = `${item.title} ${item.hint} ${item.keywords ?? ""} ${item.group}`.toLowerCase();
  let s = 0;
  for (const tok of q.toLowerCase().split(/\s+/).filter(Boolean)) {
    if (!hay.includes(tok)) return -1;
    s += title.startsWith(tok) ? 3 : title.includes(tok) ? 2 : 1;
  }
  return s;
}

export default function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => {
    const query = q.trim();
    if (!query) return ITEMS.filter((i) => i.group === "Page" || i.group === "Project").slice(0, 9);
    return ITEMS.map((i) => ({ i, s: score(i, query) }))
      .filter((x) => x.s >= 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.i);
  }, [q]);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setActive(0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement | null)?.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "/" && !typing) {
        e.preventDefault();
        setOpen(true);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    inputRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    listRef.current?.querySelector('[aria-selected="true"]')?.scrollIntoView({ block: "nearest" });
  }, [active, results]);

  function go(item: Item) {
    close();
    if (item.external) {
      window.open(item.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(item.href);
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Escape") close();
    else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (results.length ? (a + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (results.length ? (a - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  if (!open) return null;
  return (
    <div className="overlay palette-overlay" onMouseDown={close}>
      <div
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Search portfolio"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="palette-input">
          <SearchIcon size={20} />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search projects, skills, pages…"
            aria-label="Search"
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-list"
            autoComplete="off"
            spellCheck={false}
          />
          <button className="esc" onClick={close} aria-label="Close search">Esc</button>
        </div>

        {results.length ? (
          <ul id="palette-list" role="listbox" ref={listRef} className="palette-list">
            {results.map((r, i) => (
              <li
                key={r.id}
                role="option"
                aria-selected={i === active}
                className={i === active ? "row active" : "row"}
                onMouseMove={() => i !== active && setActive(i)}
                onClick={() => go(r)}
              >
                <span className="row-emoji">{r.emoji}</span>
                <span className="row-text">
                  <strong>{r.title}</strong>
                  <small>{r.hint}</small>
                </span>
                <span className="row-tag">{r.group}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="palette-empty">
            <span className="row-emoji big">🔍</span>
            <p>Nothing matches “{q}”.</p>
            <small>Try Python, OpenCV, Power BI or contact.</small>
          </div>
        )}

        <div className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> to move</span>
          <span><kbd>Enter</kbd> to open</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  );
}
