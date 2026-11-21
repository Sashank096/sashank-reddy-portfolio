import { site } from "@/data/site";
import Card from "./ui/Card";
import SwarmBuild from "./SwarmBuild";

export default function About() {
  return (
    <Card className="about-copy">
      <SwarmBuild label="" small />
      <p className="section-eyebrow">A LITTLE CONTEXT</p>
      <h3>Curious by nature.<br /><span>Builder by choice.</span></h3>
      {site.about.map((p) => <p key={p} className="prose">{p}</p>)}
      <ul className="about-chips" aria-label="Areas of focus">
        {["Python", "JavaScript", "AI/ML", "Computer Vision", "Power BI", "Supabase"].map((item) => <li key={item}>{item}</li>)}
      </ul>
    </Card>
  );
}
