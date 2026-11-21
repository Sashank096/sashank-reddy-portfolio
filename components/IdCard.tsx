"use client";

import Image from "next/image";
import { motion, useMotionValue, type PanInfo } from "framer-motion";
import { useRef, useState, type KeyboardEvent } from "react";
import { site } from "@/data/site";
import SwarmBuild from "./SwarmBuild";

export default function IdCard({ photo }: { photo: string }) {
  const cardRef = useRef<HTMLElement>(null);
  const [dragging, setDragging] = useState(false);
  const rotation = useMotionValue(-3);

  function moveCard(info: PanInfo) {
    if (!cardRef.current) return;
    const bounds = cardRef.current.getBoundingClientRect();
    const tilt = Math.max(-18, Math.min(18, -3 + info.offset.x / 3));
    const shine = ((info.point.x - bounds.left) / bounds.width) * 100;
    rotation.set(tilt);
    cardRef.current.style.setProperty("--shine-x", `${shine}%`);
  }

  function releaseCard() {
    if (!cardRef.current) return;
    setDragging(false);
    rotation.set(-3);
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (!cardRef.current || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const direction = event.key === "ArrowLeft" ? -1 : 1;
    const next = Math.max(-15, Math.min(9, rotation.get() + direction * 3));
    rotation.set(next);
  }

  function onBlur() {
    if (!cardRef.current || dragging) return;
    rotation.set(-3);
  }

  return (
    <div className="id-card-stage">
      <div className="lanyard" aria-hidden="true"><span /><i /></div>
      <motion.article
        ref={cardRef}
        className={`id-card${dragging ? " dragging" : ""}`}
        style={{ rotate: rotation, transformOrigin: "50% -40px" }}
        tabIndex={0}
        aria-label="Interactive ID card. Drag to move or use left and right arrow keys to tilt."
        drag
        dragConstraints={{ left: -48, right: 48, top: -12, bottom: 24 }}
        dragSnapToOrigin
        dragMomentum={false}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 20 }}
        whileTap={{ cursor: "grabbing" }}
        onDragStart={() => setDragging(true)}
        onDrag={(_, info) => moveCard(info)}
        onDragEnd={releaseCard}
        onKeyDown={onKeyDown}
        onBlur={onBlur}
      >
        <SwarmBuild label="" small />
        <div className="id-card-top"><span>SATHI / DIGITAL ID</span><span className="id-card-status"><i /> ACTIVE</span></div>
        <div className="id-card-photo">
          <Image src={photo} alt={`Portrait of ${site.name}`} fill sizes="(max-width: 700px) 140px, 180px" />
        </div>
        <div className="id-card-nameplate">
          <span className="id-card-label">CREATIVE TECHNOLOGIST</span>
          <h3>{site.name}</h3>
          <p>AI Engineer <i /> Full Stack Developer</p>
        </div>
        <div className="id-card-bottom">
          <span className="id-card-number">SRS — 01<br /><small>INDIA · EARTH</small></span>
          <a className="id-barcode" href={site.github} target="_blank" rel="noopener noreferrer" aria-label="Open Sashank's GitHub profile"><span />GITHUB ↗</a>
        </div>
        <div className="id-hologram" aria-hidden="true" />
        <span className="id-punch" aria-hidden="true" />
      </motion.article>
      <p className="id-card-hint">DRAG TO MOVE · USE ARROWS TO TILT</p>
    </div>
  );
}
