"use client";

import { useMemo, useState } from "react";
import { skillGroups } from "@/data/skills";
import { LineIcon, SearchIcon, type LineIconName } from "./ui/Icons";
import SwarmBuild from "./SwarmBuild";

const groupIcons: Record<string, LineIconName> = {
  Languages: "terminal",
  "AI/ML": "brain",
  "Data Analytics": "chart",
  "Web Development": "globe",
  Tools: "tool",
};

export default function Skills({ searchable = false }: { searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const [openGroup, setOpenGroup] = useState("Languages");
  const groups = useMemo(() => {
    const search = query.trim().toLowerCase();
    return skillGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => !search || `${item} ${group.title}`.toLowerCase().includes(search)),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  return (
    <div>
      {searchable && (
        <label className="field-search filters">
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search skills, for example OpenCV or Power BI..."
            aria-label="Search skills"
          />
        </label>
      )}
      {groups.length ? (
        <div className="skills-layout">
          {groups.map((group) => {
            const expanded = openGroup === group.title;
            return (
              <section className={`skill-accordion${expanded ? " open" : ""}`} key={group.title}>
                <SwarmBuild label="" small />
                <h3>
                  <button
                    className="skill-trigger"
                    id={`skill-trigger-${group.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`skill-panel-${group.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                    onClick={() => setOpenGroup(expanded ? "" : group.title)}
                  >
                    <span className="skill-heading-icon"><LineIcon name={groupIcons[group.title]} /></span>
                    <span>{group.title}</span>
                    <span className="skill-count">{group.items.length.toString().padStart(2, "0")}</span>
                    <span className="skill-toggle" aria-hidden="true">{expanded ? "−" : "+"}</span>
                  </button>
                </h3>
                <div
                  className="skill-panel"
                  id={`skill-panel-${group.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                  role="region"
                  aria-labelledby={`skill-trigger-${group.title.replace(/[^a-z0-9]+/gi, "-").toLowerCase()}`}
                  aria-hidden={!expanded}
                >
                  <div className="skill-panel-inner">
                    <ul className="skill-tiles">
                      {group.items.map((skill) => <li className="skill-tile" key={skill}>{skill}</li>)}
                    </ul>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      ) : (
        <div className="card empty"><p>No skills match &ldquo;{query}&rdquo;.</p></div>
      )}
      <p className="always-learning"><span>ALWAYS LEARNING</span> I keep learning by building, experimenting, and exploring ideas across software and AI.</p>
    </div>
  );
}
