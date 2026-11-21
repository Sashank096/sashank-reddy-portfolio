"use client";

import { useEffect, useRef } from "react";

type Particle = { x: number; y: number; radius: number; speed: number; phase: number; hue: number };

export default function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    let visible = !document.hidden;
    let particles: Particle[] = [];
    const resize = () => {
      const bounds = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = bounds.width;
      height = bounds.height;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const amount = Math.min(width < 700 ? 25 : 60, Math.max(12, Math.floor(width / 22)));
      particles = Array.from({ length: amount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 2.2,
        speed: 0.08 + Math.random() * 0.26,
        phase: Math.random() * Math.PI * 2,
        hue: Math.random() > 0.55 ? 350 : 8,
      }));
    };
    const draw = (time: number) => {
      if (!visible) return;
      context.clearRect(0, 0, width, height);
      const lightTheme = document.documentElement.dataset.theme === "light";
      for (const particle of particles) {
        particle.y -= particle.speed;
        if (particle.y < -5) {
          particle.y = height + 5;
          particle.x = Math.random() * width;
        }
        const pulse = 0.25 + (Math.sin(time * 0.0007 + particle.phase) + 1) * 0.2;
        const color = lightTheme
          ? `hsla(${particle.hue}, 72%, 78%, ${pulse * 0.55})`
          : `hsla(${particle.hue}, 95%, 66%, ${pulse})`;
        context.beginPath();
        context.fillStyle = color;
        context.shadowBlur = particle.radius * 8;
        context.shadowColor = color;
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible) frame = requestAnimationFrame(draw);
      else cancelAnimationFrame(frame);
    };

    resize();
    frame = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
