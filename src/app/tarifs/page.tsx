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

const STEPS = [
  {
    n: "1",
    title: "Vous candidatez",
    body: "Vous presentez votre parcours et vos references. Chaque candidature est lue : ENTREALM ART selectionne sur dossier.",
  },
  {
    n: "2",
    title: "Votre profil devient votre vitrine",
    body: "Photos, parcours, references, configurations, disponibilites : de quoi etre choisi par un professionnel.",
  },
  {
    n: "3",
    title: "On vous reserve",
    body: "Le client regle sur la plateforme, le paiement est securise, vous etes paye apres la prestation.",
  },
];

const FAQ = [
  {
    q: "Qui peut rejoindre ENTREALM ART ?",
    a: "ENTREALM ART est ouvert aux artistes professionnels ou en devenir. Chaque profil fait l'objet d'une validation qualitative avant publication sur la plateforme.",
  },
  {
    q: "Que se passe-t-il apres ma candidature ?",
    a: "Nous lisons votre dossier et revenons vers vous sous 48 heures. Si votre profil est retenu, nous construisons votre page avec vous.",
  },
  {
    q: "Ce que ca coute",
    a: "9 EUR par mois pour votre page et vos outils. Et 10 % uniquement sur les reservations qui naissent d'ENTREALM ART : quand c'est nous qui vous amenons le client. Sur les affaires que vous decrochez vous-meme, nous ne prenons rien.",
  },
  {
    q: "Pourquoi un abonnement ET une commission ?",
    a: "Parce que ce sont deux choses differentes. L'abonnement paie l'outil : votre page, votre dossier, l'encaissement securise, vos factures. La commission paie l'apport d'affaires, et elle n'est due que lorsque le client vient de nous.",
  },
];

function StepCard({
  n,
  title,
  body,
  delay,
}: {
  n: string;
  title: string;
  body: string;
  delay: number;
}) {
  return (
    <FadeIn delay={delay}>
      <div
        style={{
          border: "1px solid rgba(230, 195, 100, 0.2)",
          borderRadius: "6px",
          padding: "2rem 1.8rem",
          flex: "1 1 260px",
          maxWidth: "320px",
        }}
      >
        <span
          className={notoSerif.className}
          style={{
            fontSize: "2rem",
            color: "#e6c364",
            fontWeight: 700,
            display: "block",
            marginBottom: "0.8rem",
          }}
        >
          {n}
        </span>
        <h3
          className={notoSerif.className}
          style={{
            fontSize: "1.05rem",
            fontWeight: 400,
            letterSpacing: "0.06em",
            color: "#f5ede0",
            marginBottom: "0.7rem",
          }}
        >
          {title}
        </h3>
        <p style={{ color: "#ccc", fontSize: "0.9rem", lineHeight: 1.7 }}>{body}</p>
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
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "none",
            border: "none",
            color: "#f5ede0",
            fontSize: "0.95rem",
            textAlign: "left",
            cursor: "pointer",
            padding: 0,
            fontFamily: "inherit",
          }}
        >
          {q}
          <span style={{ color: "#e6c364", fontSize: "1.2rem", marginLeft: "1rem" }}>
            {open ? "−" : "+"}
          </span>
        </button>
        {open && (
          <p
            style={{
              color: "#999",
              fontSize: "0.88rem",
              lineHeight: 1.7,
              marginTop: "0.8rem",
            }}
          >
            {a}
          </p>
        )}
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
      <section style={{ textAlign: "center", padding: "5rem 1.5rem 3rem" }}>
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
            Comment ca marche
          </h1>
        </FadeIn>

        <FadeIn delay={400}>
          <p style={{ color: "#999", fontSize: "1rem", letterSpacing: "0.04em" }}>
            Rejoindre ENTREALM ART, etape par etape
          </p>
        </FadeIn>
      </section>

      {/* Etapes */}
      <section
        style={{
          maxWidth: "1040px",
          margin: "0 auto",
          padding: "1rem 1.5rem 3rem",
          display: "flex",
          flexWrap: "wrap",
          gap: "1.5rem",
          justifyContent: "center",
          alignItems: "stretch",
        }}
      >
        {STEPS.map((s, i) => (
          <StepCard key={s.n} {...s} delay={500 + i * 150} />
        ))}
      </section>

      {/* Conditions */}
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "0 1.5rem 3rem",
          textAlign: "center",
        }}
      >
        <FadeIn delay={950}>
          <h2
            className={notoSerif.className}
            style={{
              fontSize: "1.1rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#e6c364",
              marginBottom: "1rem",
            }}
          >
            Nos conditions
          </h2>
          <p style={{ color: "#ccc", fontSize: "0.95rem", lineHeight: 1.8, marginBottom: "1.2rem" }}>
            <strong style={{ color: "#f5ede0" }}>9 EUR par mois</strong> pour votre page
            et vos outils. Tarif fondateur, conserve a vie par les trente premiers
            artistes selectionnes.
          </p>
          <p style={{ color: "#ccc", fontSize: "0.95rem", lineHeight: 1.8 }}>
            Et <strong style={{ color: "#f5ede0" }}>10 %</strong> uniquement sur les
            reservations qui naissent d&apos;ENTREALM ART. Sur les affaires que vous
            decrochez vous-meme, nous ne prenons rien.
          </p>
        </FadeIn>

        <FadeIn delay={1050}>
          <Link
            href="/inscription"
            style={{
              display: "inline-block",
              marginTop: "2rem",
              border: "1px solid #e6c364",
              backgroundColor: "#e6c364",
              color: "#0a0906",
              padding: "0.75rem 2rem",
              fontSize: "0.8rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#d4b05a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#e6c364";
            }}
          >
            Proposer ma candidature
          </Link>
        </FadeIn>
      </section>

      {/* FAQ */}
      <section
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "1rem 1.5rem 3rem",
        }}
      >
        <FadeIn delay={1150}>
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
          <FAQItem key={i} q={item.q} a={item.a} delay={1250 + i * 100} />
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
        <FadeIn delay={1550}>
          <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            &copy; 2026 ENTREALM ART
          </p>
        </FadeIn>
      </footer>
    </div>
  );
}
