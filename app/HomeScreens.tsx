"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { VeraApp } from "./apps";

export default function HomeScreens({ screens }: { screens: VeraApp[][] }) {
  const track = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    const el = track.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(screens.length - 1, index));
    el.scrollTo({ left: clamped * el.clientWidth, behavior: "smooth" });
  }, [screens.length]);

  const onScroll = () => {
    const el = track.current;
    if (!el || el.clientWidth === 0) return;
    setCurrent(Math.round(el.scrollLeft / el.clientWidth));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, goTo]);

  return (
    <div className="home">
      <button
        type="button"
        className="paddle paddle-left"
        aria-label="Previous screen"
        disabled={current === 0}
        onClick={() => goTo(current - 1)}
      >
        ◀
      </button>

      <div className="track" ref={track} onScroll={onScroll}>
        {screens.map((apps, i) => (
          <section className="screen" key={i}>
            <ul className="grid">
              {apps.map((app) => (
                <li key={app.url}>
                  <a className="app" href={app.url}>
                    <span className="icon" style={{ background: app.color }}>
                      {app.emoji}
                    </span>
                    <span className="label">{app.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <button
        type="button"
        className="paddle paddle-right"
        aria-label="Next screen"
        disabled={current === screens.length - 1}
        onClick={() => goTo(current + 1)}
      >
        ▶
      </button>

      <div className="dots" aria-hidden="true">
        {screens.map((_, i) => (
          <span key={i} className={i === current ? "dot dot-active" : "dot"} />
        ))}
      </div>
    </div>
  );
}
