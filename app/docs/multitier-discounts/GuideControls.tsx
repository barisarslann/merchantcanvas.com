"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./guide.module.css";

type Section = { id: string; label: string };
type Tutorial = {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  poster: string;
  width: number;
  height: number;
  transcript: string;
  captions: string;
};

export function GuideNavigation({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      const marker = Math.min(180, window.innerHeight * 0.3);
      let current = sections[0]?.id;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= marker) current = section.id;
        else break;
      }
      setActive(current);
      frame = 0;
    };
    const schedule = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sections]);

  const links = (
    <ol>
      {sections.map((section) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            aria-current={active === section.id ? "location" : undefined}
          >
            {section.label}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.desktopContents} aria-label="Guide sections">
        <h2>In this guide</h2>
        {links}
      </nav>
      <details className={styles.mobileContents}>
        <summary>In this guide · 17 sections</summary>
        <nav aria-label="Guide sections on mobile">{links}</nav>
      </details>
    </aside>
  );
}

export function GuideTutorial({ video }: { video: Tutorial }) {
  const details = useRef<HTMLDetailsElement>(null);
  const player = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);
  const id = `tutorial-${video.id}`;

  useEffect(() => {
    const openHash = () => {
      if (window.location.hash === `#${id}` && details.current) {
        details.current.open = true;
        // The original section/tutorial IDs remain valid without loading YouTube.
        details.current.scrollIntoView({ block: "start" });
      }
    };
    openHash();
    window.addEventListener("hashchange", openHash);
    return () => window.removeEventListener("hashchange", openHash);
  }, [id]);

  useEffect(() => {
    if (loaded) player.current?.focus({ preventScroll: true });
  }, [loaded]);

  return (
    <details
      ref={details}
      id={id}
      data-guide-video={video.id}
      className={styles.tutorial}
      onToggle={(event) => {
        if (!event.currentTarget.open) setLoaded(false);
      }}
    >
      <summary>
        Watch tutorial: {video.title}
        <span className={styles.runtime}>{video.duration} · English</span>
      </summary>
      <div className={styles.tutorialBody}>
        <p className={styles.mediaNote} id={`${id}-privacy`}>
          The player connects to YouTube only when you choose to load it.
          If playback is unavailable, use the written steps or transcript.
        </p>
        <div className={styles.videoStage}>
          {loaded ? (
            <iframe
              ref={player}
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?playsinline=1`}
              title={video.title}
              width={video.width}
              height={video.height}
              allow="encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          ) : (
            <>
              {/* Native static assets retain their physical aspect ratio. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={video.poster}
                alt={`Demo tutorial: ${video.title}`}
                width={video.width}
                height={video.height}
                loading="lazy"
              />
              <button
                type="button"
                className="button button-primary"
                aria-describedby={`${id}-privacy`}
                onClick={() => setLoaded(true)}
              >
                Load YouTube video
              </button>
            </>
          )}
        </div>
        <div className={styles.tutorialLinks}>
          <a href={video.transcript}>Read transcript (English)</a>
          <a href={`https://www.youtube.com/watch?v=${video.youtubeId}`}>
            Watch on YouTube
          </a>
          <a href={video.captions}>English captions (VTT)</a>
          <a href={`#${id}`} aria-label={`Link to tutorial ${video.id}`}>Link to tutorial</a>
        </div>
      </div>
    </details>
  );
}
