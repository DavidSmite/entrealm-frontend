"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Manrope } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const API = "https://turnkey-backend-8y0i.onrender.com";

interface Stats {
  totalArtistes: number;
  totalBookings: number;
  revenusBruts: number;
  commissionEntrealm: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("entrealm_admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }
    setAdminName(localStorage.getItem("entrealm_admin_name") || "Admin");

    fetch(`${API}/api/entrealm/admin/stats`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then(setStats)
      .catch(() => {
        localStorage.removeItem("entrealm_admin_token");
        router.replace("/admin/login");
      });
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("entrealm_admin_token");
    localStorage.removeItem("entrealm_admin_name");
    router.replace("/admin/login");
  }

  if (!stats) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#99907e" }}>
        Chargement...
      </div>
    );
  }

  const cards = [
    { label: "Artistes", value: stats.totalArtistes },
    { label: "Réservations", value: stats.totalBookings },
    { label: "Revenus bruts", value: `${stats.revenusBruts.toLocaleString("fr-FR")} €` },
    { label: "Commission ENTREALM", value: `${stats.commissionEntrealm.toLocaleString("fr-FR")} €` },
  ];

  return (
    <div className={manrope.className} style={{ minHeight: "100vh", background: "#0a0906", color: "#e7e2db", display: "flex" }}>

      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: "220px",
          background: "#0f0d0a",
          borderRight: "1px solid rgba(230,195,100,0.1)",
          padding: "2rem 1.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          flexShrink: 0,
        }}
      >
        <p
          className={cinzel.className}
          style={{ fontSize: "0.75rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e6c364", marginBottom: "2rem" }}
        >
          ENTREALM Admin
        </p>

        <Link
          href="/admin/dashboard"
          style={{ padding: "0.6rem 0.8rem", fontSize: "0.8rem", color: "#e6c364", textDecoration: "none", background: "rgba(230,195,100,0.08)", borderRadius: "2px" }}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/artistes"
          style={{ padding: "0.6rem 0.8rem", fontSize: "0.8rem", color: "#99907e", textDecoration: "none", borderRadius: "2px", transition: "color .3s" }}
        >
          Artistes
        </Link>
        <button
          onClick={handleLogout}
          style={{
            marginTop: "auto",
            padding: "0.6rem 0.8rem",
            fontSize: "0.75rem",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "#99907e",
            background: "transparent",
            border: "1px solid rgba(230,195,100,0.2)",
            cursor: "pointer",
            borderRadius: "2px",
            transition: "all .3s",
          }}
        >
          Déconnexion
        </button>
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, padding: "3rem" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.5rem", fontWeight: 600 }}>
          Tableau de bord
        </p>
        <h1 className={cinzel.className} style={{ fontSize: "1.6rem", fontWeight: 400, color: "#e7e2db", marginBottom: "3rem" }}>
          Bienvenue, {adminName}
        </h1>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {cards.map((c) => (
            <div
              key={c.label}
              style={{
                padding: "2rem 1.5rem",
                background: "#1a1610",
                border: "1px solid rgba(230,195,100,0.1)",
                borderRadius: "4px",
              }}
            >
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.75rem", fontWeight: 600 }}>
                {c.label}
              </p>
              <p className={cinzel.className} style={{ fontSize: "1.6rem", color: "#e6c364", fontWeight: 400 }}>
                {c.value}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
