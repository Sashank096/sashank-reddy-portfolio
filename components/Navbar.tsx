"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/data/site";
import { burstFrom } from "@/lib/utils";
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./ui/Icons";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/skills", label: "Skills" },
  { href: "/postcards", label: "Postcards" },
  { href: "/days", label: "Days" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggleTheme(e: MouseEvent<HTMLButtonElement>) {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
    setTheme(next);
    burstFrom(e, next === "dark" ? ["🌙", "✨", "⭐"] : ["☀️", "🌤️", "✨"], 8);
  }

  return (
    <header className="nav">
      <div className="container nav-in">
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-img">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={site.photo} alt="" width={32} height={32} />
          </span>
          <span className="display">{site.short}</span>
        </Link>

        <nav className="navlinks" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={pathname === l.href ? "active" : undefined}
              aria-current={pathname === l.href ? "page" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            className="searchbtn"
            onClick={() => window.dispatchEvent(new Event("open-search"))}
            aria-label="Search the portfolio"
          >
            <SearchIcon />
            <span className="searchbtn-text">Search</span>
          </button>
          <button
            className="iconbtn"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
          <button
            className="iconbtn menu-btn"
            onClick={() => setMenu((m) => !m)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
          >
            {menu ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menu && (
        <nav className="mobile-menu container" aria-label="Mobile">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
              className={pathname === l.href ? "active" : undefined}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
