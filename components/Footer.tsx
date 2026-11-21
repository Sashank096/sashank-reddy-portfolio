"use client";

import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-in">
        <p>© 2026 {site.name}</p>
        <p className="footer-links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
