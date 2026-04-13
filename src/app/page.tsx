"use client";

import { useEffect, useState } from "react";
import { Noto_Serif, Manrope } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";

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

export default function HomePage() {
  return (
    <div
      className={manrope.className}
      style={{ backgroundColor: "#0a0906", color: "#f5ede0", minHeight: "100vh" }}
    >
      {/* Nav */}
      <nav
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: "2rem",
          padding: "1.5rem 2rem 0",
        }}
      >
        <Link
          href="/tarifs"
          style={{
            color: "#e6c364",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderBottom: "1px solid transparent",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottomColor = "#e6c364";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottomColor = "transparent";
          }}
        >
          Tarifs
        </Link>
        <Link
          href="/inscription"
          style={{
            color: "#e6c364",
            fontSize: "0.8rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            textDecoration: "none",
            borderBottom: "1px solid transparent",
            transition: "border-color 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderBottomColor = "#e6c364";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderBottomColor = "transparent";
          }}
        >
          S&apos;inscrire
        </Link>
      </nav>

      {/* Hero */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "55vh",
          padding: "2rem 1.5rem 2rem",
          textAlign: "center",
        }}
      >
        <FadeIn delay={100}>
          <Image
            src="/logo_entrealm_art.png"
            alt="ENTREALM ART"
            width={320}
            height={320}
            style={{ margin: "0 auto 2rem", display: "block" }}
            priority
          />
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
            <QRCodeSVG
              value="https://entrealmart.com/entrealm/joby-smith"
              size={200}
              bgColor="#0a0906"
              fgColor="#e6c364"
              level="H"
              imageSettings={{
                src: "/logo-e.svg",
                height: 40,
                width: 40,
                excavate: true,
              }}
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
