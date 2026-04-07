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

const TRACKS = [
  { title: "Rise Again", duration: "4:12" },
  { title: "Lumière d'Afrique", duration: "3:47" },
  { title: "Breathe", duration: "5:01" },
];

export default function JobySmithPage() {
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  return (
    <div className={manrope.className} style={{ background: "#0a0906", color: "#e7e2db" }}>

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
            { label: "Galerie", href: "joby-smith/videos" },
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

      {/* ── HERO ── */}
      <div
        className="hero-section"
        style={{
          position: "relative",
          width: "100vw",
          height: "100vh",
          background: "#0a0906",
        }}
      >
        {/* Photo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/joby-smith.jpg"
          alt="Joby Smith"
          className="hero-photo"
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "auto",
            maxWidth: "65%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
          }}
        />

        {/* Fondu droit sur la photo */}
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: "65%",
            background: "linear-gradient(to right, transparent 35%, #0a0906 85%)",
            pointerEvents: "none",
          }}
        />

        {/* Contenu texte */}
        <div
          className="hero-content"
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            width: "45%",
            padding: "0 3rem",
          }}
        >
          <p style={{ fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.5rem", fontWeight: 700 }}>
            Architecte Vocale &amp; Artiste
          </p>

          <svg viewBox="0 0 800 380" width="100%" style={{ overflow: "visible", display: "block", marginBottom: "2rem" }}>
            <defs>
              <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c9a84c" />
                <stop offset="40%" stopColor="#e6c364" />
                <stop offset="55%" stopColor="#ffe090" />
                <stop offset="100%" stopColor="#c9a84c" />
              </linearGradient>
            </defs>
            <text
              x="20"
              y="170"
              fontFamily={pinyon.style.fontFamily}
              fontSize="170"
              fontWeight="400"
              fill="url(#goldGrad)"
              style={{ overflow: "visible" }}
            >
              Joby
            </text>
            <text
              x="20"
              y="330"
              fontFamily={pinyon.style.fontFamily}
              fontSize="170"
              fontWeight="400"
              fill="url(#goldGrad)"
              style={{ overflow: "visible" }}
            >
              Smith
            </text>
          </svg>

          <p style={{ fontSize: "0.95rem", lineHeight: 1.8, color: "#d0c5b2", maxWidth: "440px", margin: "2.5rem 0" }}>
            Une voix qui traverse la frontière entre l&apos;émouvant et le profond.
            Joby Smith est une artiste vocale et architecte sonore dédiée à la
            préservation de l&apos;individualité.
          </p>

          <p style={{ fontSize: "0.85rem", lineHeight: 1.8, color: "#99907e", maxWidth: "440px", marginBottom: "2.5rem" }}>
            Avec 25 ans d&apos;expérience en composition, interprétation et
            transmission, elle propose des sessions de coaching vocal inégalées
            qui guident les artistes vers la maîtrise de leur instrument.
          </p>

          <Link
            href="/entrealm/joby-smith/coaching"
            className={notoSerif.className}
            style={{ fontSize: "0.85rem", color: "#c9a84c", textDecoration: "underline", textUnderlineOffset: "4px", marginBottom: "2.5rem", display: "inline-block", transition: "opacity .3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Coaching vocal &amp; pédagogie →
          </Link>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link
              href="/entrealm/booking?artist=joby-smith"
              style={{ padding: "0.85rem 2.2rem", background: "linear-gradient(135deg,#e6c364,#c9a84c)", color: "#0a0906", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontWeight: 700, transition: "opacity .3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Réserver une session
            </Link>
          </div>
        </div>
      </div>

      {/* ── PHILOSOPHIE ── */}
      <section
        className="philosophy-section"
        style={{
          background: "#0f0d0a",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: "5rem 3rem",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", inset: 0, zIndex: 0, backgroundImage: "url('/joby-scene.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.2 }} />
        <div style={{ maxWidth: "700px", position: "relative", zIndex: 1 }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#99907e", marginBottom: "1.5rem", fontWeight: 600 }}>
            Philosophie
          </p>
          <h2
            className={notoSerif.className}
            style={{ fontSize: "clamp(1.8rem,3vw,2.8rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "#e7e2db", lineHeight: 1.2, marginBottom: "2rem" }}
          >
            La Philosophie<br />du Son
          </h2>
          <p
            className={notoSerif.className}
            style={{ fontSize: "1.1rem", lineHeight: 1.9, color: "#d0c5b2", fontStyle: "italic", maxWidth: "480px", marginBottom: "2rem" }}
          >
            La musique ne s&apos;entend pas seulement ; elle s&apos;habite. Dans nos
            sessions, nous explorons le paysage physiologique et émotionnel de
            votre voix pour révéler un timbre qui n&apos;appartient qu&apos;à vous.
          </p>
          <Link
            href="/entrealm/joby-smith/music"
            style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#e6c364", textDecoration: "none", fontWeight: 600, borderBottom: "1px solid #e6c364", paddingBottom: "0.3rem", transition: "opacity .3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Commencer le Voyage
          </Link>
        </div>
      </section>

      {/* ── MUSIQUE ── */}
      <section
        id="music"
        className="music-section"
        style={{ padding: "6rem 3rem", background: "#1d1b17" }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#99907e", marginBottom: "1rem", fontWeight: 600 }}>
            Écouter
          </p>
          <h2
            className={notoSerif.className}
            style={{ fontSize: "clamp(2rem,3.5vw,3rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "#e7e2db", marginBottom: "3rem" }}
          >
            Titres Phares
          </h2>

          <div style={{ background: "rgba(54,53,48,0.6)", backdropFilter: "blur(30px)" }}>
            {TRACKS.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem 2rem",
                  background: activeTrack === i ? "#2c2a25" : "transparent",
                  cursor: "pointer",
                  transition: "background .3s",
                }}
                onClick={() => setActiveTrack(activeTrack === i ? null : i)}
                onMouseEnter={(e) => { if (activeTrack !== i) e.currentTarget.style.background = "#211f1b"; }}
                onMouseLeave={(e) => { if (activeTrack !== i) e.currentTarget.style.background = "transparent"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <div style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${activeTrack === i ? "#e6c364" : "#4d4637"}` }}>
                    <span style={{ color: activeTrack === i ? "#e6c364" : "#99907e", fontSize: "0.7rem", marginLeft: 2 }}>
                      {activeTrack === i ? "❚❚" : "▶"}
                    </span>
                  </div>
                  <div>
                    <p className={notoSerif.className} style={{ fontSize: "1.05rem", color: activeTrack === i ? "#e6c364" : "#e7e2db" }}>
                      {t.title}
                    </p>
                    <p style={{ fontSize: "0.7rem", color: "#99907e", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.2rem", fontWeight: 500 }}>
                      Joby Smith
                    </p>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  <div className="progress-bar" style={{ width: 200, height: 2, background: "#4d4637", position: "relative" }}>
                    <div style={{ width: activeTrack === i ? "35%" : "0%", height: "100%", background: "#e6c364", transition: "width .5s" }} />
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "#99907e", fontWeight: 500, minWidth: 35 }}>{t.duration}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginTop: "3rem" }}>
            <Link
              href="/entrealm/joby-smith/videos"
              style={{ padding: "0.85rem 2.2rem", border: "1px solid rgba(230,195,100,0.4)", color: "#e6c364", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600, background: "transparent", transition: "all .3s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#e6c364"; e.currentTarget.style.color = "#0a0906"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e6c364"; }}
            >
              Voir les vidéos →
            </Link>
          </div>
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
        @media (max-width: 768px) {
          .nav-bar { padding: 1rem 1.5rem !important; }
          .nav-links { display: none !important; }
          .hero-section { height: auto !important; min-height: 100vh !important; overflow: visible !important; }
          .hero-photo { position: relative !important; width: 100% !important; max-width: 100% !important; height: 50vh !important; }
          .hero-content { position: relative !important; width: 100% !important; transform: none !important; top: auto !important; right: auto !important; padding: 2.5rem 1.5rem 3rem !important; }
          .philosophy-section { padding: 3rem 1.5rem !important; }
          .music-section { padding: 4rem 1.5rem !important; }
          .progress-bar { display: none !important; }
          .footer { flex-direction: column !important; align-items: flex-start !important; padding: 2.5rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}
