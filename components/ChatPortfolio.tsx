"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { LineIcon, type LineIconName } from "./ui/Icons";

type Topic = "me" | "projects" | "skills" | "fun" | "contact";
export type AvatarMood = "default" | "thinking" | "projects" | "skills" | "fun" | "contact";
type Message =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "assistant"; topic: Topic }
  | { id: number; role: "assistant"; text: string };

const quickActions: { topic: Topic; label: string; icon: LineIconName; prompt: string }[] = [
  { topic: "me", label: "Me", icon: "user", prompt: "Tell me about me" },
  { topic: "projects", label: "Projects", icon: "code", prompt: "Show me your projects" },
  { topic: "skills", label: "Skills", icon: "brain", prompt: "What skills do you have?" },
  { topic: "fun", label: "Fun", icon: "sparkles", prompt: "What do you enjoy?" },
  { topic: "contact", label: "Contact", icon: "mail", prompt: "How can I contact you?" },
];

const fallbackReply =
  "Thanks for your question! I'm currently having trouble connecting to my AI brain. In the meantime, you can use the quick buttons above to learn about my projects, skills, and experience, or reach out to me directly through the contact options!";

const hobbiesPlaceholder =
  "Outside of coding, I enjoy exploring new ideas, following interesting technology, and finding creative ways to turn everyday problems into useful projects. This is a general placeholder until I add my own personal interests.";

export default function ChatPortfolio({ availableMoods }: { availableMoods: Record<AvatarMood, boolean> }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [started, setStarted] = useState(false);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(false);
  const [mood, setMood] = useState<AvatarMood>("default");
  const [avatarFailedMood, setAvatarFailedMood] = useState<AvatarMood | null>(null);

  function addUserMessage(text: string) {
    setStarted(true);
    setMessages((current) => [...current, { id: Date.now(), role: "user", text }]);
  }

  const chooseTopic = useCallback(async (topic: Topic) => {
    if (busy) return;
    const action = quickActions.find((item) => item.topic === topic);
    if (!action) return;
    setBusy(true);
    setDraft("");
    addUserMessage(action.prompt);
    setTyping(true);
    setMood("thinking");
    await new Promise((resolve) => window.setTimeout(resolve, 650));
    setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", topic }]);
    setTyping(false);
    setMood(topic === "me" ? "default" : topic);
    setBusy(false);
  }, [busy]);

  useEffect(() => {
    const onChatTopic = (event: Event) => {
      const requested = (event as CustomEvent<unknown>).detail;
      const action = quickActions.find((item) => item.topic === requested);
      if (action) void chooseTopic(action.topic);
    };
    window.addEventListener("chat-topic", onChatTopic);
    return () => window.removeEventListener("chat-topic", onChatTopic);
  }, [chooseTopic]);

  async function askQuestion(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const question = draft.trim();
    if (!question || busy) return;
    setBusy(true);
    setDraft("");
    addUserMessage(question);
    setTyping(true);
    setMood("thinking");

    let reply = fallbackReply;
    try {
      await new Promise((resolve) => window.setTimeout(resolve, 650));
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });
      if (!response.ok) throw new Error("Chat request failed.");
      const result = (await response.json()) as { answer?: unknown };
      if (typeof result.answer === "string" && result.answer.trim()) reply = result.answer.trim();
    } catch {
      reply = fallbackReply;
    }

    setMessages((current) => [...current, { id: Date.now() + 1, role: "assistant", text: reply }]);
    setTyping(false);
    setMood("default");
    setBusy(false);
  }

  const avatarSrc = !availableMoods[mood] || avatarFailedMood === mood
    ? site.photo
    : `/images/memoji/${mood}.png`;

  return (
    <section className="container chat-page" aria-label="Chat with Sashank">
      <header className={started ? "chat-intro started" : "chat-intro"}>
        <div className="chat-avatar">
          <Image
            src={avatarSrc}
            alt={`${site.name} avatar`}
            width={104}
            height={104}
            unoptimized
            onError={() => setAvatarFailedMood(mood)}
          />
        </div>
        {!started ? (
          <>
            <p className="chat-role"><LineIcon name="sparkles" size={15} /> {site.tagline}</p>
            <p className="chat-kicker">Welcome to my digital archive</p>
            <h1 className="display chat-title">What&apos;s Sashank doing these days?</h1>
          </>
        ) : null}
      </header>

      <div className="chat-stream" aria-live="polite">
        {messages.map((message) => (
          <article key={message.id} className={`chat-message ${message.role}`}>
            {"text" in message ? (
              <p className="chat-bubble">{message.text}</p>
            ) : (
              <TopicReply topic={message.topic} />
            )}
          </article>
        ))}
        {typing && (
          <div className="chat-message assistant" role="status" aria-label="Sashank is thinking">
            <div className="chat-bubble typing-dots"><span /><span /><span /></div>
          </div>
        )}
      </div>

      <div className="chat-dock">
        <div className="chat-dock-inner">
          <nav className="chat-quick-actions" aria-label="Quick questions">
            {quickActions.map((action) => (
              <button
                key={action.topic}
                className="chat-quick"
                type="button"
                aria-pressed={mood === action.topic}
                disabled={busy}
                onClick={() => void chooseTopic(action.topic)}
              >
                <LineIcon name={action.icon} size={15} />
                {action.label}
              </button>
            ))}
          </nav>
          <form className="chat-composer" onSubmit={askQuestion}>
            <input
              value={draft}
              onChange={(event) => {
                setDraft(event.target.value);
                setMood(event.target.value ? "thinking" : "default");
              }}
              onFocus={() => {
                if (!busy) setMood("thinking");
              }}
              onBlur={() => {
                if (!busy && !draft) setMood("default");
              }}
              placeholder="Ask me anything..."
              aria-label="Ask me anything"
              maxLength={1000}
            />
            <button className="chat-send" type="submit" aria-label="Send message" disabled={busy || !draft.trim()}>
              <LineIcon name="send" size={18} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function TopicReply({ topic }: { topic: Topic }) {
  if (topic === "me") {
    return (
      <div className="chat-answer">
        <h2>A little about me</h2>
        <p>{site.about[0]}</p>
        <div className="chat-links">
          <Link className="btn btn-ghost" href="/about">View Details</Link>
        </div>
      </div>
    );
  }

  if (topic === "projects") {
    return (
      <div className="chat-answer">
        <h2>Recent projects</h2>
        <div className="chat-project-list">
          {projects.slice(0, 3).map((project) => (
            <article key={project.id} className="chat-project">
              <strong>{project.title}</strong>
              <p>{project.description}</p>
              <Link href={`/projects#${project.id}`}>View Details</Link>
            </article>
          ))}
        </div>
        <div className="chat-links"><Link className="btn btn-ghost" href="/projects">All projects</Link></div>
      </div>
    );
  }

  if (topic === "skills") {
    return (
      <div className="chat-answer">
        <h2>Skills at a glance</h2>
        <div className="chat-skill-groups">
          {skillGroups.map((group) => (
            <section key={group.title}>
              <h3>{group.title}</h3>
              <ul className="tags">{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </section>
          ))}
        </div>
        <div className="chat-links"><Link className="btn btn-ghost" href="/skills">View Details</Link></div>
      </div>
    );
  }

  if (topic === "fun") {
    return (
      <div className="chat-answer">
        <h2>A little beyond the code</h2>
        <p>{hobbiesPlaceholder}</p>
      </div>
    );
  }

  return (
    <div className="chat-answer">
      <h2>Let&apos;s connect</h2>
      <p>Reach out through any of these channels.</p>
      <div className="chat-links">
        <a className="btn" href={`mailto:${site.email}`}><LineIcon name="mail" size={16} /> Email</a>
        <a className="btn btn-ghost" href={site.github} target="_blank" rel="noopener noreferrer"><LineIcon name="code" size={16} /> GitHub</a>
        <a className="btn btn-ghost" href={site.linkedin} target="_blank" rel="noopener noreferrer"><LineIcon name="linkedin" size={16} /> LinkedIn</a>
      </div>
    </div>
  );
}
