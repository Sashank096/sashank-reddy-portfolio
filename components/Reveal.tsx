"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import SwarmBuild from "./SwarmBuild";

export default function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [building, setBuilding] = useState(false);
  const buildTimer = useRef<number | null>(null);

  useEffect(() => () => {
    if (buildTimer.current) window.clearTimeout(buildTimer.current);
  }, []);

  function startBuild() {
    if (visible) return;
    setVisible(true);
    if (reduceMotion) return;
    setBuilding(true);
    buildTimer.current = window.setTimeout(() => setBuilding(false), 3500);
  }

  return (
    <motion.div
      className={`reveal${visible ? " is-visible" : ""}${building ? " is-building" : ""} ${className}`}
      initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(5px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}
      onViewportEnter={startBuild}
    >
      {building && <SwarmBuild label="BUILDING THIS SECTION" />}
      {children}
    </motion.div>
  );
}
