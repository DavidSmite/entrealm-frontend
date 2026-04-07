"use client";

import { Noto_Serif, Manrope } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Link from "next/link";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const API = "https://turnkey-backend-8y0i.onrender.com";

const ARTISTS: Record<string, { name: string; services: { name: string; slug: string; amount: number; price: string }[] }> = {
  "joby-smith": {
    name: "Joby Smith",
    services: [
      { name: "Coaching individuel 1h", slug: "coaching-1h", amount: 8000, price: "80 €" },
      { name: "Pack 5 séances", slug: "pack-5", amount: 35000, price: "350 €" },
      { name: "Pack 10 séances", slug: "pack-10", amount: 65000, price: "650 €" },
      { name: "Masterclass", slug: "masterclass", amount: 50000, price: "500 €" },
      { name: "Sankofa Unit", slug: "sankofa-unit", amount: 0, price: "Sur devis" },
    ],
  },
};

function BookingContent() {
  const searchParams = useSearchParams();
  const artistId = searchParams.get("artist") || "joby-smith";
  const serviceParam = searchParams.get("service");
  const artist = ARTISTS[artistId];
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout(slug: string, amount: number) {
    setLoading(slug);
    setError(null);
    try {
      const res = await fetch(`${API}/api/entrealm/create-checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ artistId, serviceSlug: slug, amount }),
      });
      if (!res.ok) throw new Error(`Erreur ${res.status}`);
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Pas d'URL de paiement retournée");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur inattendue");
      setLoading(null);
    }
  }

  if (!artist) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#99907e" }}>
        Artiste introuvable.
      </div>
    );
  }

  const services = serviceParam
    ? artist.services.filter((s) => s.slug === serviceParam)
    : artist.services;

  return (
    <div className={manrope.className} style={{ background: "#0a0906", color: "#e7e2db", minHeight: "100vh" }}>

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
        <a
          href="/entrealm"
          className={notoSerif.className}
          style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e7e2db", textDecoration: "none" }}
        >
          Entrealm
        </a>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: "2.5rem" }}>
          {[
            { label: "Galerie", href: "joby-smith/videos" },
            { label: "Coaching", href: "coaching" },
            { label: "Réservations", href: "bookings" },
            { label: "Archive", href: "archive" },
          ].map((l) => (
            <a
              key={l.href}
              href={`/entrealm/${l.href}`}
              style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", textDecoration: "none", fontWeight: 500, transition: "color .3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:contact@entrealm.com?subject=Joby Smith — Contact"
            style={{ padding: "0.5rem 1.5rem", background: "linear-gradient(135deg,#e6c364,#c9a84c)", color: "#0a0906", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", textDecoration: "none", fontWeight: 600 }}
          >
            Contact
          </a>
        </div>
      </nav>

      {/* ── BACK LINK ── */}
      <div className="back-link" style={{ paddingTop: "6rem", paddingLeft: "3rem" }}>
        <Link
          href={`/entrealm/${artistId}`}
          style={{ fontSize: "0.75rem", color: "#99907e", textDecoration: "none", transition: "color .3s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
        >
          ← {artist.name}
        </Link>
      </div>

      {/* ── HEADER ── */}
      <section style={{ padding: "2rem 3rem 1rem", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#99907e", marginBottom: "1rem", fontWeight: 600 }}>
          Réservation
        </p>
        <h1
          className={notoSerif.className}
          style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "#e7e2db", marginBottom: "0.5rem" }}
        >
          {artist.name}
        </h1>
        <p style={{ fontSize: "0.9rem", color: "#99907e", marginBottom: "1rem" }}>
          Choisissez votre service et procédez au paiement sécurisé.
        </p>
      </section>

      {/* ── SERVICES ── */}
      <section style={{ padding: "2rem 3rem 5rem", maxWidth: "900px", margin: "0 auto" }}>
        {error && (
          <div style={{ padding: "1rem", marginBottom: "2rem", background: "rgba(255,180,171,0.1)", border: "1px solid rgba(255,180,171,0.3)", color: "#ffb4ab", fontSize: "0.85rem" }}>
            {error}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column" }}>
          {services.map((s, i) => {
            const isDevis = s.amount === 0;
            return (
              <div
                key={s.slug}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                  padding: "2rem",
                  background: i % 2 === 0 ? "transparent" : "#211f1b",
                }}
              >
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <h3
                    className={notoSerif.className}
                    style={{ fontSize: "1.2rem", fontWeight: 400, color: "#e7e2db", marginBottom: "0.3rem" }}
                  >
                    {s.name}
                  </h3>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
                  <span style={{ fontSize: "1.1rem", color: "#e6c364", fontWeight: 700 }}>
                    {s.price}
                  </span>
                  {isDevis ? (
                    <a
                      href={`mailto:contact@entrealm.com?subject=Sankofa Unit — Demande de devis`}
                      style={{
                        padding: "0.65rem 1.8rem",
                        border: "1px solid rgba(230,195,100,0.4)",
                        color: "#e6c364",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                        fontWeight: 600,
                        transition: "all .3s",
                      }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "#e6c364"; e.currentTarget.style.color = "#0a0906"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e6c364"; }}
                    >
                      Nous contacter
                    </a>
                  ) : (
                    <button
                      onClick={() => handleCheckout(s.slug, s.amount)}
                      disabled={loading === s.slug}
                      style={{
                        padding: "0.65rem 1.8rem",
                        background: loading === s.slug ? "#99907e" : "linear-gradient(135deg,#e6c364,#c9a84c)",
                        color: "#0a0906",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        fontWeight: 700,
                        border: "none",
                        cursor: loading === s.slug ? "wait" : "pointer",
                        transition: "opacity .3s",
                      }}
                    >
                      {loading === s.slug ? "Redirection..." : "Réserver"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer
        className="footer"
        style={{ padding: "3rem", background: "#0a0906", borderTop: "1px solid #4d4637", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}
      >
        <a href="/entrealm" className={notoSerif.className} style={{ fontSize: "0.8rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#99907e", textDecoration: "none" }}>
          Entrealm
        </a>
        <p style={{ fontSize: "0.7rem", color: "#4d4637", letterSpacing: "0.05em" }}>
          © 2026 Joby Smith · Tous droits réservés
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { label: "Confidentialité", href: "privacy" },
            { label: "Conditions", href: "terms" },
            { label: "Contact", href: "contact" },
          ].map((l) => (
            <a
              key={l.href}
              href={`/entrealm/${l.href}`}
              style={{ fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", textDecoration: "none", fontWeight: 500, transition: "color .3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
            >
              {l.label}
            </a>
          ))}
        </div>
      </footer>

      {/* ── RESPONSIVE ── */}
      <style>{`
        @media (max-width: 768px) {
          .nav-bar { padding: 1rem 1.5rem !important; }
          .nav-links { display: none !important; }
          .back-link { padding-top: 5.5rem !important; padding-left: 1.5rem !important; }
          .footer { flex-direction: column !important; align-items: flex-start !important; padding: 2.5rem 1.5rem !important; }
        }
      `}</style>
    </div>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#99907e" }}>
          Chargement...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
