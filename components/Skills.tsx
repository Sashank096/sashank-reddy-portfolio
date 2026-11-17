"use client";

import { useMemo, useState } from "react";
import { skillGroups } from "@/data/skills";
import { LineIcon, SearchIcon, type LineIconName } from "./ui/Icons";

const groupIcons: Record<string, LineIconName> = {
  Languages: "terminal",
  "AI/ML": "brain",
  "Data Analytics": "chart",
  "Web Development": "globe",
  Tools: "tool",
};

export default function Skills({ searchable = false }: { searchable?: boolean }) {
  const [query, setQuery] = useState("");
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
          {groups.map((group) => (
            <section className="card skill-group" key={group.title}>
              <h2 className="display"><LineIcon name={groupIcons[group.title]} /> {group.title}</h2>
              <ul className="skill-tiles">
                {group.items.map((skill) => (
                  <li className="skill-tile" key={skill}>
                    <LineIcon name={groupIcons[group.title]} size={16} />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <div className="card empty"><p>No skills match &ldquo;{query}&rdquo;.</p></div>
      )}
      <section className="card always-learning">
        <h2 className="display">Always Learning</h2>
        <p>I keep learning by building, experimenting, and exploring ideas across software and AI.</p>
      </section>
    </div>
  );
}
