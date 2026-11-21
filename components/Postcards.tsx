"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { postcardAlbums } from "@/data/postcards";
import Modal from "./ui/Modal";
import { LineIcon } from "./ui/Icons";
import SwarmBuild from "./SwarmBuild";

export default function Postcards() {
  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string } | null>(null);

  return (
    <>
      <div className="postcard-albums" aria-label="Postcard albums">
        {postcardAlbums.map((album, index) => {
          const photos = album.images ?? [];
          return (
            <article
              key={album.id}
              className="postcard-album glass-panel"
              style={{ "--album-accent": album.theme } as CSSProperties}
            >
              <SwarmBuild label="" small />
              <div className="postcard-stack" aria-hidden="true">
                <span /><span />
                <div className="postcard-front">
                  {photos[0] ? (
                    <Image src={photos[0].src} alt="" fill sizes="(max-width: 700px) 80vw, 320px" />
                  ) : <span className="postcard-empty-art"><b>0{index + 1}</b><i>✳</i></span>}
                </div>
              </div>
              <div className="postcard-info">
                <p className="postcard-month">{album.month}</p>
                <h3>{album.title}</h3>
                <p>{photos.length ? `${photos.length} ${photos.length === 1 ? "photo" : "photos"}` : "Photos coming soon"}</p>
              </div>
              {photos.length > 0 && (
                <div className="postcard-thumbs">
                  {photos.map((photo) => (
                    <button key={photo.src} type="button" onClick={() => setActivePhoto(photo)} aria-label={`Open ${photo.alt}`}>
                      <Image src={photo.src} alt="" width={54} height={54} />
                    </button>
                  ))}
                </div>
              )}
              {photos.length === 0 && <span className="postcard-empty-mark"><LineIcon name="sparkles" size={16} /> ALBUM IN PROGRESS</span>}
            </article>
          );
        })}
      </div>
      <Modal open={!!activePhoto} onClose={() => setActivePhoto(null)} title={activePhoto?.alt ?? "Postcard photo"}>
        {activePhoto && (
          <div className="postcard-lightbox">
            <Image src={activePhoto.src} alt={activePhoto.alt} fill sizes="(max-width: 760px) 90vw, 720px" />
          </div>
        )}
      </Modal>
    </>
  );
}
