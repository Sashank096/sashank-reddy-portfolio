import { NextResponse } from "next/server";
import { certifications, education, experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { skillGroups } from "@/data/skills";
import { consumeRateLimit, requestAddress } from "@/lib/rate-limit";

export const runtime = "nodejs";

const fallback =
  "Thanks for your question! I'm currently having trouble connecting to my AI brain. In the meantime, you can use the quick buttons above to learn about my projects, skills, and experience, or reach out to me directly through the contact options!";

type Completion = { choices: { message?: { content?: unknown } }[] };

function answer(text: string) {
  return NextResponse.json({ answer: text });
}

function isCompletion(value: unknown): value is Completion {
  if (typeof value !== "object" || value === null || !("choices" in value) || !Array.isArray(value.choices)) {
    return false;
  }
  const first = value.choices[0];
  return typeof first === "object" && first !== null && "message" in first;
}

export async function POST(request: Request) {
  const address = requestAddress(request);
  if (!consumeRateLimit(`chat:${address}`, 20, 60 * 60 * 1000)) return answer(fallback);

  let question: unknown;
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null || !("question" in body)) {
      return NextResponse.json({ error: "Enter a question." }, { status: 400 });
    }
    question = body.question;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof question !== "string" || !question.trim() || question.length > 1000) {
    return NextResponse.json({ error: "Questions must be between 1 and 1000 characters." }, { status: 400 });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) return answer(fallback);

  const facts = JSON.stringify({
    profile: {
      name: site.name,
      tagline: site.tagline,
      bio: site.about,
      email: site.email,
      phone: site.phoneDisplay,
      location: `${site.city}, ${site.state}`,
      GitHub: site.github,
      LinkedIn: site.linkedin,
      resume: site.resume,
    },
    education,
    experience,
    certifications,
    projects: projects.map(({ id, title, description, tags, category, codeUrl, liveUrl }) => ({
      id, title, description, tags, category, github: codeUrl, live: liveUrl,
    })),
    skills: skillGroups,
  });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0,
        max_tokens: 300,
        messages: [
          {
            role: "system",
            content: `Answer using only the facts in this data. Do not infer, embellish, or invent personal details. If the data does not answer the question, reply with this exact text: "${fallback}"\n\nDATA:\n${facts}`,
          },
          { role: "user", content: question.trim() },
        ],
      }),
    });
    if (!response.ok) return answer(fallback);

    const result: unknown = await response.json();
    if (!isCompletion(result)) return answer(fallback);
      const content = result.choices[0]?.message?.content;
    return answer(typeof content === "string" && content.trim() ? content.trim() : fallback);
  } catch {
    return answer(fallback);
  }
}
