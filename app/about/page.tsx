import type { Metadata } from "next";
import About from "@/components/About";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "About",
  description: "About Sashank Reddy Sathi, including his education, experience, and certifications.",
  openGraph: { title: "About | Sashank Reddy Sathi", description: "Learn about my background, education, experience, and certifications." },
  twitter: { card: "summary_large_image", title: "About | Sashank Reddy Sathi", description: "Learn about my background, education, experience, and certifications." },
};

export default function AboutPage() {
  return (
    <section className="container page">
      <header className="pagehead">
        <h1 className="display">About</h1>
        <p className="lead">A little about my background and what I&apos;m working toward.</p>
      </header>
      <About />
      <Experience />
    </section>
  );
}
