"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { quantityBreaksVideo as video } from "../../content/quantity-breaks-video";
import styles from "./watch.module.css";

export function VideoPlayer() {
  const [loaded, setLoaded] = useState(false);
  const frame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (loaded) frame.current?.focus({ preventScroll: true });
  }, [loaded]);

  return (
    <figure className={styles.player}>
      <figcaption className={styles.caption}>
        <span id="quantity-video-privacy">
          The player connects to YouTube only when you choose to load it.
        </span>
        <a className="text-link" href={video.watchUrl}>
          Watch on YouTube <span aria-hidden="true">↗</span>
        </a>
      </figcaption>
      <div className={styles.stage}>
        {loaded ? (
          <iframe
            ref={frame}
            src={video.embedUrl}
            title={video.title}
            width={video.poster.width}
            height={video.poster.height}
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <>
            <Image
              src={video.poster.src}
              width={video.poster.width}
              height={video.poster.height}
              alt={video.poster.alt}
              unoptimized
              loading="eager"
            />
            <button
              type="button"
              className={`button button-primary ${styles.loadButton}`}
              aria-describedby="quantity-video-privacy"
              onClick={() => setLoaded(true)}
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
              Load YouTube video
            </button>
          </>
        )}
      </div>
    </figure>
  );
}
