"use client";

import { Pinyon_Script, Noto_Serif, Manrope } from "next/font/google";
import { useState } from "react";
import Link from "next/link";

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  weight: ["400"],
});

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const VIDEOS = [
  { title: "Midnight Transcendence (Live)", duration: "4:32", embedId: "dQw4w9WgXcQ" },
  { title: "Sankofa Sessions — Episode 1", duration: "12:14", embedId: "dQw4w9WgXcQ" },
  { title: "Breathe (Clip officiel)", duration: "5:01", embedId: "dQw4w9WgXcQ" },
  { title: "Masterclass : La Voix Comme Instrument", duration: "28:45", embedId: "dQw4w9WgXcQ" },
  { title: "Joby Smith au Studio — Behind the Scenes", duration: "8:20", embedId: "dQw4w9WgXcQ" },
];

export default function VideosPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className={manrope.className} style={{ background: "#0a0906", color: "#e7e2db", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav
        className="nav-bar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1.25rem 3rem",
          background: "rgba(10,9,6,0.7)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}
      >
        <a
          href="/entrealm"
          className={notoSerif.className}
          style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e7e2db", textDecoration: "none" }}
        >
          Entrealm
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {[
            { label: "Galerie", href: "gallery" },
            { label: "Coaching", href: "coaching" },
            { label: "Réservations", href: "bookings" },
            { label: "Archive", href: "archive" },
          ].map((l) => (
            <a
              key={l.href}
              href={`/entrealm/${l.href}`}
              style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", textDecoration: "none", fontWeight: 500, transition: "color .3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:contact@entrealm.com?subject=Joby Smith — Contact"
            style={{ padding: "0.5rem 1.5rem", background: "linear-gradient(135deg,#e6c364,#c9a84c)", color: "#0a0906", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ── BACK LINK ── */}
      <div className="back-link" style={{ paddingTop: "6rem", paddingLeft: "3rem" }}>
        <Link
          href="/entrealm/joby-smith"
          style={{ fontSize: "0.75rem", color: "#99907e", textDecoration: "none", transition: "color .3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
        >
          ← Joby Smith
        </Link>
      </div>

      {/* ── HERO ── */}
      <section style={{ paddingTop: "2rem", paddingBottom: "1rem", textAlign: "center" }}>
        <svg viewBox="0 0 700 200" width="400" style={{ overflow: "visible", display: "block", margin: "0 auto 1rem" }}>
          <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#c9a84c" />
              <stop offset="40%" stopColor="#e6c364" />
              <stop offset="55%" stopColor="#ffe090" />
              <stop offset="100%" stopColor="#c9a84c" />
            </linearGradient>
          </defs>
          <text
            x="50%"
            y="160"
            textAnchor="middle"
            fontFamily={pinyon.style.fontFamily}
            fontSize="160"
            fontWeight="400"
            fill="url(#goldGrad)"
            style={{ overflow: "visible" }}
          >
            Vidéos
          </text>
        </svg>
        <p className={notoSerif.className} style={{ fontSize: "1.1rem", fontStyle: "italic", color: "#99907e" }}>
          Joby Smith
        </p>
      </section>

      {/* ── GRILLE VIDÉOS ── */}
      <section className="videos-grid" style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 3rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
          }}
          className="grid-container"
        >
          {VIDEOS.map((v, i) => (
            <div
              key={i}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* iframe YouTube 16/9 */}
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  border: `1px solid ${hovered === i ? "#e6c364" : "#4d4637"}`,
                  transition: "border-color .3s",
                  marginBottom: "1rem",
                  background: "#1d1b17",
                }}
              >
                <iframe
                  src={`https://www.youtube.com/embed/${v.embedId}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" }}
                />
              </div>
              {/* Info */}
              <h3
                className={notoSerif.className}
                style={{ fontSize: "1rem", fontWeight: 400, color: hovered === i ? "#e7e2db" : "#d0c5b2", lineHeight: 1.4, marginBottom: "0.4rem", transition: "color .3s" }}
              >
                {v.title}
              </h3>
              <p style={{ fontSize: "0.75rem", color: "#99907e", fontWeight: 500 }}>
                {v.duration}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="footer"
        style={{ padding: "3rem", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}
      >
        <a href="/entrealm" className={notoSerif.className} style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#99907e", textDecoration: "none" }}>
          Entrealm
        </a>
        <p style={{ fontSize: "0.7rem", color: "#4d4637", letterSpacing: "0.05em" }}>
          © 2026 Joby Smith · Tous droits réservés
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { label: "Confidentialité", href: "privacy" },
            { label: "Conditions", href: "terms" },
            { label: "Contact", href: "contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={`/entrealm/${l.href}`}
              style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", textDecoration: "none", fontWeight: 500, transition: "color .3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 1024px) {
          .grid-container { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .nav-bar { padding: 1rem 1.5rem !important; }
          .nav-links { display: none !important; }
          .back-link { padding-top: 5.5rem !important; padding-left: 1.5rem !important; }
          .videos-grid { padding: 2rem 1.5rem !important; }
          .grid-container { grid-template-columns: 1fr !important; }
          .footer { flex-direction: column !important; align-items: flex-start !important; padding: 2.5rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
