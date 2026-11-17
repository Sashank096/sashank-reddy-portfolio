"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { site } from "@/data/site";
import Card from "./ui/Card";
import { LineIcon, type LineIconName } from "./ui/Icons";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "ok" } | { kind: "error"; msg: string };
const meetingHref = `mailto:${site.email}?subject=Schedule%20a%20meeting`;

const contacts: { label: string; value: string; href: string; icon: LineIconName; external?: boolean }[] = [
  { label: "Schedule Meeting", value: "Request a time by email", href: meetingHref, icon: "calendar" },
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: "mail" },
  { label: "Phone", value: site.phoneDisplay, href: `tel:${site.phone}`, icon: "phone" },
  { label: "GitHub", value: "Sashank096", href: site.github, icon: "code", external: true },
  { label: "LinkedIn", value: "Sashank Reddy Sathi", href: site.linkedin, icon: "linkedin", external: true },
];

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const value = (key: string) => String(formData.get(key) ?? "").trim();
    const data = {
      name: value("name"),
      email: value("email"),
      phone: value("phone"),
      subject: value("subject"),
      message: value("message"),
      website: value("website"),
    };
    const nextErrors: Record<string, string> = {};
    if (data.name.length < 2) nextErrors.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) nextErrors.email = "Enter a valid email address.";
    if (data.phone && !/^[0-9+()\-\s]{6,20}$/.test(data.phone)) nextErrors.phone = "Use digits, spaces, + or - only.";
    if (data.subject.length < 3) nextErrors.subject = "Add a short subject.";
    if (data.message.length < 10) nextErrors.message = "Write at least 10 characters.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setStatus({ kind: "sending" });
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { error?: string };
      if (!response.ok) throw new Error(result.error || "The message could not be sent.");
      form.reset();
      setErrors({});
      setStatus({ kind: "ok" });
    } catch (error) {
      setStatus({ kind: "error", msg: error instanceof Error ? error.message : "The message could not be sent." });
    }
  }

  const sending = status.kind === "sending";

  return (
    <>
      <div className="contact-cards" aria-label="Contact options">
        {contacts.map((contact) => (
          <a
            className="contact-card"
            href={contact.href}
            key={contact.label}
            {...(contact.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <span className="contact-card-icon"><LineIcon name={contact.icon} /></span>
            <span className="contact-card-copy">
              <small>{contact.label}</small>
              <strong>{contact.value}</strong>
            </span>
          </a>
        ))}
      </div>

      <section className="contact-form-section">
        <h2 className="display">Send a message</h2>
        <p className="prose">Have a question or an opportunity in mind? Send a note and it will land in my inbox.</p>
        <Card className="contact-form-card">
          <form onSubmit={onSubmit} noValidate className="form">
            <div className="hp" aria-hidden="true">
              <label>Leave this empty<input name="website" tabIndex={-1} autoComplete="off" /></label>
            </div>
            <div className="form-row">
              <Field id="name" label="Name" error={errors.name}>
                <input id="name" name="name" autoComplete="name" required aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
              </Field>
            </div>
            <div className="form-row">
              <Field id="phone" label="Phone (optional)" error={errors.phone}>
                <input id="phone" name="phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
              </Field>
              <Field id="subject" label="Subject" error={errors.subject}>
                <input id="subject" name="subject" required aria-invalid={!!errors.subject} aria-describedby={errors.subject ? "subject-error" : undefined} />
              </Field>
            </div>
            <Field id="message" label="Message" error={errors.message}>
              <textarea id="message" name="message" rows={5} required aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
            </Field>
            <button className="btn" type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send message"}
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {status.kind === "ok" && "Message sent. I’ll reply to the email you entered."}
              {status.kind === "error" && status.msg}
            </p>
          </form>
        </Card>
      </section>
    </>
  );
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {children}
      {error && <span className="field-error" id={`${id}-error`}>{error}</span>}
    </div>
  );
}
