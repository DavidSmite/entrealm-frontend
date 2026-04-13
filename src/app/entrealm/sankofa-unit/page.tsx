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

const PALMARES = [
  { icon: "\uD83C\uDFC6", title: "Incroyable Talent 2012", desc: "Demi-finaliste" },
  { icon: "\uD83C\uDF84", title: "Noel de l'Elysee 2012", desc: "" },
  { icon: "\uD83D\uDCFA", title: "The Voice, Taratata, Les 300 Choeurs", desc: "Depuis 2014" },
  { icon: "\uD83C\uDFB5", title: "Tournee Shaka Ponk", desc: "16 choristes sur scene" },
  { icon: "\uD83C\uDFAD", title: "Premiere partie Chimene Badi", desc: "Folies Bergeres" },
  { icon: "\uD83D\uDCBF", title: "Albums Ibrahim Maalouf, Clara Luciani", desc: "" },
];

const SERVICES = [
  { id: "concerts", title: "Concerts & Spectacles" },
  { id: "evenements", title: "Evenements & Mariages" },
  { id: "accompagnement", title: "Accompagnement d'artistes sur scene" },
  { id: "studio", title: "Seances studio" },
];

const VIDEOS = [
  { src: "https://www.youtube.com/embed/onZu5wLIuDE", title: "Taratata — Time To Come Home" },
  { src: "https://www.youtube.com/embed/n4ej5Sx96ng", title: "Shaka Ponk — Killing Hallelujah Victoires 2019" },
  { src: "https://www.youtube.com/embed/vSs6J0sP5FY", title: "Dance or die — Trocadero" },
];

const ARTISTES = [
  "Amel Bent", "Chimene Badi", "Christophe Mae", "Pascal Obispo",
  "Imany", "M", "Ibeyi", "Shaka Ponk", "Riles", "Synapson",
  "Axelle Red", "Ibrahim Maalouf", "Clara Luciani", "Jok'air", "Luidji",
];

export default function SankofaUnitPage() {
  return (
    <div
      className={manrope.className}
      style={{ backgroundColor: "#0a0906", color: "#f5ede0", minHeight: "100vh" }}
    >
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
        <Link
          href="/"
          className={notoSerif.className}
          style={{
            fontSize: "0.85rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#e7e2db",
            textDecoration: "none",
          }}
        >
          Entrealm Art
        </Link>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {[
            { label: "Accueil", href: "/" },
            { label: "Joby Smith", href: "/entrealm/joby-smith" },
            { label: "Coaching", href: "/entrealm/joby-smith/coaching" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#99907e",
                textDecoration: "none",
                fontWeight: 500,
                transition: "color .3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="mailto:contact@entrealm.com?subject=Sankofa Unit — Contact"
            style={{
              padding: "0.5rem 1.5rem",
              background: "linear-gradient(135deg,#e6c364,#c9a84c)",
              color: "#0a0906",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Contact
          </Link>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "6rem 1.5rem 4rem",
        }}
      >
        <FadeIn delay={100}>
          <div style={{ overflow: "visible" }}>
            <Image
              src="/sankofa-logo-or.png"
              alt="Sankofa Unit"
              width={300}
              height={380}
              priority
              style={{ display: "block", margin: "2rem auto 0", paddingBottom: "2rem" }}
            />
          </div>
        </FadeIn>

        <FadeIn delay={300}>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#e6c364",
              marginBottom: "1.5rem",
              fontWeight: 700,
            }}
          >
            La chorale urbaine
          </p>
        </FadeIn>

        <FadeIn delay={500}>
          <h1
            className={notoSerif.className}
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 400,
              fontStyle: "italic",
              color: "#f5ede0",
              letterSpacing: "0.02em",
              marginBottom: "1.5rem",
            }}
          >
            Be Gospel, Be Unit, Be There!
          </h1>
        </FadeIn>

        <FadeIn delay={700}>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#e6c364",
              margin: "0 auto 1.5rem",
            }}
          />
        </FadeIn>

        <FadeIn delay={800}>
          <p style={{ color: "#999", fontSize: "0.9rem", letterSpacing: "0.04em" }}>
            Fondee en 2010 par David Smite &amp; Joby Smith
          </p>
        </FadeIn>
      </section>

      {/* ── BIO ── */}
      <section
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          padding: "4rem 1.5rem",
          borderTop: "1px solid rgba(230,195,100,0.1)",
        }}
      >
        <FadeIn delay={200}>
          <h2
            className={notoSerif.className}
            style={{
              fontSize: "1.4rem",
              fontWeight: 400,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#e6c364",
              marginBottom: "2rem",
            }}
          >
            Qui sommes-nous ?
          </h2>
        </FadeIn>

        <FadeIn delay={300}>
          <p style={{ color: "#d0c5b2", fontSize: "1rem", lineHeight: 1.85, marginBottom: "2rem" }}>
            Creee en janvier 2010, Sankofa Unit recrute ses premiers membres via le
            Sankofa Soul Contest — premier tremplin Soul International. Demi-finaliste
            d&apos;Incroyable Talent en 2012, la chorale chante pour le Noel de l&apos;Elysee
            quelques mois plus tard. Depuis 2014, regulierement sur les plateaux TV :
            The Voice, Les 300 Choeurs, Taratata. Aujourd&apos;hui, 40 chanteurs ages
            de 16 a 40 ans, unis par des valeurs d&apos;espoir, de bienveillance et de partage.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <p style={{ color: "#999", fontSize: "0.9rem", lineHeight: 1.8, marginBottom: "1rem" }}>
            Ils ont chante avec :
          </p>
          <p style={{ lineHeight: 2 }}>
            {ARTISTES.map((a, i) => (
              <span key={a}>
                <span style={{ color: "#e6c364", fontSize: "0.9rem" }}>{a}</span>
                {i < ARTISTES.length - 1 && (
                  <span style={{ color: "#4d4637", margin: "0 0.4rem" }}>·</span>
                )}
              </span>
            ))}
          </p>
        </FadeIn>
      </section>

      {/* ── PALMARES ── */}
      <section
        style={{
          padding: "4rem 1.5rem",
          backgroundColor: "#0f0d0a",
          borderTop: "1px solid rgba(230,195,100,0.1)",
          borderBottom: "1px solid rgba(230,195,100,0.1)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn delay={200}>
            <h2
              className={notoSerif.className}
              style={{
                fontSize: "1.2rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e6c364",
                marginBottom: "2rem",
              }}
            >
              Palmares
            </h2>
          </FadeIn>

          <div
            className="palmares-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "1rem",
            }}
          >
            {PALMARES.map((p, i) => (
              <FadeIn key={i} delay={300 + i * 80}>
                <div
                  style={{
                    padding: "1.25rem",
                    border: "1px solid rgba(230,195,100,0.15)",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ fontSize: "1.4rem", marginRight: "0.75rem" }}>{p.icon}</span>
                  <span style={{ color: "#f5ede0", fontSize: "0.9rem", fontWeight: 700 }}>
                    {p.title}
                  </span>
                  {p.desc && (
                    <span style={{ color: "#999", fontSize: "0.85rem", marginLeft: "0.5rem" }}>
                      — {p.desc}
                    </span>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ maxWidth: "900px", margin: "0 auto", padding: "4rem 1.5rem" }}>
        <FadeIn delay={200}>
          <h2
            className={notoSerif.className}
            style={{
              fontSize: "1.2rem",
              fontWeight: 400,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#e6c364",
              marginBottom: "2rem",
            }}
          >
            Services
          </h2>
        </FadeIn>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {SERVICES.map((s, i) => (
            <FadeIn key={s.id} delay={300 + i * 100}>
              <div
                style={{
                  border: "1px solid rgba(230,195,100,0.2)",
                  borderRadius: "4px",
                  padding: "2rem 1.5rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  gap: "1.5rem",
                }}
              >
                <h3
                  className={notoSerif.className}
                  style={{
                    fontSize: "1rem",
                    fontWeight: 400,
                    color: "#f5ede0",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.title}
                </h3>
                <Link
                  href={`/entrealm/booking?artist=sankofa-unit&service=${s.id}`}
                  style={{
                    padding: "0.6rem 1.8rem",
                    border: "1px solid #e6c364",
                    color: "#e6c364",
                    fontSize: "0.7rem",
                    letterSpacing: "0.1em",
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
                  Reserver
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section
        style={{
          padding: "4rem 1.5rem",
          backgroundColor: "#1d1b17",
          borderTop: "1px solid rgba(230,195,100,0.1)",
        }}
      >
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <FadeIn delay={200}>
            <h2
              className={notoSerif.className}
              style={{
                fontSize: "1.2rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e6c364",
                marginBottom: "2rem",
              }}
            >
              Videos
            </h2>
          </FadeIn>

          <div
            className="videos-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {VIDEOS.map((v, i) => (
              <FadeIn key={i} delay={300 + i * 100}>
                <div
                  style={{
                    border: "1px solid rgba(230,195,100,0.15)",
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={v.src}
                    title={v.title}
                    width="100%"
                    height="200"
                    style={{ display: "block", border: "none" }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                  <p
                    style={{
                      padding: "0.75rem 1rem",
                      color: "#999",
                      fontSize: "0.8rem",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {v.title}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESEAUX SOCIAUX + FOOTER ── */}
      <footer
        style={{
          padding: "3rem 1.5rem",
          borderTop: "1px solid rgba(230,195,100,0.1)",
          textAlign: "center",
        }}
      >
        <FadeIn delay={200}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2.5rem",
              marginBottom: "2rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "Instagram", href: "https://instagram.com/sankofaunit" },
              { label: "Facebook", href: "https://www.facebook.com/SankofaUnit" },
              { label: "YouTube", href: "https://www.youtube.com/@sankofaunitofficial" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#99907e",
                  textDecoration: "none",
                  fontWeight: 500,
                  transition: "color .3s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
              >
                {s.label}
              </a>
            ))}
          </div>
        </FadeIn>

        <p style={{ color: "#4d4637", fontSize: "0.7rem", letterSpacing: "0.05em" }}>
          &copy; 2026 Sankofa Unit &middot; ENTREALM ART &middot; Tous droits reserves
        </p>
      </footer>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-bar { padding: 1rem 1.5rem !important; }
          .nav-links { display: none !important; }
        }
      `}</style>
    </div>
  );
}
