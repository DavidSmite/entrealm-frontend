"use client";

import { Cormorant_Garamond, Cinzel } from "next/font/google";
import { useState } from "react";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const SERVICES = [
  {
    name: "Coaching individuel 1h",
    price: "80 €",
    slug: "coaching-1h",
  },
  {
    name: "Pack 5 séances",
    price: "350 €",
    slug: "pack-5",
  },
  {
    name: "Pack 10 séances",
    price: "650 €",
    slug: "pack-10",
  },
  {
    name: "Masterclass",
    price: "500 €",
    slug: "masterclass",
  },
  {
    name: "Sankofa Unit",
    price: "Sur devis",
    slug: "sankofa-unit",
  },
];

const TRACKS = [
  { title: "Rise Again", duration: "4:12" },
  { title: "Lumière d'Afrique", duration: "3:47" },
  { title: "Breathe", duration: "5:01" },
];

function SectionTitle({ children }: { children: string }) {
  return (
    <div style={{ textAlign: "center", marginBottom: "2rem" }}>
      <div
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: "#c9a84c",
          margin: "0 auto 1.2rem",
        }}
      />
      <h2
        className={cinzel.className}
        style={{
          fontSize: "1.1rem",
          fontWeight: 400,
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: "#c9a84c",
        }}
      >
        {children}
      </h2>
    </div>
  );
}

export default function JobySmithPage() {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={cormorant.className}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0906",
        color: "#f5ede0",
      }}
    >
      {/* ── HERO ── */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "4rem 1.5rem 3rem",
          textAlign: "center",
        }}
      >
        {imgError ? (
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "2rem",
            }}
          >
            <span
              className={cinzel.className}
              style={{ fontSize: "2.4rem", color: "#c9a84c", fontWeight: 400 }}
            >
              JS
            </span>
          </div>
        ) : (
          <img
            src="/joby-smith.jpg"
            alt="Joby Smith"
            onError={() => setImgError(true)}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "1px solid rgba(201,168,76,0.4)",
              marginBottom: "2rem",
            }}
          />
        )}

        <h1
          className={cinzel.className}
          style={{
            fontSize: "2rem",
            fontWeight: 400,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: "0.6rem",
          }}
        >
          Joby Smith
        </h1>

        <p
          style={{
            fontSize: "1.1rem",
            color: "#d5cdc0",
            letterSpacing: "0.06em",
            marginBottom: "0.4rem",
          }}
        >
          Auteure · Compositrice · Interprète
        </p>

        <p
          style={{
            fontSize: "0.95rem",
            color: "#777",
            fontStyle: "italic",
          }}
        >
          25 ans de transmission vocale
        </p>
      </section>

      {/* ── BIO ── */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem 3.5rem" }}>
        <SectionTitle>Parcours</SectionTitle>
        <p
          style={{
            fontSize: "1.1rem",
            lineHeight: 1.85,
            color: "#d5cdc0",
            textAlign: "center",
          }}
        >
          Cheffe chorale de Sankofa Unit, professeure de chant et artiste accomplie,
          Joby Smith porte en elle plus de vingt-cinq ans de scène et de transmission.
          Formée entre Paris et Londres, elle tisse un univers où gospel, soul et
          musiques africaines se rencontrent. Son enseignement, exigeant et bienveillant,
          a accompagné des centaines de voix vers leur pleine expression. Avec ENTREALM,
          elle ouvre les portes de son univers artistique et pédagogique.
        </p>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem 3.5rem" }}>
        <SectionTitle>Services</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {SERVICES.map((s) => (
            <div
              key={s.slug}
              style={{
                border: "1px solid rgba(201,168,76,0.2)",
                borderRadius: "4px",
                padding: "1.25rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "0.75rem",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "1.05rem",
                    color: "#f5ede0",
                    marginBottom: "0.2rem",
                  }}
                >
                  {s.name}
                </p>
                <p
                  className={cinzel.className}
                  style={{
                    fontSize: "1rem",
                    color: "#c9a84c",
                    fontWeight: 400,
                  }}
                >
                  {s.price}
                </p>
              </div>

              {s.slug !== "sankofa-unit" ? (
                <a
                  href={`/entrealm/booking?artist=joby-smith&service=${s.slug}`}
                  className={cinzel.className}
                  style={{
                    display: "inline-block",
                    padding: "0.55rem 1.5rem",
                    border: "1px solid #c9a84c",
                    color: "#c9a84c",
                    fontSize: "0.75rem",
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
                  Réserver
                </a>
              ) : (
                <a
                  href="mailto:contact@entrealm.com?subject=Sankofa Unit — Demande de devis"
                  className={cinzel.className}
                  style={{
                    display: "inline-block",
                    padding: "0.55rem 1.5rem",
                    border: "1px solid rgba(201,168,76,0.4)",
                    color: "#777",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textDecoration: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#c9a84c";
                    e.currentTarget.style.color = "#c9a84c";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)";
                    e.currentTarget.style.color = "#777";
                  }}
                >
                  Contacter
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── MUSIQUE ── */}
      <section style={{ maxWidth: "720px", margin: "0 auto", padding: "0 1.5rem 3.5rem" }}>
        <SectionTitle>Musique</SectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {TRACKS.map((t, i) => (
            <div
              key={i}
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "4px",
                padding: "1rem 1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "#c9a84c", fontSize: "0.85rem" }}>&#9654;</span>
                <span style={{ fontSize: "1.05rem", color: "#f5ede0" }}>{t.title}</span>
              </div>
              <span style={{ fontSize: "0.9rem", color: "#777" }}>{t.duration}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Footer line ── */}
      <div
        style={{
          width: "40px",
          height: "1px",
          backgroundColor: "rgba(201,168,76,0.3)",
          margin: "0 auto 3rem",
        }}
      />
    </div>
  );
}
