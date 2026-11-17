import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Get In Touch",
  description: "Contact Sashank Reddy Sathi about projects, opportunities, and collaboration.",
  openGraph: { title: "Get In Touch | Sashank Reddy Sathi", description: "Reach out about projects, opportunities, or collaboration." },
  twitter: { card: "summary_large_image", title: "Get In Touch | Sashank Reddy Sathi", description: "Reach out about projects, opportunities, or collaboration." },
};

export default function ContactPage() {
  return (
    <section className="container page">
      <header className="pagehead">
        <h1 className="display">Get In Touch</h1>
        <p className="lead">Send a message or reach out through any of these channels.</p>
      </header>
      <Contact />
    </section>
  );
}
