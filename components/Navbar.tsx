"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/data/site";
import { CloseIcon, MenuIcon, MoonIcon, SearchIcon, SunIcon } from "./ui/Icons";

const links = [
  { href: "/#projects", label: "Projects" },
  { href: "/#about", label: "About" },
  { href: "/#skills", label: "Skills" },
  { href: "/#postcards", label: "Postcards" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === "light" ? "light" : "dark");
  }, []);

  function toggleTheme() {
    const current = document.documentElement.dataset.theme === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#07060A" : "#FAF7F5");
    document.documentElement.classList.add("theme-transition");
    window.setTimeout(() => document.documentElement.classList.remove("theme-transition"), 320);
    setTheme(next);
  }

  return (
    <header className="nav">
      <div className="container nav-in">
        <Link href="/" className="brand" onClick={() => setMenu(false)}>
          <span className="brand-mark" aria-hidden="true">S<span>.</span></span>
          <span className="display">{site.name}</span>
        </Link>

        <nav className="navlinks" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenu(false)}
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
            aria-pressed={theme === "light"}
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
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
