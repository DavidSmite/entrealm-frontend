"use client";

import { Newsreader, Manrope } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TRACKS = [
  { id: 1, title: "Aperture of the Soul", album: "The Obsidian Sessions", duration: "04:32" },
  { id: 2, title: "Gold in the Shadow", album: "The Obsidian Sessions", duration: "05:15" },
  { id: 3, title: "Midnight Transmissions", album: "Single Release", duration: "03:58" },
];

export default function MusicPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);

  function handlePlay(index: number) {
    if (currentTrack === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrack(index);
      setIsPlaying(true);
    }
  }

  return (
    <div className={manrope.className} style={{ backgroundColor: "#0f0e0a", color: "#e7e2db", minHeight: "100vh", overflowX: "hidden" }}>

      {/* Waveform animation keyframes */}
      <style>{`
        @keyframes waveform {
          0%, 100% { transform: scaleY(0.3); }
          25% { transform: scaleY(1); }
          50% { transform: scaleY(0.6); }
          75% { transform: scaleY(0.9); }
        }
        .wave-bar {
          transform-origin: bottom;
          transition: transform 0.2s ease;
        }
        .wave-bar.animate {
          animation: waveform 0.8s ease-in-out infinite;
        }
        .wave-bar.animate:nth-child(2) { animation-delay: 0.1s; }
        .wave-bar.animate:nth-child(3) { animation-delay: 0.2s; }
        .wave-bar.animate:nth-child(4) { animation-delay: 0.05s; }
        .wave-bar.animate:nth-child(5) { animation-delay: 0.15s; }
      `}</style>

      {/* ── TOP APP BAR ── */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 2rem",
          height: "80px",
          backgroundColor: "#15130f",
        }}
      >
        <Link
          href="/entrealm"
          className={newsreader.className}
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            color: "#e6c364",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            textDecoration: "none",
          }}
        >
          The Sonic Curator
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: "3rem" }} className="nav-desktop">
          {[
            { label: "Archive", active: true },
            { label: "Editorial", active: false },
            { label: "Collections", active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href="#"
              className={newsreader.className}
              style={{
                color: item.active ? "#ffe090" : "#99907e",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                textDecoration: "none",
                borderBottom: item.active ? "2px solid #ffe090" : "none",
                paddingBottom: "4px",
                transition: "color 50ms",
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── SIDEBAR ── */}
      <aside
        style={{
          position: "fixed",
          left: 0,
          top: "80px",
          bottom: 0,
          width: "256px",
          backgroundColor: "#0f0e0a",
          borderRight: "1px solid rgba(153,144,126,0.1)",
          zIndex: 40,
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem",
        }}
        className="sidebar"
      >
        <div style={{ marginBottom: "3rem" }}>
          <h2 className={newsreader.className} style={{ color: "#e6c364", fontSize: "1.25rem", fontStyle: "italic" }}>
            Obsidian Archive
          </h2>
          <p style={{ color: "#99907e", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "0.25rem" }}>
            Premium Curation
          </p>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {[
            { icon: "explore", label: "Discover", active: true },
            { icon: "library_music", label: "Library", active: false },
            { icon: "auto_awesome", label: "Curated", active: false },
            { icon: "history", label: "History", active: false },
          ].map((item) => (
            <Link
              key={item.label}
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "0.75rem 1rem",
                color: item.active ? "#e6c364" : "#99907e",
                backgroundColor: item.active ? "#15130f" : "transparent",
                borderLeft: item.active ? "4px solid #e6c364" : "4px solid transparent",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
                transition: "all 50ms",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        <div
          style={{
            marginTop: "auto",
            padding: "1rem",
            backgroundColor: "#1d1b17",
            border: "1px solid rgba(77,70,55,0.1)",
          }}
        >
          <p style={{ fontSize: "10px", color: "#99907e", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "0.5rem" }}>
            Editor&apos;s Choice
          </p>
          <p className={newsreader.className} style={{ fontSize: "1.1rem", lineHeight: 1.3, color: "#e7e2db" }}>
            Joby Smith: The Obsidian Sessions
          </p>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ marginLeft: "256px", paddingTop: "80px", paddingBottom: "8rem", minHeight: "100vh", backgroundColor: "#15130f" }} className="main-content">

        {/* Artist Hero Banner */}
        <section
          style={{
            position: "relative",
            width: "100%",
            height: "614px",
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: "0 3rem 4rem",
          }}
        >
          {/* Placeholder for hero image */}
          <div style={{ position: "absolute", inset: 0, backgroundColor: "#1d1b17" }} />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to top, #15130f, transparent, transparent)",
            }}
          />
          <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: "72rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <span style={{ height: "1px", width: "3rem", backgroundColor: "#ffe090" }} />
              <span style={{ color: "#ffe090", textTransform: "uppercase", letterSpacing: "0.3em", fontSize: "0.75rem" }}>
                Featured Artist
              </span>
            </div>
            <h1
              className={newsreader.className}
              style={{
                fontSize: "clamp(5rem, 10vw, 12rem)",
                lineHeight: 0.8,
                letterSpacing: "-0.05em",
                color: "#e7e2db",
                marginBottom: "1.5rem",
                fontStyle: "italic",
              }}
            >
              Joby <span style={{ display: "block", marginLeft: "clamp(3rem, 8vw, 12rem)" }}>Smith</span>
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "2rem", marginTop: "3rem", flexWrap: "wrap" }}>
              <button
                onClick={() => { setCurrentTrack(0); setIsPlaying(true); }}
                style={{
                  backgroundColor: "#ffe090",
                  color: "#3d2e00",
                  padding: "1rem 2.5rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.8rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Listen Now
              </button>
              <button
                style={{
                  border: "1px solid rgba(153,144,126,0.3)",
                  backgroundColor: "transparent",
                  color: "#e7e2db",
                  padding: "1rem 2.5rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.2em",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                }}
              >
                Follow
              </button>
              <div style={{ color: "#99907e", fontSize: "0.875rem", maxWidth: "20rem", marginLeft: "auto" }} className="hero-tagline">
                A definitive study of ambient textures and jazz fusion. Joby Smith explores the silence between notes.
              </div>
            </div>
          </div>
        </section>

        {/* Tracklist & Grid Layout */}
        <section style={{ padding: "6rem 3rem", backgroundColor: "#0f0e0a", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/piano-salon2.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
          <div style={{ maxWidth: "80rem", margin: "0 auto", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "4rem", position: "relative", zIndex: 1 }} className="tracklist-grid">

            {/* Main Tracklist */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "3rem" }}>
                <h2 className={newsreader.className} style={{ fontSize: "3rem", fontStyle: "italic", color: "#e7e2db" }}>
                  The Obsidian Sessions
                </h2>
                <span style={{ color: "#99907e", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                  12 Tracks &bull; 54:12
                </span>
              </div>

              <div>
                {TRACKS.map((track, i) => {
                  const isActive = currentTrack === i;
                  const isTrackPlaying = isActive && isPlaying;
                  return (
                    <div
                      key={track.id}
                      onClick={() => handlePlay(i)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "1.5rem",
                        backgroundColor: i % 2 === 1 ? "#1d1b17" : "transparent",
                        borderBottom: "1px solid rgba(77,70,55,0.05)",
                        cursor: "pointer",
                        transition: "background-color 100ms",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#15130f"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = i % 2 === 1 ? "#1d1b17" : "transparent"; }}
                    >
                      <span
                        className={newsreader.className}
                        style={{
                          color: isActive ? "#e6c364" : "#99907e",
                          fontSize: "1.5rem",
                          width: "3rem",
                          fontStyle: "italic",
                          transition: "color 100ms",
                        }}
                      >
                        {String(track.id).padStart(2, "0")}
                      </span>
                      <div style={{ flex: 1, paddingLeft: "1rem", paddingRight: "1rem" }}>
                        <h3
                          className={newsreader.className}
                          style={{ fontSize: "1.25rem", lineHeight: 1, color: isActive ? "#ffe090" : "#e7e2db" }}
                        >
                          {track.title}
                        </h3>
                        <p style={{ color: "#99907e", fontSize: "0.7rem", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>
                          {track.album}
                        </p>
                      </div>

                      {/* Waveform bars */}
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "24px", width: "96px" }} className="waveform-container">
                        {[12, 20, 8, 24, 16].map((h, j) => (
                          <div
                            key={j}
                            className={`wave-bar ${isTrackPlaying ? "animate" : ""}`}
                            style={{
                              width: "2px",
                              height: `${h}px`,
                              backgroundColor: isActive
                                ? `rgba(230,195,100,${0.4 + j * 0.15})`
                                : `rgba(230,195,100,${0.2 + j * 0.1})`,
                              transform: isTrackPlaying ? undefined : `scaleY(${isActive ? 1 : 0.5})`,
                            }}
                          />
                        ))}
                      </div>

                      <span style={{ color: "#99907e", fontSize: "0.875rem", marginLeft: "2rem", minWidth: "3rem", textAlign: "right" }}>
                        {track.duration}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bento Sidebar */}
            <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
              {/* Album Card */}
              <div style={{ backgroundColor: "#2c2a25" }}>
                {/* Placeholder album art */}
                <div style={{ width: "100%", aspectRatio: "1", backgroundColor: "#1d1b17", position: "relative" }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: "60%", height: "1px", backgroundColor: "#e6c364", opacity: 0.3 }} />
                  </div>
                </div>
                <div style={{ padding: "2rem" }}>
                  <h4 className={newsreader.className} style={{ fontSize: "1.5rem", fontStyle: "italic", marginBottom: "0.5rem" }}>
                    Current Collection
                  </h4>
                  <p style={{ color: "#99907e", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "1.5rem" }}>
                    Vinyl Pressing Available
                  </p>
                  <button
                    style={{
                      width: "100%",
                      padding: "1rem",
                      border: "1px solid #e6c364",
                      backgroundColor: "transparent",
                      color: "#e6c364",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.2em",
                      fontSize: "0.8rem",
                      cursor: "pointer",
                      transition: "all 100ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#e6c364";
                      e.currentTarget.style.color = "#3d2e00";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = "#e6c364";
                    }}
                  >
                    Pre-Order Edition
                  </button>
                </div>
              </div>

              {/* Curator's Note */}
              <div style={{ backgroundColor: "#0f0e0a", padding: "2rem", position: "relative" }}>
                <span
                  className={newsreader.className}
                  style={{ position: "absolute", top: "1rem", left: "1rem", color: "#e6c364", fontSize: "4rem", opacity: 0.3 }}
                >
                  &ldquo;
                </span>
                <h4
                  className={newsreader.className}
                  style={{ fontSize: "1.2rem", fontStyle: "italic", lineHeight: 1.6, color: "#d0c5b2", paddingTop: "2rem" }}
                >
                  This session captures the precise moment where silence becomes a choice. Joby&apos;s phrasing is clinical yet devastating.
                </h4>
                <div style={{ marginTop: "2rem", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: "2.5rem", height: "1px", backgroundColor: "#99907e" }} />
                  <span style={{ color: "#99907e", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.2em" }}>
                    The Sonic Curator Review
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Feature */}
        <section style={{ padding: "6rem 3rem", display: "flex", gap: "3rem", alignItems: "center" }} className="editorial-section">
          <div style={{ width: "50%" }} className="editorial-image">
            {/* Placeholder studio image */}
            <div style={{ width: "100%", height: "500px", backgroundColor: "#1d1b17" }} />
          </div>
          <div style={{ width: "50%", display: "flex", flexDirection: "column", gap: "2rem" }} className="editorial-text">
            <span style={{ color: "#ffe090", textTransform: "uppercase", letterSpacing: "0.4em", fontSize: "0.75rem" }}>
              Behind the Craft
            </span>
            <h2 className={newsreader.className} style={{ fontSize: "3.5rem", fontStyle: "italic", lineHeight: 1.1 }}>
              Analog Soul, Digital Precision.
            </h2>
            <p style={{ color: "#d0c5b2", lineHeight: 1.8, maxWidth: "32rem" }}>
              Every track in &lsquo;The Obsidian Sessions&rsquo; was recorded using vintage ribbon microphones and a custom-built signal
              chain. We focused on the texture of the air around the instruments.
            </p>
            <Link
              href="#"
              className={newsreader.className}
              style={{
                display: "inline-block",
                color: "#e6c364",
                fontSize: "1.5rem",
                fontStyle: "italic",
                borderBottom: "1px solid #e6c364",
                paddingBottom: "0.5rem",
                textDecoration: "none",
                width: "fit-content",
              }}
            >
              Read the Interview
            </Link>
          </div>
        </section>
      </main>

      {/* ── AUDIO PLAYER (fixed footer) ── */}
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "96px",
          padding: "0 3rem",
          backgroundColor: "rgba(21,19,15,0.85)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(153,144,126,0.15)",
        }}
        className="audio-player"
      >
        {/* Track Info */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", width: "25%" }}>
          <div style={{ width: "56px", height: "56px", backgroundColor: "#363530", flexShrink: 0 }} />
          <div>
            <h5 className={newsreader.className} style={{ fontStyle: "italic", lineHeight: 1, color: "#e7e2db" }}>
              {TRACKS[currentTrack].title}
            </h5>
            <p style={{ color: "#99907e", fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.2em", marginTop: "0.25rem" }}>
              Joby Smith
            </p>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flex: 1, maxWidth: "36rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "2.5rem", marginBottom: "0.5rem" }}>
            <span className="material-symbols-outlined" style={{ color: "#99907e", cursor: "pointer", fontSize: "20px" }}>shuffle</span>
            <span
              className="material-symbols-outlined"
              style={{ color: "#e7e2db", cursor: "pointer", fontSize: "1.8rem" }}
              onClick={() => { setCurrentTrack((p) => Math.max(0, p - 1)); setIsPlaying(true); }}
            >
              skip_previous
            </span>
            <div
              onClick={() => setIsPlaying(!isPlaying)}
              style={{
                width: "48px",
                height: "48px",
                backgroundColor: "#ffe090",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <span
                className="material-symbols-outlined"
                style={{ color: "#3d2e00", fontSize: "1.8rem", fontVariationSettings: "'FILL' 1" }}
              >
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </div>
            <span
              className="material-symbols-outlined"
              style={{ color: "#e7e2db", cursor: "pointer", fontSize: "1.8rem" }}
              onClick={() => { setCurrentTrack((p) => Math.min(TRACKS.length - 1, p + 1)); setIsPlaying(true); }}
            >
              skip_next
            </span>
            <span className="material-symbols-outlined" style={{ color: "#99907e", cursor: "pointer", fontSize: "20px" }}>repeat</span>
          </div>
          <div style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem" }}>
            <span style={{ fontSize: "10px", color: "#99907e", letterSpacing: "-0.02em" }}>02:14</span>
            <div style={{ flex: 1, height: "2px", backgroundColor: "#363530", position: "relative" }}>
              <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "45%", backgroundColor: "#ffe090" }} />
            </div>
            <span style={{ fontSize: "10px", color: "#99907e", letterSpacing: "-0.02em" }}>{TRACKS[currentTrack].duration}</span>
          </div>
        </div>

        {/* Extra Controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "2rem", width: "25%" }} className="extra-controls">
          <span className="material-symbols-outlined" style={{ color: "#99907e", cursor: "pointer", fontSize: "20px" }}>queue_music</span>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span className="material-symbols-outlined" style={{ color: "#99907e", fontSize: "20px" }}>volume_up</span>
            <div style={{ width: "96px", height: "2px", backgroundColor: "#363530" }}>
              <div style={{ height: "100%", width: "70%", backgroundColor: "#99907e" }} />
            </div>
          </div>
        </div>
      </footer>

      {/* Google Material Symbols font */}
      <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 1024px) {
          .sidebar { display: none !important; }
          .main-content { margin-left: 0 !important; }
          .tracklist-grid { grid-template-columns: 1fr !important; }
          .editorial-section { flex-direction: column !important; }
          .editorial-image, .editorial-text { width: 100% !important; }
          .hero-tagline { display: none !important; }
          .waveform-container { display: none !important; }
        }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .extra-controls { display: none !important; }
          .audio-player { padding: 0 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
