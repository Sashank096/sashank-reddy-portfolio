"use client";

import { useRef, type CSSProperties } from "react";
import { postcardAlbums } from "@/data/postcards";
import { LineIcon } from "./ui/Icons";

export default function Postcards() {
  const track = useRef<HTMLDivElement>(null);

  function scroll(direction: -1 | 1) {
    const carousel = track.current;
    if (!carousel) return;
    carousel.scrollBy({ left: direction * carousel.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <div className="postcard-carousel" aria-label="Postcard albums">
      <button className="carousel-arrow" type="button" onClick={() => scroll(-1)} aria-label="Previous albums">
        <LineIcon name="left" />
      </button>
      <div className="postcard-track" ref={track} tabIndex={0} aria-label="Scroll through postcard albums">
        {postcardAlbums.map((album) => (
          <article
            key={album.id}
            className="postcard-card"
            style={{ "--postcard-bg": album.image ? `linear-gradient(rgba(5,8,18,.08), rgba(5,8,18,.08)), url("${album.image}") center/cover` : album.theme } as CSSProperties & { "--postcard-bg": string }}
          >
            <div className="postcard-copy">
              <p className="postcard-month">{album.month}</p>
              <h2>{album.title}</h2>
              <p>{album.photos} {album.photos === 1 ? "photo" : "photos"}</p>
            </div>
          </article>
        ))}
      </div>
      <button className="carousel-arrow" type="button" onClick={() => scroll(1)} aria-label="Next albums">
        <LineIcon name="right" />
      </button>
    </div>
  );
}
