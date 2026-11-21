import { certifications, education, experience } from "@/data/experience";
import Card from "./ui/Card";
import SwarmBuild from "./SwarmBuild";

export default function Experience() {
  return (
    <div className="two-col">
      <Card>
        <SwarmBuild label="" small />
        <h2 className="display">Experience</h2>
        <ol className="timeline">
          {experience.map((x) => (
            <li key={x.role}>
              <span className="dot">🏢</span>
              <h3>{x.role}</h3>
              <p className="muted">{x.period}</p>
              <ul className="bullets">
                {x.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
        <h2 className="display sub">Certifications</h2>
        <ul className="bullets">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </Card>
      <Card>
        <SwarmBuild label="" small />
        <h2 className="display">Education</h2>
        <ol className="timeline">
          <li>
            <span className="dot">🎓</span>
            <h3>{education.degree}</h3>
            <p>{education.school}</p>
            <p className="muted">{education.period}</p>
            <p className="badge">{education.current}</p>
          </li>
        </ol>
      </Card>
    </div>
  );
}
