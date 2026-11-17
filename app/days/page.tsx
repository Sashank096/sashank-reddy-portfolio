import type { Metadata } from "next";
import Days from "@/components/Days";

export const metadata: Metadata = {
  title: "Days",
  description: "Short journal notes and milestones from Sashank Reddy Sathi.",
  openGraph: { title: "Days | Sashank Reddy Sathi", description: "Short journal notes and milestones from my days." },
  twitter: { card: "summary_large_image", title: "Days | Sashank Reddy Sathi", description: "Short journal notes and milestones from my days." },
};

export default function DaysPage() {
  return (
    <section className="container page">
      <header className="pagehead">
        <h1 className="display">Days</h1>
        <p className="lead">A timeline of small updates, ideas, and milestones.</p>
      </header>
      <Days />
    </section>
  );
}
