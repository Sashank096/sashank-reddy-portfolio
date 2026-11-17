"use client";

import { usePathname } from "next/navigation";
import { site } from "@/data/site";

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="footer">
      <div className="container footer-in">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p className="footer-links">
          <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href={`mailto:${site.email}`}>Email</a>
        </p>
      </div>
    </footer>
  );
}
