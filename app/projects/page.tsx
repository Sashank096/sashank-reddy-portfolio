import type { Metadata } from "next";
import Projects from "@/components/Projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A showcase of Sashank Reddy Sathi's software, AI, and data projects.",
  openGraph: { title: "Projects | Sashank Reddy Sathi", description: "A showcase of my recent work and contributions." },
  twitter: { card: "summary_large_image", title: "Projects | Sashank Reddy Sathi", description: "A showcase of my recent work and contributions." },
};

export default function ProjectsPage() {
  return (
    <section className="container page">
      <header className="pagehead">
        <h1 className="display">Projects</h1>
        <p className="lead">A showcase of my recent work and contributions</p>
      </header>
      <Projects searchable />
    </section>
  );
}
