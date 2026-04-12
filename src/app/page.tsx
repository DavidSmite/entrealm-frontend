"use client";

import { useEffect, useState } from "react";
import { Noto_Serif, Manrope } from "next/font/google";
import Image from "next/image";
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

function EntrealmLogo() {
  return (
    <svg
      viewBox="0 0 400 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "320px", height: "auto" }}
    >
      {/* Portail */}
      <path
        d="M40 10 C40 10, 15 20, 15 45 C15 62, 25 70, 40 70 C55 70, 65 62, 65 45 C65 20, 40 10, 40 10Z"
        stroke="#e6c364"
        strokeWidth="1.5"
        fill="none"
      />
      {/* Onde sonore gauche */}
      <path
        d="M22 35 C18 40, 18 50, 22 55"
        stroke="#e6c364"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M14 30 C8 38, 8 52, 14 60"
        stroke="#e6c364"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      {/* Onde sonore droite */}
      <path
        d="M58 35 C62 40, 62 50, 58 55"
        stroke="#e6c364"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M66 30 C72 38, 72 52, 66 60"
        stroke="#e6c364"
        strokeWidth="1"
        fill="none"
        opacity="0.35"
      />
      {/* Etoile */}
      <circle cx="40" cy="38" r="2.5" fill="#e6c364" />
      <line x1="40" y1="32" x2="40" y2="44" stroke="#e6c364" strokeWidth="0.8" opacity="0.5" />
      <line x1="34" y1="38" x2="46" y2="38" stroke="#e6c364" strokeWidth="0.8" opacity="0.5" />
      {/* Texte ENTREALM ART */}
      <text
        x="90"
        y="48"
        fill="#e6c364"
        fontFamily="serif"
        fontSize="28"
        letterSpacing="0.15em"
        fontWeight="400"
      >
        ENTREALM
      </text>
      <text
        x="320"
        y="48"
        fill="#e6c364"
        fontFamily="serif"
        fontSize="28"
        letterSpacing="0.2em"
        fontWeight="700"
      >
        ART
      </text>
    </svg>
  );
}

export default function HomePage() {
  return (
    <div
      className={manrope.className}
      style={{ backgroundColor: "#0a0906", color: "#f5ede0", minHeight: "100vh" }}
    >
      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: "4rem 1.5rem 2rem",
          textAlign: "center",
        }}
      >
        <FadeIn delay={100}>
          <EntrealmLogo />
        </FadeIn>

        <FadeIn delay={400}>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#e6c364",
              margin: "2rem auto",
            }}
          />
        </FadeIn>

        <FadeIn delay={600}>
          <p
            className={notoSerif.className}
            style={{
              fontSize: "1.15rem",
              color: "#e6c364",
              letterSpacing: "0.08em",
              fontStyle: "italic",
            }}
          >
            La plateforme des artistes d&apos;exception
          </p>
        </FadeIn>
      </section>

      {/* Joby Smith */}
      <section
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "2rem 1.5rem 3rem",
        }}
      >
        <FadeIn delay={800}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2rem",
            }}
          >
            <div
              style={{
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid rgba(230, 195, 100, 0.3)",
                position: "relative",
              }}
            >
              <Image
                src="/joby-smith.jpg"
                alt="Joby Smith"
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            <div style={{ textAlign: "center" }}>
              <h2
                className={notoSerif.className}
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 400,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#e6c364",
                  marginBottom: "0.5rem",
                }}
              >
                Joby Smith
              </h2>
              <p
                style={{
                  color: "#999",
                  fontSize: "0.95rem",
                  letterSpacing: "0.06em",
                  marginBottom: "2rem",
                }}
              >
                Artiste pilote &amp; Ambassadrice
              </p>

              <Link
                href="/entrealm/joby-smith"
                style={{
                  display: "inline-block",
                  border: "1px solid #e6c364",
                  color: "#e6c364",
                  padding: "0.75rem 2.5rem",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#e6c364";
                  e.currentTarget.style.color = "#0a0906";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "#e6c364";
                }}
              >
                Découvrir son univers
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* QR Code */}
      <section
        style={{
          textAlign: "center",
          padding: "2rem 1.5rem 3rem",
        }}
      >
        <FadeIn delay={1000}>
          <div
            style={{
              display: "inline-block",
              padding: "1.5rem",
              border: "1px solid rgba(230, 195, 100, 0.15)",
              borderRadius: "8px",
            }}
          >
            <Image
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://entrealmart.com/entrealm/joby-smith"
              alt="QR Code — Joby Smith"
              width={160}
              height={160}
              unoptimized
              style={{ display: "block", margin: "0 auto 1rem" }}
            />
            <p style={{ color: "#777", fontSize: "0.8rem", letterSpacing: "0.04em" }}>
              Scanner pour accéder à l&apos;univers de Joby Smith
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Footer */}
      <footer
        style={{
          textAlign: "center",
          padding: "2rem 1.5rem",
          borderTop: "1px solid rgba(230, 195, 100, 0.1)",
        }}
      >
        <FadeIn delay={1200}>
          <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
            © 2026 ENTREALM ART
          </p>
        </FadeIn>
      </footer>
    </div>
  );
}
