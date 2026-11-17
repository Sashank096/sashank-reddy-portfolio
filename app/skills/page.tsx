import type { Metadata } from "next";
import Skills from "@/components/Skills";

export const metadata: Metadata = {
  title: "Skills & Technologies",
  description: "Technologies and tools Sashank Reddy Sathi works with.",
  openGraph: { title: "Skills & Technologies | Sashank Reddy Sathi", description: "Technologies and tools I work with." },
  twitter: { card: "summary_large_image", title: "Skills & Technologies | Sashank Reddy Sathi", description: "Technologies and tools I work with." },
};

export default function SkillsPage() {
  return (
    <section className="container page">
      <header className="pagehead">
        <h1 className="display">Skills &amp; Technologies</h1>
        <p className="lead">Technologies and tools I work with</p>
      </header>
      <Skills searchable />
    </section>
  );
}
