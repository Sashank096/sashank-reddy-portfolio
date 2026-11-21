import { existsSync } from "node:fs";
import { join } from "node:path";
import type { Metadata } from "next";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Hero from "@/components/Hero";
import IdCard from "@/components/IdCard";
import Postcards from "@/components/Postcards";
import Projects from "@/components/Projects";
import Reveal from "@/components/Reveal";
import Skills from "@/components/Skills";
import { site } from "@/data/site";

const description = "AI Engineer & Full Stack Developer. Projects in AI, data analytics, and full-stack web.";
const hasSocialImage = existsSync(join(process.cwd(), "public", "images", "og.png"));

export const metadata: Metadata = {
  title: "Sashank Reddy Sathi | Digital Archive",
  description,
  openGraph: {
    type: "website",
    title: "Sashank Reddy Sathi | Digital Archive",
    description,
    images: hasSocialImage
      ? [{ url: "/images/og.png", width: 1200, height: 630, alt: "Sashank Reddy Sathi portfolio" }]
      : [{ url: site.photo, alt: `Portrait of ${site.name}` }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sashank Reddy Sathi | Digital Archive",
    description,
    images: [hasSocialImage ? "/images/og.png" : site.photo],
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  jobTitle: site.tagline,
  url: site.url,
  image: new URL(site.photo, site.url).toString(),
  sameAs: [site.github, site.linkedin],
};

function SectionHeading({ eyebrow, title, note }: { eyebrow: string; title: string; note: string }) {
  const headingId = `${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-title`;
  return (
    <header className="section-heading">
      <p className="section-eyebrow">{eyebrow}</p>
      <div className="section-heading-row">
        <h2 className="section-title" id={headingId}>{title}<span>.</span></h2>
        <p>{note}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const heroPhoto = existsSync(join(process.cwd(), "public", "images", "hero-cutout.png"))
    ? "/images/hero-cutout.png"
    : site.photo;
  const idPhoto = existsSync(join(process.cwd(), "public", "images", "id-card.jpg"))
    ? "/images/id-card.jpg"
    : site.photo;
  const cutoutAvailable = heroPhoto !== site.photo;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <Hero photo={heroPhoto} cutoutAvailable={cutoutAvailable} />

      <div className="container portfolio-content">
        <section className="portfolio-section" id="projects" aria-labelledby="projects-title">
          <Reveal>
            <SectionHeading eyebrow="SELECTED WORK / 01—05" title="PROJECTS" note="Real problems. Thoughtful experiments. Useful outcomes." />
            <Projects searchable />
          </Reveal>
        </section>

        <section className="portfolio-section" id="about" aria-labelledby="about-me-title">
          <Reveal>
            <SectionHeading eyebrow="A LITTLE ABOUT ME" title="ABOUT ME" note="The person, perspective, and path behind the projects." />
            <div className="about-layout">
              <About />
              <IdCard photo={idPhoto} />
            </div>
            <div className="experience-wrap"><Experience /></div>
          </Reveal>
        </section>

        <section className="portfolio-section" id="skills" aria-labelledby="technical-skills-title">
          <Reveal>
            <SectionHeading eyebrow="TOOLS I REACH FOR" title="TECHNICAL SKILLS" note="A practical toolkit, growing with every build." />
            <Skills />
          </Reveal>
        </section>

        <section className="portfolio-section" id="postcards" aria-labelledby="postcards-title">
          <Reveal>
            <SectionHeading eyebrow="SMALL MOMENTS / BIG MEMORIES" title="POSTCARDS" note="Little snapshots from the journey. More on the way." />
            <Postcards />
          </Reveal>
        </section>

        <section className="portfolio-section" id="contact" aria-labelledby="contact-title">
          <Reveal>
            <SectionHeading eyebrow="HAVE SOMETHING IN MIND?" title="CONTACT" note="Good ideas start with a conversation." />
            <Contact />
          </Reveal>
        </section>
      </div>
    </>
  );
}
