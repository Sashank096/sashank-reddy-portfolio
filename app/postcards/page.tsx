import type { Metadata } from "next";
import Postcards from "@/components/Postcards";

export const metadata: Metadata = {
  title: "Postcards",
  description: "Photo albums and postcards from Sashank Reddy Sathi.",
  openGraph: { title: "Postcards | Sashank Reddy Sathi", description: "Photo albums and postcards from my life." },
  twitter: { card: "summary_large_image", title: "Postcards | Sashank Reddy Sathi", description: "Photo albums and postcards from my life." },
};

export default function PostcardsPage() {
  return (
    <section className="container page">
      <header className="pagehead">
        <h1 className="display">Postcards</h1>
        <p className="lead">Small snapshots and moments worth keeping.</p>
      </header>
      <Postcards />
    </section>
  );
}
