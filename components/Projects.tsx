"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { projects, type Category } from "@/data/projects";
import Button from "./ui/Button";
import { GitHubIcon, LineIcon, SearchIcon } from "./ui/Icons";

const CATEGORIES: ("All" | Category)[] = ["All", "Web", "ML/AI", "Tools", "Other"];

export default function Projects({ searchable = false }: { searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Category>("All");

  const visibleProjects = useMemo(() => {
    const search = query.trim().toLowerCase();
    return projects.filter((project) => (
      (category === "All" || project.category === category)
      && (!search || `${project.title} ${project.description} ${project.tags.join(" ")} ${project.category}`.toLowerCase().includes(search))
    ));
  }, [category, query]);

  return (
    <div>
      {searchable && (
        <div className="project-filters">
          <label className="field-search">
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search projects by name, tech or topic..."
              aria-label="Search projects"
            />
          </label>
          <div className="chips" role="group" aria-label="Filter projects by category">
            {CATEGORIES.map((item) => (
              <button
                key={item}
                className={category === item ? "chip active" : "chip"}
                type="button"
                aria-pressed={category === item}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {visibleProjects.length ? (
        <div className="grid">
          {visibleProjects.map((project) => (
            <article className="pcard project-card" id={project.id} key={project.id}>
              <div className="project-cover">
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  fill
                  priority={project.id === projects[0]?.id}
                  sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1040px) calc((100vw - 3rem) / 2), 346px"
                />
              </div>
              <div className="project-content">
                <p className="badge">{project.category}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul className="tags" aria-label="Project technologies">
                  {project.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}
                  {project.tags.length > 4 && <li className="project-tag-more">+{project.tags.length - 4} more</li>}
                </ul>
                <div className="row-actions">
                  <Button href={project.github} external><GitHubIcon size={16} /> Code</Button>
                  {project.live && <Button href={project.live} external variant="ghost"><LineIcon name="arrow" size={16} /> Live</Button>}
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="card empty">
          <p>No projects match &ldquo;{query}&rdquo;.</p>
          <Button variant="ghost" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</Button>
        </div>
      )}
    </div>
  );
}
