"use client";

import { useEffect, useState } from "react";
import { Noto_Serif, Manrope } from "next/font/google";
import Link from "next/link";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
});

function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.8s ease, transform 0.8s ease",
      }}
    >
      {children}
    </div>
  );
}

const VITRINE_FEATURES = [
  "Page artiste professionnelle",
  "Bio, photo, galerie",
  "1 video integree",
  "Liens reseaux sociaux",
  "1 service bookable",
  "Formulaire de contact",
  "QR Code personnalise",
  "Dashboard (vues, reservations)",
  "Commission 8% sur reservations",
];

const SCENE_FEATURES = [
  "Tout VITRINE +",
  "Services bookables illimites",
  "Vente de titres / albums",
  "Page streaming musicale",
  "Page videos complete",
  "Stats avancees",
  'Badge "Artiste ENTREALM ART"',
  "Commission 10% sur ventes",
];

const FAQ = [
  {
    q: "Comment fonctionne l'essai gratuit ?",
    a: "Vous beneficiez de 14 jours d'acces complet a votre offre, sans carte bancaire requise. Vous pouvez annuler a tout moment avant la fin de l'essai.",
  },
  {
    q: "Qui peut rejoindre ENTREALM ART ?",
    a: "ENTREALM ART est ouvert aux artistes professionnels ou en devenir. Chaque profil fait l'objet d'une validation qualitative avant publication sur la plateforme.",
  },
  {
    q: "Puis-je changer d'offre ?",
    a: "Oui, vous pouvez passer de VITRINE a SCENE (ou inversement) a tout moment depuis votre dashboard. Le changement prend effet immediatement.",
  },
];

function PricingCard({
  name,
  price,
  tagline,
  features,
  highlighted,
  badge,
  delay,
}: {
  name: string;
  price: number;
  tagline: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          border: highlighted
            ? "1.5px solid #e6c364"
            : "1px solid rgba(230, 195, 100, 0.2)",
          borderRadius: "6px",
          padding: "2.5rem 2rem",
          position: "relative",
          flex: "1 1 340px",
          maxWidth: "440px",
          backgroundColor: highlighted
            ? "rgba(230, 195, 100, 0.03)"
            : "transparent",
        }}
      >
        {badge && (
          <div
            style={{
              position: "absolute",
              top: "-12px",
              left: "50%",
              transform: "translateX(-50%)",
              backgroundColor: "#e6c364",
              color: "#0a0906",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              padding: "0.3rem 1rem",
              borderRadius: "3px",
            }}
          >
            {badge}
          </div>
        )}

        <h3
          className={notoSerif.className}
          style={{
            fontSize: "1.3rem",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#e6c364",
            marginBottom: "0.3rem",
          }}
        >
          {name}
        </h3>

        <p style={{ color: "#999", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
          {tagline}
        </p>

        <div style={{ marginBottom: "2rem" }}>
          <span
            className={notoSerif.className}
            style={{ fontSize: "2.4rem", color: "#f5ede0", fontWeight: 700 }}
          >
            {price}€
          </span>
          <span style={{ color: "#777", fontSize: "0.9rem" }}> /mois</span>
        </div>

        <ul style={{ listStyle: "none", padding: 0, marginBottom: "2rem" }}>
          {features.map((f) => (
            <li
              key={f}
              style={{
                padding: "0.45rem 0",
                fontSize: "0.9rem",
                color: "#ccc",
                borderBottom: "1px solid rgba(230, 195, 100, 0.06)",
              }}
            >
              <span style={{ color: "#e6c364", marginRight: "0.6rem" }}>&#10003;</span>
              {f}
            </li>
          ))}
        </ul>

        <Link
          href="#"
          style={{
            display: "block",
            textAlign: "center",
            border: "1px solid #e6c364",
            color: highlighted ? "#0a0906" : "#e6c364",
            backgroundColor: highlighted ? "#e6c364" : "transparent",
            padding: "0.75rem 2rem",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = highlighted
              ? "#d4b05a"
              : "#e6c364";
            e.currentTarget.style.color = "#0a0906";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = highlighted
              ? "#e6c364"
              : "transparent";
            e.currentTarget.style.color = highlighted ? "#0a0906" : "#e6c364";
          }}
        >
          Commencer l&apos;essai gratuit
        </Link>
      </div>
    </FadeIn>
  );
}

function FAQItem({ q, a, delay }: { q: string; a: string; delay: number }) {
  const [open, setOpen] = useState(false);

  return (
    <FadeIn delay={delay}>
      <div
        style={{
          borderBottom: "1px solid rgba(230, 195, 100, 0.12)",
          padding: "1.2rem 0",
        }}
      >
        <button
          onClick={() => setOpen(!open)}
          style={{
            background: "none",
            border: "none",
            color: "#f5ede0",
            fontSize: "0.95rem",
            cursor: "pointer",
            width: "100%",
            textAlign: "left",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          <span>{q}</span>
          <span
            style={{
              color: "#e6c364",
              fontSize: "1.2rem",
              transform: open ? "rotate(45deg)" : "rotate(0)",
              transition: "transform 0.3s ease",
            }}
          >
            +
          </span>
        </button>
        <div
          style={{
            maxHeight: open ? "200px" : "0",
            overflow: "hidden",
            transition: "max-height 0.4s ease",
          }}
        >
          <p style={{ color: "#999", fontSize: "0.88rem", lineHeight: 1.6, paddingTop: "0.8rem" }}>
            {a}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}

export default function TarifsPage() {
  return (
    <div
      className={manrope.className}
      style={{ backgroundColor: "#0a0906", color: "#f5ede0", minHeight: "100vh" }}
    >
      {/* Hero */}
      <section
        style={{
          textAlign: "center",
          padding: "5rem 1.5rem 3rem",
        }}
      >
        <FadeIn delay={100}>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#e6c364",
              margin: "0 auto 2rem",
            }}
          />
        </FadeIn>

        <FadeIn delay={200}>
          <h1
            className={notoSerif.className}
            style={{
              fontSize: "2rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#e6c364",
              marginBottom: "0.6rem",
            }}
          >
            Rejoindre ENTREALM ART
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p style={{ color: "#999", fontSize: "1rem", letterSpacing: "0.04em" }}>
            14 jours d&apos;essai gratuit — sans engagement
          </p>
        </FadeIn>
      </section>

      {/* Pricing cards */}
      <section
        style={{
          maxWidth: "940px",
          margin: "0 auto",
          padding: "1rem 1.5rem 2rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <PricingCard
          name="Vitrine"
          price={24}
          tagline="Pour se faire connaitre"
          features={VITRINE_FEATURES}
          delay={500}
        />
        <PricingCard
          name="Scene"
          price={44}
          tagline="Pour se faire connaitre et vendre"
          features={SCENE_FEATURES}
          highlighted
          badge="Le plus complet"
          delay={650}
        />
      </section>

      {/* Beta note */}
      <FadeIn delay={800}>
        <p
          style={{
            textAlign: "center",
            color: "#555",
            fontSize: "0.75rem",
            letterSpacing: "0.06em",
            fontStyle: "italic",
            padding: "0.5rem 1.5rem 3rem",
          }}
        >
          Tarifs en phase beta — susceptibles d&apos;evoluer selon vos retours
        </p>
      </FadeIn>

      {/* FAQ */}
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "1rem 1.5rem 3rem",
        }}
      >
        <FadeIn delay={900}>
          <h2
            className={notoSerif.className}
            style={{
              fontSize: "1.1rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#e6c364",
              marginBottom: "1.5rem",
            }}
          >
            Questions frequentes
          </h2>
        </FadeIn>

        {FAQ.map((item, i) => (
          <FAQItem key={i} q={item.q} a={item.a} delay={1000 + i * 100} />
        ))}
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1.5rem",
          borderTop: "1px solid rgba(230, 195, 100, 0.1)",
        }}
      >
        <FadeIn delay={1300}>
          <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            &copy; 2026 ENTREALM ART
          </p>
        </FadeIn>
      </footer>
    </div>
  );
}
