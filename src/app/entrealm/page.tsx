"use client";

import { Cormorant_Garamond, Cinzel } from "next/font/google";
import { useState } from "react";
import Image from "next/image";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const VALUES = [
  {
    icon: "\uD83C\uDFAF",
    title: "Visibilité",
    text: "Une page artiste professionnelle, votre vitrine permanente",
  },
  {
    icon: "\uD83D\uDCC5",
    title: "Réservations",
    text: "Gérez vos prestations et encaissez en ligne, sans friction",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Revenus",
    text: "Fixez vos tarifs, ENTREALM s\u2019occupe du reste (commission 15\u00A0%)",
  },
];

const STEPS = [
  "Soumettez votre profil artiste",
  "Nous créons votre page sur mesure",
  "Vous recevez des réservations et encaissez",
];

function GoldButton({
  href,
  children,
  outline = false,
}: {
  href: string;
  children: string;
  outline?: boolean;
}) {
  return (
    <a
      href={href}
      className={cinzel.className}
      style={{
        display: "inline-block",
        padding: "0.85rem 2.2rem",
        border: "1px solid #c9a84c",
        backgroundColor: outline ? "transparent" : "#c9a84c",
        color: outline ? "#c9a84c" : "#0a0906",
        fontSize: "0.78rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        textDecoration: "none",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => {
        if (outline) {
          e.currentTarget.style.backgroundColor = "#c9a84c";
          e.currentTarget.style.color = "#0a0906";
        } else {
          e.currentTarget.style.backgroundColor = "#b8983f";
        }
      }}
      onMouseLeave={(e) => {
        if (outline) {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#c9a84c";
        } else {
          e.currentTarget.style.backgroundColor = "#c9a84c";
        }
      }}
    >
      {children}
    </a>
  );
}

function SectionSep() {
  return (
    <div
      style={{
        width: "40px",
        height: "1px",
        backgroundColor: "rgba(201,168,76,0.3)",
        margin: "0 auto",
      }}
    />
  );
}

export default function EntrealmHomePage() {
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
      {/* Logo */}
      <Image
        src="/logo-entrealm-art.png"
        alt="ENTREALM ART"
        width={420}
        height={420}
        priority
        style={{ display: "block", margin: "4rem auto 0" }}
      />

      {/* ═══════ SECTION 1 — HERO ═══════ */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "4rem 1.5rem",
          position: "relative",
          boxShadow: "inset 0 0 120px rgba(201,168,76,0.04)",
        }}
      >
        <h1
          className={cinzel.className}
          style={{
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 400,
            letterSpacing: "0.08em",
            color: "#f5ede0",
            lineHeight: 1.15,
            maxWidth: "780px",
            marginBottom: "1.5rem",
          }}
        >
          La scène de demain commence ici
        </h1>

        <p
          style={{
            fontSize: "1.3rem",
            fontStyle: "italic",
            color: "#d5cdc0",
            maxWidth: "560px",
            lineHeight: 1.6,
            marginBottom: "2.5rem",
          }}
        >
          La plateforme qui connecte les artistes d'exception à leur public
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <GoldButton href="mailto:contact@entrealm.com?subject=Présentation artiste — ENTREALM">
            Présenter mon artiste
          </GoldButton>
          <GoldButton href="/entrealm/joby-smith" outline>
            Découvrir Joby Smith
          </GoldButton>
        </div>
      </section>

      <SectionSep />

      {/* ═══════ SECTION 2 — VALEUR ═══════ */}
      <section
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "2rem",
          }}
        >
          {VALUES.map((v) => (
            <div
              key={v.title}
              style={{
                border: "1px solid rgba(201,168,76,0.15)",
                borderRadius: "4px",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
                {v.icon}
              </div>
              <h3
                className={cinzel.className}
                style={{
                  fontSize: "0.85rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#c9a84c",
                  fontWeight: 400,
                  marginBottom: "0.8rem",
                }}
              >
                {v.title}
              </h3>
              <p style={{ fontSize: "1.05rem", color: "#d5cdc0", lineHeight: 1.6 }}>
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SectionSep />

      {/* ═══════ SECTION 3 — ARTISTE EN VEDETTE ═══════ */}
      <section
        style={{
          maxWidth: "780px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "2.5rem",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Photo */}
        {!imgError ? (
          <img
            src="/joby-smith.jpg"
            alt="Joby Smith"
            onError={() => setImgError(true)}
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center top",
              border: "1px solid rgba(201,168,76,0.3)",
              flexShrink: 0,
            }}
          />
        ) : (
          <div
            style={{
              width: "140px",
              height: "140px",
              borderRadius: "50%",
              border: "1px solid rgba(201,168,76,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              backgroundColor: "#1a1610",
            }}
          >
            <span
              className={cinzel.className}
              style={{ fontSize: "2.2rem", color: "#c9a84c", fontWeight: 400 }}
            >
              JS
            </span>
          </div>
        )}

        {/* Text */}
        <div style={{ flex: 1, minWidth: "260px" }}>
          <p
            className={cinzel.className}
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "0.6rem",
            }}
          >
            Artiste pilote ENTREALM
          </p>
          <h3
            className={cinzel.className}
            style={{
              fontSize: "1.4rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              color: "#f5ede0",
              marginBottom: "0.8rem",
            }}
          >
            Joby Smith
          </h3>
          <p
            style={{
              fontSize: "1.1rem",
              lineHeight: 1.7,
              color: "#d5cdc0",
              marginBottom: "1.5rem",
            }}
          >
            Auteure, compositrice et interprète, cheffe du chœur Sankofa Unit.
            25 ans de scène et de transmission vocale entre Paris et Londres.
          </p>
          <GoldButton href="/entrealm/joby-smith" outline>
            Voir sa page
          </GoldButton>
        </div>
      </section>

      <SectionSep />

      {/* ═══════ SECTION 4 — COMMENT ÇA MARCHE ═══════ */}
      <section
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h2
          className={cinzel.className}
          style={{
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: "2.5rem",
          }}
        >
          Comment ça marche
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          {STEPS.map((step, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1.5rem",
                maxWidth: "480px",
                width: "100%",
                textAlign: "left",
              }}
            >
              <span
                className={cinzel.className}
                style={{
                  fontSize: "1.8rem",
                  color: "#c9a84c",
                  fontWeight: 400,
                  lineHeight: 1,
                  flexShrink: 0,
                  width: "40px",
                  textAlign: "center",
                }}
              >
                {i + 1}
              </span>
              <p style={{ fontSize: "1.15rem", color: "#d5cdc0", lineHeight: 1.5 }}>
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SectionSep />

      {/* ═══════ SECTION 5 — CTA FINAL ═══════ */}
      <section
        style={{
          padding: "5rem 1.5rem",
          textAlign: "center",
        }}
      >
        <h2
          className={cinzel.className}
          style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 400,
            letterSpacing: "0.1em",
            color: "#f5ede0",
            marginBottom: "1rem",
          }}
        >
          Prêt à rejoindre ENTREALM ?
        </h2>

        <p
          style={{
            fontSize: "1.1rem",
            fontStyle: "italic",
            color: "#777",
            marginBottom: "2.5rem",
          }}
        >
          Places limitées — Artistes sélectionnés sur dossier
        </p>

        <GoldButton href="mailto:contact@entrealm.com?subject=Dossier artiste — ENTREALM">
          Soumettre mon dossier
        </GoldButton>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <footer
        style={{
          borderTop: "1px solid rgba(201,168,76,0.1)",
          padding: "2rem 1.5rem",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.85rem", color: "#555", letterSpacing: "0.04em" }}>
          © 2026{" "}
          <span className={cinzel.className} style={{ letterSpacing: "0.1em" }}>
            ENTREALM
          </span>{" "}
          — Tous droits réservés
        </p>
      </footer>
    </div>
  );
}
