import { site } from "@/data/site";
import Button from "./ui/Button";
import Card from "./ui/Card";

export default function About() {
  return (
    <Card>
      <h2 className="display">About me</h2>
      {site.about.map((p) => (
        <p key={p} className="prose">{p}</p>
      ))}
      <ul className="facts">
        <li>{site.city}, {site.state}</li>
        <li>B.Tech AI &amp; ML, Aditya University</li>
        <li>Infosys Springboard intern</li>
      </ul>
      <div className="row-actions">
        <Button href={site.resume} external>View resume</Button>
        <Button href="/contact" variant="ghost">Get in touch</Button>
      </div>
    </Card>
  );
}
