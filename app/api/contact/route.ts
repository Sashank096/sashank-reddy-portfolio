import { NextResponse } from "next/server";
import { consumeRateLimit, requestAddress } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Body = { name?: string; email?: string; phone?: string; subject?: string; message?: string; website?: string };

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
const clean = (v: unknown, max: number) => String(v ?? "").replace(/\r/g, "").trim().slice(0, max);

export async function POST(req: Request) {
  const contentLength = Number(req.headers.get("content-length") ?? 0);
  if (contentLength > 20_000) {
    return NextResponse.json({ error: "The message is too large." }, { status: 413 });
  }

  let b: Body;
  try {
    b = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: bots fill this hidden field. Pretend success and drop the message.
  if (b.website) return NextResponse.json({ ok: true });
  if (!consumeRateLimit(`contact:${requestAddress(req)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429 });
  }

  const name = clean(b.name, 100).replace(/\n/g, " ");
  const email = clean(b.email, 200).replace(/\n/g, "");
  const phone = clean(b.phone, 30).replace(/\n/g, " ");
  const subject = clean(b.subject, 150).replace(/\n/g, " ");
  const message = clean(b.message, 5000);

  if (name.length < 2 || subject.length < 3 || message.length < 10 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please fill in name, a valid email, subject and message." }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL || "sathisashankreddy@gmail.com";
  if (!key) {
    console.error("Contact email unavailable: RESEND_API_KEY is not configured.");
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email me directly at sathisashankreddy@gmail.com." },
      { status: 503 },
    );
  }
  const from = process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>";

  const html = `<div style="font-family:Arial,sans-serif;line-height:1.55">
<h2 style="margin:0 0 12px">New portfolio message</h2>
<p><b>Name:</b> ${esc(name)}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone || "not given")}<br><b>Subject:</b> ${esc(subject)}</p>
<p style="white-space:pre-wrap;border-left:3px solid #6d5efc;padding-left:12px">${esc(message)}</p></div>`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfolio: ${subject}`,
        html,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "not given"}\nSubject: ${subject}\n\n${message}`,
      }),
    });
  } catch (error) {
    console.error("Contact email provider request failed.", error);
    return NextResponse.json(
      { error: "The email service could not be reached. Please try again later or email me directly." },
      { status: 502 },
    );
  }

  if (!res.ok) {
    console.error(`Contact email provider rejected the message (status ${res.status}).`);
    return NextResponse.json(
      { error: "The message could not be delivered. Please email me directly." },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
