"use client";

import { Noto_Serif, Manrope, Cormorant_Garamond } from "next/font/google";
import { useState } from "react";
import Image from "next/image";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const titleFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400"],
  style: ["italic"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const TRACKS = [
  { title: "Rise Again", duration: "4:12" },
  { title: "Lumière d'Afrique", duration: "3:47" },
  { title: "Breathe", duration: "5:01" },
];

const colors = {
  background: "#15130f",
  surface: "#0a0906",
  surfaceContainerLow: "#1d1b17",
  surfaceContainer: "#211f1b",
  surfaceContainerHigh: "#2c2a25",
  surfaceContainerHighest: "#363530",
  primary: "#e6c364",
  primaryContainer: "#c9a84c",
  onSurface: "#e7e2db",
  onSurfaceVariant: "#d0c5b2",
  outline: "#99907e",
  outlineVariant: "#4d4637",
};

export default function JobySmithPage() {
  const [imgError, setImgError] = useState(false);
  const [activeTrack, setActiveTrack] = useState<number | null>(null);

  return (
    <div className={manrope.className} style={{ minHeight: "100vh", backgroundColor: colors.surface, color: colors.onSurface }}>

      {/* ── NAVIGATION ── */}
      <nav
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
          backgroundColor: "rgba(10, 9, 6, 0.7)",
          backdropFilter: "blur(30px)",
          WebkitBackdropFilter: "blur(30px)",
        }}
        className="nav-bar"
      >
        <a
          href="/entrealm"
          className={notoSerif.className}
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: colors.onSurface,
            textDecoration: "none",
            fontWeight: 400,
          }}
        >
          Entrealm
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: "2.5rem" }} className="nav-links">
          {[{ label: "Galerie", href: "gallery" }, { label: "Coaching", href: "coaching" }, { label: "Réservations", href: "bookings" }, { label: "Archive", href: "archive" }].map((link) => (
            <a
              key={link.href}
              href={`/entrealm/${link.href}`}
              className={manrope.className}
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: colors.outline,
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.outline)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:contact@entrealm.com?subject=Joby Smith — Contact"
            style={{
              padding: "0.5rem 1.5rem",
              background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryContainer})`,
              color: colors.surface,
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section
        style={{
          position: "relative",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          padding: "8rem 3rem 4rem",
          backgroundColor: colors.surface,
          overflow: "hidden",
        }}
        className="hero-section"
      >
        {/* Hero photo — left side */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "55%",
            height: "100%",
          }}
          className="hero-image-container"
        >
          {!imgError ? (
            <Image
              src="/joby-smith.jpg"
              alt="Joby Smith"
              fill
              priority
              style={{ objectFit: "cover", objectPosition: "center top" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: colors.surfaceContainerLow,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                className={notoSerif.className}
                style={{ fontSize: "8rem", color: colors.primaryContainer, fontWeight: 400, opacity: 0.4 }}
              >
                JS
              </span>
            </div>
          )}
          {/* Gradient fade to content */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to right, transparent 30%, ${colors.surface} 95%)`,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, ${colors.surface} 0%, transparent 30%)`,
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Hero content — right side */}
        <div
          style={{
            position: "relative",
            marginLeft: "auto",
            width: "45%",
            maxWidth: "600px",
            zIndex: 10,
          }}
          className="hero-content"
        >
          <p
            className={manrope.className}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: colors.outline,
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            Architecte Vocale &amp; Artiste
          </p>

          <h1
            className={titleFont.className}
            style={{
              fontSize: "clamp(4rem, 8vw, 7rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: colors.onSurface,
              lineHeight: 1.05,
              marginBottom: "2rem",
            }}
          >
            Joby
            <br />
            Smith
          </h1>

          <p
            className={manrope.className}
            style={{
              fontSize: "0.95rem",
              lineHeight: 1.8,
              color: colors.onSurfaceVariant,
              maxWidth: "440px",
              marginBottom: "2.5rem",
              fontWeight: 400,
            }}
          >
            Une voix qui traverse la frontière entre l&apos;émouvant et le
            profond. Joby Smith est une artiste vocale et architecte sonore
            dédiée à la préservation de l&apos;individualité.
          </p>

          <p
            className={manrope.className}
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.8,
              color: colors.outline,
              maxWidth: "440px",
              marginBottom: "3rem",
              fontWeight: 400,
            }}
          >
            Avec 25 ans d&apos;expérience en composition, interprétation et
            transmission, elle propose des sessions de coaching vocal inégalées
            qui guident les artistes vers la maîtrise de leur instrument.
          </p>

          <a
            href="/entrealm/joby-smith/coaching"
            className={notoSerif.className}
            style={{
              fontSize: "0.85rem",
              color: "#c9a84c",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              marginBottom: "2.5rem",
              display: "inline-block",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Coaching vocal &amp; pédagogie →
          </a>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <a
              href="/entrealm/booking?artist=joby-smith"
              style={{
                padding: "0.85rem 2.2rem",
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryContainer})`,
                color: colors.surface,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 700,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Réserver une session
            </a>
            <a
              href="#music"
              style={{
                padding: "0.85rem 2.2rem",
                border: `1px solid rgba(230, 195, 100, 0.4)`,
                color: colors.primary,
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                textDecoration: "none",
                fontWeight: 600,
                backgroundColor: "transparent",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.primary;
                e.currentTarget.style.color = colors.surface;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors.primary;
              }}
            >
              Voir le clip
            </a>
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHY SECTION ── */}
      <section
        style={{
          backgroundColor: "#0f0d0a",
          borderTop: "1px solid rgba(201,168,76,0.15)",
          borderBottom: "1px solid rgba(201,168,76,0.15)",
          padding: "5rem 3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="philosophy-section"
      >
        <div
          style={{
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
          className="philosophy-text"
        >
          <p
            className={manrope.className}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: colors.outline,
              marginBottom: "1.5rem",
              fontWeight: 600,
            }}
          >
            Philosophie
          </p>

          <h2
            className={notoSerif.className}
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: colors.onSurface,
              lineHeight: 1.2,
              marginBottom: "2rem",
            }}
          >
            La Philosophie
            <br />
            du Son
          </h2>

          <p
            className={notoSerif.className}
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.9,
              color: colors.onSurfaceVariant,
              fontStyle: "italic",
              maxWidth: "480px",
              marginBottom: "2rem",
            }}
          >
            La musique ne s&apos;entend pas seulement ; elle s&apos;habite. Dans nos
            sessions, nous explorons le paysage physiologique et émotionnel de
            votre voix pour révéler un timbre qui n&apos;appartient qu&apos;à vous.
          </p>

          <a
            href="/entrealm/joby-smith/coaching"
            className={manrope.className}
            style={{
              display: "inline-block",
              width: "fit-content",
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: colors.primary,
              textDecoration: "none",
              fontWeight: 600,
              borderBottom: `1px solid ${colors.primary}`,
              paddingBottom: "0.3rem",
              transition: "opacity 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Commencer le Voyage
          </a>
        </div>
      </section>

      {/* ── MUSIC SECTION ── */}
      <section
        id="music"
        style={{
          padding: "6rem 3rem",
          backgroundColor: colors.surfaceContainerLow,
        }}
        className="music-section"
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <p
            className={manrope.className}
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: colors.outline,
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            Écouter
          </p>
          <h2
            className={notoSerif.className}
            style={{
              fontSize: "clamp(2rem, 3.5vw, 3rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: colors.onSurface,
              marginBottom: "3rem",
            }}
          >
            Titres Phares
          </h2>

          {/* Audio player-style track list */}
          <div
            style={{
              backgroundColor: `rgba(54, 53, 48, 0.6)`,
              backdropFilter: "blur(30px)",
              padding: "0",
            }}
          >
            {TRACKS.map((t, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "1.5rem 2rem",
                  backgroundColor: activeTrack === i ? colors.surfaceContainerHigh : "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.3s ease",
                }}
                onClick={() => setActiveTrack(activeTrack === i ? null : i)}
                onMouseEnter={(e) => {
                  if (activeTrack !== i) e.currentTarget.style.backgroundColor = colors.surfaceContainer;
                }}
                onMouseLeave={(e) => {
                  if (activeTrack !== i) e.currentTarget.style.backgroundColor = "transparent";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      border: `1px solid ${activeTrack === i ? colors.primary : colors.outlineVariant}`,
                    }}
                  >
                    <span style={{ color: activeTrack === i ? colors.primary : colors.outline, fontSize: "0.7rem", marginLeft: "2px" }}>
                      {activeTrack === i ? "❚❚" : "▶"}
                    </span>
                  </div>
                  <div>
                    <p
                      className={notoSerif.className}
                      style={{
                        fontSize: "1.05rem",
                        color: activeTrack === i ? colors.primary : colors.onSurface,
                        fontWeight: 400,
                      }}
                    >
                      {t.title}
                    </p>
                    <p
                      className={manrope.className}
                      style={{
                        fontSize: "0.7rem",
                        color: colors.outline,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        marginTop: "0.2rem",
                        fontWeight: 500,
                      }}
                    >
                      Joby Smith
                    </p>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  {/* Progress bar (visual only) */}
                  <div style={{ width: "200px", height: "2px", backgroundColor: colors.outlineVariant, position: "relative" }} className="progress-bar">
                    <div
                      style={{
                        width: activeTrack === i ? "35%" : "0%",
                        height: "100%",
                        backgroundColor: colors.primary,
                        transition: "width 0.5s ease",
                      }}
                    />
                  </div>
                  <span
                    className={manrope.className}
                    style={{ fontSize: "0.8rem", color: colors.outline, fontWeight: 500, minWidth: "35px" }}
                  >
                    {t.duration}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "3rem",
          backgroundColor: colors.surface,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem",
        }}
        className="footer"
      >
        <a
          href="/entrealm"
          className={notoSerif.className}
          style={{
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: colors.outline,
            textDecoration: "none",
            fontWeight: 400,
          }}
        >
          Entrealm
        </a>

        <p
          className={manrope.className}
          style={{
            fontSize: "0.7rem",
            color: colors.outlineVariant,
            fontWeight: 400,
            letterSpacing: "0.05em",
          }}
        >
          © 2026 Joby Smith · Tous droits réservés
        </p>

        <div style={{ display: "flex", gap: "2rem" }}>
          {[{ label: "Confidentialité", href: "privacy" }, { label: "Conditions", href: "terms" }, { label: "Contact", href: "contact" }].map((link) => (
            <a
              key={link.href}
              href={`/entrealm/${link.href}`}
              className={manrope.className}
              style={{
                fontSize: "0.65rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: colors.outline,
                textDecoration: "none",
                fontWeight: 500,
                transition: "color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = colors.outline)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </footer>

      {/* ── RESPONSIVE STYLES ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-bar {
            padding: 1rem 1.5rem !important;
          }
          .nav-links {
            display: none !important;
          }
          .hero-section {
            flex-direction: column !important;
            padding: 0 !important;
            min-height: auto !important;
          }
          .hero-image-container {
            position: relative !important;
            width: 100% !important;
            height: 60vh !important;
          }
          .hero-content {
            width: 100% !important;
            margin-left: 0 !important;
            padding: 2.5rem 1.5rem 3rem !important;
            max-width: 100% !important;
          }
          .philosophy-section {
            padding: 3rem 1.5rem !important;
          }
          .music-section {
            padding: 4rem 1.5rem !important;
          }
          .progress-bar {
            display: none !important;
          }
          .footer {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 2.5rem 1.5rem !important;
          }
        }
      `}</style>
    </div>
  );
}
