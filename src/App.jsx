import React, { useEffect, useRef, useState } from "react";
import "./App.css";

// ── Personalize here ─────────────────────────────────────────────
const FRIEND_NAME = "Mae"; // ← swap in her actual name
const PHOTO_SRC = "/photo.png"; // ← path inside your public/ folder
const MUSIC_SRC = "/bgm1.mpeg"; // ← path inside your public/ folder
const MUSIC_VOLUME = 0.25; // ← keep it subtle, 0 to 1
// ─────────────────────────────────────────────────────────────────

const SPARKLE_COUNT = 14;

function Sparkles() {
  return (
    <div className="sparkles" aria-hidden="true">
      {Array.from({ length: SPARKLE_COUNT }).map((_, i) => {
        const left = (i * 137.5) % 100; // even golden-ratio spread
        const delay = (i % 7) * 1.3;
        const duration = 9 + (i % 5) * 1.6;
        const size = 2 + (i % 3);
        return (
          <span
            key={i}
            className="sparkle"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              width: `${size}px`,
              height: `${size}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default function App() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = MUSIC_VOLUME;
    audio.muted = true;

    // Muted autoplay is allowed by all browsers, so this always succeeds.
    audio.play().catch(() => {});

    // On her first interaction anywhere on the page, unmute and ensure it's playing.
    // Only click/keydown count as valid gestures for audio on most mobile browsers —
    // touchstart is unreliable and firing it too early can eat the interaction.
    const unmuteOnInteraction = () => {
      audio.muted = false;
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          window.removeEventListener("click", unmuteOnInteraction);
          window.removeEventListener("keydown", unmuteOnInteraction);
        })
        .catch(() => {
          setIsPlaying(false); // keep listening — next tap will retry
        });
    };

    window.addEventListener("click", unmuteOnInteraction);
    window.addEventListener("keydown", unmuteOnInteraction);

    return () => {
      window.removeEventListener("click", unmuteOnInteraction);
      window.removeEventListener("keydown", unmuteOnInteraction);
    };
  }, []);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  };

  return (
    <div className="stage">
      <Sparkles />

      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />

      <button
        type="button"
        className="music-toggle"
        onClick={toggleMusic}
        aria-pressed={isPlaying}
        aria-label={isPlaying ? "Pause background music" : "Play background music"}
      >
        <span className={`music-icon ${isPlaying ? "is-playing" : ""}`}>
          <i />
          <i />
          <i />
        </span>
      </button>

      <main className="card">
        <p className="eyebrow">Stark Industries</p>

        <h1 className="headline">
          Happy Birthday<span className="headline-accent">.</span>
        </h1>

        <p className="subtitle">to the one and only, {FRIEND_NAME}</p>

        <div className="medallion">
          <div className="medallion-ring ring-outer" />
          <div className="medallion-ring ring-inner" />
          <div className="medallion-frame">
            <img
              src={PHOTO_SRC}
              alt={`Portrait of ${FRIEND_NAME}`}
              className="medallion-photo"
            />
          </div>
          <div className="medallion-gem" />
        </div>

        <div className="divider">
          <span className="divider-line" />
          <span className="divider-mark">✦</span>
          <span className="divider-line" />
        </div>

        {!expanded && (
          <button
            type="button"
            className="read-more"
            onClick={() => setExpanded(true)}
          >
            Read more
          </button>
        )}

        {expanded && (
          <div className="message-block">
            <p className="message">
              Every one has their own arc reactor some filled with palladium urs filled with kindness and love , thnx for being a good friend throughout da year, have a blast of a day Mae 🫶🏾
            </p>

            <p className="message message--soft">
             See you around, kid.
            </p>

            <p className="signature">
              — with love, admiration, and zero vibranium
            </p>
          </div>
        )}
      </main>
    </div>
  );
}