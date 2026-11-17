import { days } from "@/data/days";

export default function Days() {
  return (
    <ol className="days-timeline">
      {days.map((entry) => (
        <li className="card day-entry" key={entry.date}>
          <time className="day-date" dateTime={entry.date}>
            {new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${entry.date}T00:00:00Z`))}
          </time>
          <h2>{entry.title}</h2>
          <p>{entry.text}</p>
          {entry.placeholder && <span className="sample-label">Sample entry — replace with your update</span>}
        </li>
      ))}
    </ol>
  );
}
