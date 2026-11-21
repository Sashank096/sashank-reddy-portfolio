"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { site } from "@/data/site";
import ParticleField from "./ParticleField";
import SwarmBuild from "./SwarmBuild";

export default function Hero({ photo, cutoutAvailable }: { photo: string; cutoutAvailable: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const [rebuilding, setRebuilding] = useState(false);
  const pointerX = useSpring(useMotionValue(0), { stiffness: 70, damping: 18 });
  const pointerY = useSpring(useMotionValue(0), { stiffness: 70, damping: 18 });
  const sceneX = useTransform(pointerX, [-1, 1], [-10, 10]);
  const sceneY = useTransform(pointerY, [-1, 1], [-8, 8]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -72]);
  const photoOpacity = useTransform(scrollYProgress, [0, 0.68, 1], [1, 0.92, 0]);
  const photoClip = useTransform(scrollYProgress, [0.45, 1], ["inset(0 0 0 0)", "inset(8% 12% 100% 0)"]);

  useEffect(() => {
    if (reduceMotion) return;
    setRebuilding(true);
    const timer = window.setTimeout(() => setRebuilding(false), 3400);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  function moveScene(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 2);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 2);
  }

  function resetScene() {
    pointerX.set(0);
    pointerY.set(0);
  }

  return (
    <section ref={sectionRef} className={`hero-section${rebuilding ? " is-rebuilding" : ""}`} id="home" aria-labelledby="hero-title">
      {rebuilding && (
        <SwarmBuild label="RECONSTRUCTING PORTFOLIO" cover />
      )}
      <ParticleField />
      <div className="hero-vignette" aria-hidden="true" />
      <div className="container hero-layout">
        <div className="hero-copy">
          <p className="hero-greeting"><span className="hero-live-dot" /> BUILDING WHAT COMES NEXT <span className="hero-greeting-rule" /></p>
          <p className="hero-firstname">SASHANK<span>.</span></p>
          <h1 className="hero-name" id="hero-title">REDDY SATHI</h1>
          <p className="hero-role">AI ENGINEER <i>·</i> FULL STACK DEVELOPER</p>
          <p className="hero-tagline">Building intelligent products, useful data tools, and thoughtful web experiences.</p>
          <p className="hero-focus"><span>01</span> ARTIFICIAL INTELLIGENCE <i /> <span>02</span> DIGITAL PRODUCTS</p>
          <div className="hero-actions">
            <a className="btn hero-cta" href="#projects">View Projects <span aria-hidden="true">↘</span></a>
            <a className="btn hero-cta-secondary" href="#contact">Contact Me <span aria-hidden="true">↗</span></a>
            <a className="btn hero-cta-secondary" href={site.resume} target="_blank" rel="noopener noreferrer">View Resume <span aria-hidden="true">↗</span></a>
          </div>
          <p className="hero-scroll-hint"><span /> SCROLL TO EXPLORE</p>
        </div>
        <motion.div
          className="hero-portrait-scene"
          aria-label={`Portrait of ${site.name}`}
          onPointerMove={moveScene}
          onPointerLeave={resetScene}
          style={{ x: sceneX, y: sceneY }}
        >
          <span className="hero-orbit orbit-back" aria-hidden="true" />
          <span className="hero-orbit orbit-front" aria-hidden="true" />
          <span className="hero-portrait-monogram" aria-hidden="true">S</span>
          {rebuilding && <span className="swarm-portrait-outline" aria-hidden="true" />}
          <motion.div className={`hero-photo-circle${cutoutAvailable ? " has-cutout" : ""}`} style={{ y: photoY, opacity: photoOpacity, clipPath: photoClip }}>
            <Image src={photo} alt={`Portrait of ${site.name}`} fill priority sizes="(max-width: 700px) 72vw, 42vw" />
          </motion.div>
        </motion.div>
        <div className="hero-bottomline"><span>BASED IN {site.city.toUpperCase()}, INDIA</span><span>CURIOUS BY NATURE. BUILDING BY DESIGN.</span></div>
      </div>
    </section>
  );
}
