"use client";

import { Cormorant_Garamond, Cinzel } from "next/font/google";
import { useState } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SERVICES = [
  { name: "Coaching individuel 1h", price: "80 €", slug: "coaching-1h" },
  { name: "Pack 5 séances", price: "350 €", slug: "pack-5" },
  { name: "Pack 10 séances", price: "650 €", slug: "pack-10" },
  { name: "Masterclass", price: "500 €", slug: "masterclass" },
  { name: "Sankofa Unit", price: "Sur devis", slug: "sankofa-unit" },
];

const TRACKS = [
  { title: "Rise Again", duration: "4:12" },
  { title: "Lumière d'Afrique", duration: "3:47" },
  { title: "Breathe", duration: "5:01" },
];

export default function JobySmithPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cormorant.className}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0906",
        color: "#f5ede0",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* ── LEFT: PHOTO ── */}
      <div
        style={{
          position: "relative",
          width: "50%",
          minHeight: "100vh",
          flexShrink: 0,
        }}
        className="left-column"
      >
        {!imgError ? (
          <img
            src="/joby-smith.jpg"
            alt="Joby Smith"
            onError={() => setImgError(true)}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center top",
            }}
          />
        ) : (
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#1a1610",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              className={cinzel.className}
              style={{ fontSize: "4rem", color: "#c9a84c", fontWeight: 400 }}
            >
              JS
            </span>
          </div>
        )}
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to right, transparent 40%, #0a0906 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* ── RIGHT: CONTENT ── */}
      <div
        style={{
          width: "50%",
          minHeight: "100vh",
          overflowY: "auto",
          padding: "4rem 3rem 3rem 2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2.5rem",
        }}
        className="right-column"
      >
        {/* Header */}
        <div>
          <p
            className={cinzel.className}
            style={{
              fontSize: "0.7rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1.2rem",
            }}
          >
            ENTREALM
          </p>

          <h1
            className={cinzel.className}
            style={{
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#f5ede0",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Joby Smith
          </h1>

          <p
            style={{
              fontSize: "1.35rem",
              fontStyle: "italic",
              color: "#d5cdc0",
              letterSpacing: "0.04em",
              marginBottom: "1.5rem",
            }}
          >
            Auteure · Compositrice · Interprète
          </p>

          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#c9a84c",
            }}
          />
        </div>

        {/* Bio */}
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.85,
            color: "#d5cdc0",
            maxWidth: "520px",
          }}
        >
          Artiste aux multiples facettes, Joby Smith mêle depuis 25 ans
          composition, interprétation et transmission. Cheffe du chœur Sankofa
          Unit, elle accompagne artistes et amateurs vers leur expression vocale
          authentique.
        </p>

        {/* Separator */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(201,168,76,0.4)",
          }}
        />

        {/* Services */}
        <div>
          <h2
            className={cinzel.className}
            style={{
              fontSize: "0.9rem",
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1.2rem",
            }}
          >
            Services
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            {SERVICES.map((s) => (
              <div
                key={s.slug}
                style={{
                  backgroundColor: "rgba(245,237,224,0.03)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  borderRadius: "4px",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "0.75rem",
                }}
              >
                <div>
                  <p style={{ fontSize: "1.05rem", color: "#f5ede0", marginBottom: "0.15rem" }}>
                    {s.name}
                  </p>
                  <p
                    className={cinzel.className}
                    style={{ fontSize: "0.95rem", color: "#c9a84c", fontWeight: 400 }}
                  >
                    {s.price}
                  </p>
                </div>
                <a
                  href={
                    s.slug === "sankofa-unit"
                      ? "mailto:contact@entrealm.com?subject=Sankofa Unit — Demande de devis"
                      : `/entrealm/booking?artist=joby-smith&service=${s.slug}`
                  }
                  className={cinzel.className}
                  style={{
                    display: "inline-block",
                    padding: "0.5rem 1.3rem",
                    border: "1px solid #c9a84c",
                    color: "#c9a84c",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#c9a84c";
                    e.currentTarget.style.color = "#0a0906";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#c9a84c";
                  }}
                >
                  {s.slug === "sankofa-unit" ? "Contacter" : "Réserver"}
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(201,168,76,0.4)",
          }}
        />

        {/* Musique */}
        <div>
          <h2
            className={cinzel.className}
            style={{
              fontSize: "0.9rem",
              fontWeight: 400,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1.2rem",
            }}
          >
            Musique
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {TRACKS.map((t, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: "rgba(245,237,224,0.03)",
                  border: "1px solid rgba(201,168,76,0.12)",
                  borderRadius: "4px",
                  padding: "0.85rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.85rem" }}>
                  <span style={{ color: "#c9a84c", fontSize: "0.8rem" }}>&#9654;</span>
                  <span style={{ fontSize: "1.05rem", color: "#f5ede0" }}>{t.title}</span>
                </div>
                <span style={{ fontSize: "0.85rem", color: "#777" }}>{t.duration}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ marginTop: "auto", paddingTop: "2rem" }}>
          <div
            style={{
              width: "40px",
              height: "1px",
              backgroundColor: "rgba(201,168,76,0.2)",
              marginBottom: "1.2rem",
            }}
          />
          <a
            href="/entrealm"
            style={{
              fontSize: "0.8rem",
              color: "#777",
              textDecoration: "none",
              letterSpacing: "0.06em",
              transition: "color 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#c9a84c")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#777")}
          >
            Propulsé par <span className={cinzel.className}>ENTREALM</span>
          </a>
        </div>
      </div>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .left-column {
            width: 100% !important;
            min-height: 45vh !important;
            height: 45vh !important;
          }
          .right-column {
            width: 100% !important;
            min-height: auto !important;
            padding: 2.5rem 1.5rem 2rem !important;
          }
          div:has(> .left-column) {
            flex-direction: column !important;
          }
        }
      `}</style>
    </div>
  );
}
