"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Manrope } from "next/font/google";
import Link from "next/link";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const API = "https://turnkey-backend-8y0i.onrender.com";

interface Artiste {
  _id: string;
  slug: string;
  name: string;
  email: string;
  plan?: string;
  isActive: boolean;
  createdAt: string;
}

export default function AdminArtistesPage() {
  const router = useRouter();
  const [artistes, setArtistes] = useState<Artiste[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("entrealm_admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    fetch(`${API}/api/entrealm/admin/artistes`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => {
        if (!r.ok) throw new Error("Unauthorized");
        return r.json();
      })
      .then((data) => {
        setArtistes(data);
        setLoading(false);
      })
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

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#99907e" }}>
        Chargement...
      </div>
    );
  }

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
          style={{ padding: "0.6rem 0.8rem", fontSize: "0.8rem", color: "#99907e", textDecoration: "none", borderRadius: "2px", transition: "color .3s" }}
        >
          Dashboard
        </Link>
        <Link
          href="/admin/artistes"
          style={{ padding: "0.6rem 0.8rem", fontSize: "0.8rem", color: "#e6c364", textDecoration: "none", background: "rgba(230,195,100,0.08)", borderRadius: "2px" }}
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
      <main style={{ flex: 1, padding: "3rem", overflow: "auto" }}>
        <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.5rem", fontWeight: 600 }}>
          Gestion
        </p>
        <h1 className={cinzel.className} style={{ fontSize: "1.6rem", fontWeight: 400, color: "#e7e2db", marginBottom: "3rem" }}>
          Artistes
        </h1>

        {artistes.length === 0 ? (
          <p style={{ color: "#99907e" }}>Aucun artiste enregistré.</p>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  {["Nom", "Email", "Plan", "Statut", "Inscription"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "0.75rem 1rem",
                        fontSize: "0.65rem",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "#99907e",
                        borderBottom: "1px solid rgba(230,195,100,0.1)",
                        fontWeight: 600,
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {artistes.map((a) => (
                  <tr key={a._id}>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.9rem", color: "#e7e2db", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                      {a.name}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#99907e", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                      {a.email}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#e6c364", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                      {a.plan || "—"}
                    </td>
                    <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                      <span
                        style={{
                          fontSize: "0.7rem",
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          padding: "0.25rem 0.6rem",
                          borderRadius: "2px",
                          background: a.isActive ? "rgba(100,200,100,0.1)" : "rgba(200,100,100,0.1)",
                          color: a.isActive ? "#6dc96d" : "#d06060",
                        }}
                      >
                        {a.isActive ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td style={{ padding: "0.75rem 1rem", fontSize: "0.85rem", color: "#99907e", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                      {new Date(a.createdAt).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
