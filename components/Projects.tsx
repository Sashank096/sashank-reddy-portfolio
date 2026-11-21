"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projects, type Category } from "@/data/projects";
import Button from "./ui/Button";
import { GitHubIcon, LineIcon, SearchIcon } from "./ui/Icons";
import Modal from "./ui/Modal";
import type { Project } from "@/data/projects";
import SwarmBuild from "./SwarmBuild";

const CATEGORIES: ("All" | Category)[] = ["All", "Web", "ML/AI", "Tools", "Other"];

export default function Projects({ searchable = false }: { searchable?: boolean }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<"All" | Category>("All");
  const [preview, setPreview] = useState<Project | null>(null);

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
          <AnimatePresence mode="popLayout" initial={false}>
          {visibleProjects.map((project, index) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              whileHover={{ y: -6 }}
              transition={{ layout: { duration: 0.35 }, opacity: { duration: 0.25 }, y: { duration: 0.35, delay: index * 0.06 } }}
              className="pcard project-card"
              id={project.id}
              key={project.id}
              onPointerMove={(event) => {
                const bounds = event.currentTarget.getBoundingClientRect();
                event.currentTarget.style.setProperty("--glow-x", `${event.clientX - bounds.left}px`);
                event.currentTarget.style.setProperty("--glow-y", `${event.clientY - bounds.top}px`);
              }}
            >
              <SwarmBuild label="" small />
              <button className="project-cover" type="button" onClick={() => setPreview(project)} aria-label={`Preview ${project.title}`}>
                <Image
                  src={project.image}
                  alt={project.imageAlt ?? `${project.title} screenshot`}
                  fill
                  priority={project.id === projects[0]?.id}
                  sizes="(max-width: 680px) calc(100vw - 2rem), (max-width: 1040px) calc((100vw - 3rem) / 2), 346px"
                />
                <span className="project-index">{String(projects.indexOf(project) + 1).padStart(2, "0")}</span>
                <span className="project-preview-hint">OPEN PREVIEW ↗</span>
              </button>
              <div className="project-content">
                <p className="badge">{project.category}</p>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
                <ul className="tags" aria-label="Project technologies">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className={`row-actions project-actions${project.liveUrl ? "" : " code-only"}`}>
                  <Button href={project.codeUrl} external><GitHubIcon size={16} /> Code</Button>
                  {project.liveUrl && <Button href={project.liveUrl} external variant="ghost"><LineIcon name="arrow" size={16} /> Live</Button>}
                </div>
              </div>
            </motion.article>
          ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="card empty">
          <p>No projects match &ldquo;{query}&rdquo;.</p>
          <Button variant="ghost" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</Button>
        </div>
      )}
      <Modal open={!!preview} onClose={() => setPreview(null)} title={preview?.title ?? "Project preview"}>
        {preview && (
          <div className="project-preview-modal">
            <div className="preview-image">
              <Image src={preview.image} alt={preview.imageAlt ?? `${preview.title} screenshot`} fill sizes="(max-width: 760px) 90vw, 720px" />
            </div>
            <p className="badge">{preview.category}</p>
            <h2>{preview.title}</h2>
            <p>{preview.description}</p>
            <div className="row-actions">
              <Button href={preview.codeUrl} external><GitHubIcon size={16} /> Code</Button>
              {preview.liveUrl && <Button href={preview.liveUrl} external variant="ghost"><LineIcon name="arrow" size={16} /> Live</Button>}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
