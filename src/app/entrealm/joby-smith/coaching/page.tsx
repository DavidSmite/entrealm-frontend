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

const SERVICES = [
  { name: "Coaching individuel 1h", description: "Sessions privées adaptées à votre identité vocale unique", price: "80 €", slug: "coaching-1h" },
  { name: "Pack 5 séances", description: "Un parcours structuré pour poser les fondations de votre voix", price: "350 €", slug: "pack-5" },
  { name: "Pack 10 séances", description: "Engagement profond vers la transformation vocale sur 10 sessions", price: "650 €", slug: "pack-10" },
  { name: "Masterclass", description: "Atelier vocal intensif en groupe explorant les techniques avancées", price: "500 €", slug: "masterclass" },
  { name: "Sankofa Unit", description: "Rejoignez le célèbre chœur Sankofa Unit — sur audition", price: "Sur devis", slug: "sankofa-unit" },
];

const colors = {
  surface: "#0a0906",
  surfaceContainerLow: "#1d1b17",
  surfaceContainer: "#211f1b",
  surfaceContainerHigh: "#2c2a25",
  primary: "#e6c364",
  primaryContainer: "#c9a84c",
  onSurface: "#e7e2db",
  onSurfaceVariant: "#d0c5b2",
  outline: "#99907e",
  outlineVariant: "#4d4637",
};

export default function CoachingPage() {
  const [imgError, setImgError] = useState(false);

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

      {/* ── BACK LINK ── */}
      <div style={{ padding: "6rem 3rem 0" }} className="back-link-container">
        <a
          href="/entrealm/joby-smith"
          className={manrope.className}
          style={{
            fontSize: "0.75rem",
            color: colors.outline,
            textDecoration: "none",
            letterSpacing: "0.05em",
            transition: "color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = colors.primary)}
          onMouseLeave={(e) => (e.currentTarget.style.color = colors.outline)}
        >
          ← Joby Smith
        </a>
      </div>

      {/* ── HERO ── */}
      <section
        style={{
          padding: "3rem 3rem 5rem",
          backgroundColor: colors.surface,
          display: "flex",
          alignItems: "center",
          gap: "3rem",
        }}
        className="coaching-hero"
      >
        {/* Photo ronde */}
        <div
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
          className="coaching-photo"
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
                style={{ fontSize: "4rem", color: colors.primaryContainer, fontWeight: 400, opacity: 0.4 }}
              >
                JS
              </span>
            </div>
          )}
        </div>

        {/* Titre */}
        <div>
          <h1
            className={titleFont.className}
            style={{
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 300,
              color: colors.onSurface,
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            Coaching Vocal
          </h1>
          <p
            className={notoSerif.className}
            style={{
              fontSize: "1.1rem",
              fontStyle: "italic",
              color: colors.outline,
            }}
          >
            avec Joby Smith
          </p>
        </div>
      </section>

      {/* ── BIO PÉDAGOGIQUE ── */}
      <section
        style={{
          padding: "0 3rem 5rem",
          backgroundColor: colors.surface,
          maxWidth: "800px",
        }}
        className="bio-section"
      >
        <p
          className={manrope.className}
          style={{
            fontSize: "1rem",
            lineHeight: 1.9,
            color: colors.onSurfaceVariant,
            fontWeight: 400,
          }}
        >
          Après 25 ans sur scène, Joby Smith transmet son expérience avec
          exigence et bienveillance. Ses sessions s&apos;adressent à tous niveaux.
        </p>
      </section>

      {/* ── SERVICES ── */}
      <section
        style={{
          padding: "5rem 3rem",
          backgroundColor: colors.surfaceContainerLow,
        }}
        className="services-section"
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
            Services
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
            Votre Voix, Redécouverte
          </h2>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {SERVICES.map((s, i) => (
              <div
                key={s.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  padding: "2rem",
                  backgroundColor: i % 2 === 0 ? "transparent" : colors.surfaceContainer,
                  transition: "background-color 0.3s ease",
                }}
              >
                <div style={{ flex: 1, minWidth: "260px" }}>
                  <h3
                    className={notoSerif.className}
                    style={{
                      fontSize: "1.3rem",
                      fontWeight: 400,
                      color: colors.onSurface,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className={manrope.className}
                    style={{
                      fontSize: "0.85rem",
                      color: colors.outline,
                      fontWeight: 400,
                      lineHeight: 1.6,
                    }}
                  >
                    {s.description}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  <span
                    className={manrope.className}
                    style={{
                      fontSize: "1.1rem",
                      color: colors.primary,
                      fontWeight: 600,
                    }}
                  >
                    {s.price}
                  </span>
                  <a
                    href={
                      s.slug === "sankofa-unit"
                        ? "mailto:contact@entrealm.com?subject=Sankofa Unit — Demande de devis"
                        : `/entrealm/booking?artist=joby-smith&service=${s.slug}`
                    }
                    className={manrope.className}
                    style={{
                      padding: "0.65rem 1.8rem",
                      border: `1px solid rgba(230, 195, 100, 0.4)`,
                      color: colors.primary,
                      fontSize: "0.65rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      fontWeight: 600,
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
                    {s.slug === "sankofa-unit" ? "Renseignements" : "Réserver"}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHILOSOPHIE PÉDAGOGIQUE ── */}
      <section
        style={{
          padding: "5rem 3rem",
          backgroundColor: colors.surface,
        }}
        className="pedagogy-section"
      >
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
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
            Philosophie pédagogique
          </p>

          <h2
            className={notoSerif.className}
            style={{
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: colors.onSurface,
              lineHeight: 1.2,
              marginBottom: "2rem",
            }}
          >
            Chaque voix est unique
          </h2>

          <p
            className={notoSerif.className}
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.9,
              color: colors.onSurfaceVariant,
              fontStyle: "italic",
              marginBottom: "1.5rem",
            }}
          >
            La musique ne s&apos;entend pas seulement ; elle s&apos;habite. Dans nos
            sessions, nous explorons le paysage physiologique et émotionnel de
            votre voix pour révéler un timbre qui n&apos;appartient qu&apos;à vous.
          </p>

          <p
            className={manrope.className}
            style={{
              fontSize: "0.9rem",
              lineHeight: 1.8,
              color: colors.outline,
              fontWeight: 400,
            }}
          >
            Joby croit en une approche holistique du chant : technique vocale,
            conscience corporelle et liberté d&apos;expression se nourrissent
            mutuellement. Chaque session est un espace de confiance où l&apos;on ose
            explorer, se tromper et se révéler.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        style={{
          padding: "3rem",
          backgroundColor: colors.surface,
          borderTop: `1px solid ${colors.outlineVariant}`,
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

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-bar {
            padding: 1rem 1.5rem !important;
          }
          .nav-links {
            display: none !important;
          }
          .back-link-container {
            padding: 5.5rem 1.5rem 0 !important;
          }
          .coaching-hero {
            flex-direction: column !important;
            padding: 2rem 1.5rem 3rem !important;
            text-align: center;
          }
          .coaching-photo {
            width: 150px !important;
            height: 150px !important;
          }
          .bio-section {
            padding: 0 1.5rem 3rem !important;
          }
          .services-section {
            padding: 3rem 1.5rem !important;
          }
          .pedagogy-section {
            padding: 3rem 1.5rem !important;
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
