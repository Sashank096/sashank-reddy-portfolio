"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "./Icons";

type Props = { open: boolean; onClose: () => void; title: string; children: ReactNode };

export default function Modal({ open, onClose, title, children }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="overlay" onMouseDown={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button ref={closeRef} className="iconbtn modal-close" onClick={onClose} aria-label="Close">
          <CloseIcon />
        </button>
        {children}
      </div>
    </div>
  );
}
