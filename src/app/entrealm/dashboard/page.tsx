"use client";

import { Noto_Serif, Manrope } from "next/font/google";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const notoSerif = Noto_Serif({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

interface ArtistInfo {
  slug: string;
  name: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [artist, setArtist] = useState<ArtistInfo | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("entrealm_token");
    const stored = localStorage.getItem("entrealm_artist");
    if (!token || !stored) {
      router.replace("/entrealm/login");
      return;
    }
    try {
      setArtist(JSON.parse(stored));
    } catch {
      router.replace("/entrealm/login");
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("entrealm_token");
    localStorage.removeItem("entrealm_artist");
    router.replace("/entrealm/login");
  }

  if (!artist) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#99907e" }}>
        Chargement...
      </div>
    );
  }

  return (
    <div className={manrope.className} style={{ background: "#0a0906", color: "#e7e2db", minHeight: "100vh" }}>

      {/* ── NAV ── */}
      <nav style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 3rem",
        background: "rgba(10,9,6,0.7)",
        backdropFilter: "blur(30px)",
        WebkitBackdropFilter: "blur(30px)",
      }}>
        <Link href="/entrealm" className={notoSerif.className} style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e7e2db", textDecoration: "none" }}>
          Entrealm
        </Link>
        <button
          onClick={handleLogout}
          style={{ padding: "0.5rem 1.5rem", border: "1px solid rgba(230,195,100,0.4)", background: "transparent", color: "#e6c364", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", transition: "all .3s" }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#e6c364"; e.currentTarget.style.color = "#0a0906"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#e6c364"; }}
        >
          Déconnexion
        </button>
      </nav>

      {/* ── CONTENT ── */}
      <section style={{ padding: "4rem 3rem", maxWidth: "900px", margin: "0 auto" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#99907e", marginBottom: "1rem", fontWeight: 600 }}>
          Tableau de bord
        </p>
        <h1 className={notoSerif.className} style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 400, color: "#e7e2db", marginBottom: "3rem" }}>
          Bienvenue, {artist.name}
        </h1>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
          <Link
            href={`/entrealm/dashboard/${artist.slug}`}
            style={{
              padding: "2rem",
              background: "#1d1b17",
              textDecoration: "none",
              transition: "background .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#211f1b")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1d1b17")}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e6c364", marginBottom: "0.75rem", fontWeight: 600 }}>
              Réservations & Stats
            </p>
            <p style={{ fontSize: "0.85rem", color: "#99907e" }}>
              Voir les réservations, revenus et statistiques
            </p>
          </Link>

          <Link
            href={`/entrealm/${artist.slug}/coaching`}
            style={{
              padding: "2rem",
              background: "#1d1b17",
              textDecoration: "none",
              transition: "background .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#211f1b")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1d1b17")}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e6c364", marginBottom: "0.75rem", fontWeight: 600 }}>
              Services
            </p>
            <p style={{ fontSize: "0.85rem", color: "#99907e" }}>
              Gérer vos offres de coaching et masterclass
            </p>
          </Link>

          <Link
            href={`/entrealm/${artist.slug}`}
            style={{
              padding: "2rem",
              background: "#1d1b17",
              textDecoration: "none",
              transition: "background .3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#211f1b")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#1d1b17")}
          >
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e6c364", marginBottom: "0.75rem", fontWeight: 600 }}>
              Profil public
            </p>
            <p style={{ fontSize: "0.85rem", color: "#99907e" }}>
              Voir et gérer votre page artiste
            </p>
          </Link>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "3rem", background: "#0a0906", borderTop: "1px solid #4d4637", marginTop: "auto" }}>
        <p style={{ fontSize: "0.7rem", color: "#4d4637", textAlign: "center", letterSpacing: "0.05em" }}>
          © 2026 Entrealm · Espace artiste
        </p>
      </footer>
    </div>
  );
}
