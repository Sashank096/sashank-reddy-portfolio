import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import ChatPortfolio, { type AvatarMood } from "@/components/ChatPortfolio";

export const metadata: Metadata = {
  title: "Sashank Reddy Sathi | Digital Archive",
  description: "Chat with Sashank about his projects, skills, and current work.",
  openGraph: { title: "Sashank Reddy Sathi | Digital Archive", description: "Explore my projects, skills, and current work through a chat-first portfolio." },
  twitter: { card: "summary_large_image", title: "Sashank Reddy Sathi | Digital Archive", description: "Explore my projects, skills, and current work through a chat-first portfolio." },
};

export default function Home() {
  const moods: AvatarMood[] = ["default", "thinking", "projects", "skills", "fun", "contact"];
  const availableMoods = Object.fromEntries(
    moods.map((mood) => [mood, existsSync(join(process.cwd(), "public", "images", "memoji", `${mood}.png`))]),
  ) as Record<AvatarMood, boolean>;

  return <ChatPortfolio availableMoods={availableMoods} />;
}
