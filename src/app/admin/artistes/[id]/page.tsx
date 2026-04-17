"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Cinzel, Manrope } from "next/font/google";
import {
  getStatus,
  STATUS_STYLES,
  PLAN_LABELS,
  formatEuros,
  type EntrealmStatus,
  type EntrealmPlan,
} from "@/lib/entrealm-status";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const API = "https://turnkey-backend-8y0i.onrender.com";

interface Artist {
  _id: string;
  slug: string;
  name: string;
  email: string;
  bio?: string;
  tagline?: string;
  profileImage?: string;
  theme?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    website?: string;
  };
  services?: {
    _id?: string;
    title: string;
    description?: string;
    price: number;
    unit?: string;
    category?: string;
    isActive: boolean;
  }[];
  plan?: EntrealmPlan;
  status?: EntrealmStatus;
  isActive?: boolean;
  createdAt: string;
  updatedAt?: string;
}

interface Stats {
  nbReservations: number;
  nbReservationsPending: number;
  revenusBrutsCentimes: number;
  revenusBrutsEuros: number;
  commissionEntrealmCentimes: number;
  commissionEntrealmEuros: number;
}

export default function AdminArtisteDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [artist, setArtist] = useState<Artist | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function showToast(type: "success" | "error", message: string) {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  }

  useEffect(() => {
    const token = localStorage.getItem("entrealm_admin_token");
    if (!token) {
      router.replace("/admin/login");
      return;
    }

    const controller = new AbortController();

    fetch(`${API}/api/entrealm/admin/artistes/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    })
      .then((r) => {
        if (r.status === 401 || r.status === 403) {
          localStorage.removeItem("entrealm_admin_token");
          router.replace("/admin/login");
          return null;
        }
        if (r.status === 404) {
          setError("Artiste introuvable");
          return null;
        }
        if (!r.ok) throw new Error(`Erreur ${r.status}`);
        return r.json();
      })
      .then((data) => {
        if (data) {
          setArtist(data.artist);
          setStats(data.stats);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError("Erreur de chargement");
        }
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [id, router]);

  async function patchArtist(updates: Partial<{ status: EntrealmStatus; plan: EntrealmPlan }>) {
    setSaving(true);
    try {
      const token = localStorage.getItem("entrealm_admin_token");
      const res = await fetch(`${API}/api/entrealm/admin/artistes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Erreur ${res.status}`);
      }
      const updated = await res.json();
      setArtist((prev) => (prev ? { ...prev, ...updated } : prev));
      showToast("success", "Modification enregistr\u00e9e");
    } catch (err) {
      showToast("error", err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(newStatus: EntrealmStatus) {
    if (!artist || newStatus === getStatus(artist)) return;
    const currentLabel = STATUS_STYLES[getStatus(artist)].label;
    const newLabel = STATUS_STYLES[newStatus].label;
    const confirmed = window.confirm(
      `Confirmer : changer le statut de ${artist.name} de \u00ab\u202f${currentLabel}\u202f\u00bb vers \u00ab\u202f${newLabel}\u202f\u00bb ?`
    );
    if (!confirmed) return;
    await patchArtist({ status: newStatus });
  }

  async function handlePlanChange(newPlan: EntrealmPlan) {
    if (!artist || newPlan === (artist.plan ?? null)) return;
    const currentLabel = artist.plan ? PLAN_LABELS[artist.plan] || artist.plan : "Aucun";
    const newLabel = newPlan ? PLAN_LABELS[newPlan] || newPlan : "Aucun";
    const confirmed = window.confirm(
      `Confirmer : changer le plan de ${artist.name} de \u00ab\u202f${currentLabel}\u202f\u00bb vers \u00ab\u202f${newLabel}\u202f\u00bb ?`
    );
    if (!confirmed) return;
    await patchArtist({ plan: newPlan });
  }

  function handleLogout() {
    localStorage.removeItem("entrealm_admin_token");
    localStorage.removeItem("entrealm_admin_name");
    router.replace("/admin/login");
  }

  // ── Loading ──
  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#99907e" }}>
        Chargement...
      </div>
    );
  }

  // ── Error ──
  if (error || !artist) {
    return (
      <div className={manrope.className} style={{ minHeight: "100vh", background: "#0a0906", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <p style={{ color: "#d06060", fontSize: "1rem" }}>{error || "Artiste introuvable"}</p>
        <Link href="/admin/artistes" style={{ color: "#e6c364", textDecoration: "underline", fontSize: "0.85rem" }}>
          ← Retour à la liste
        </Link>
      </div>
    );
  }

  const socialEntries = Object.entries(artist.socialLinks || {}).filter(([, v]) => v);
  const socialLabels: Record<string, string> = { instagram: "Instagram", facebook: "Facebook", youtube: "YouTube", website: "Site web" };

  return (
    <div className={manrope.className} style={{ minHeight: "100vh", background: "#0a0906", color: "#e7e2db", display: "flex" }}>

      {/* \u2500\u2500 SIDEBAR \u2500\u2500 */}
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
        <Link href="/admin/dashboard" style={{ padding: "0.6rem 0.8rem", fontSize: "0.8rem", color: "#99907e", textDecoration: "none", borderRadius: "2px", transition: "color .3s" }}>
          Dashboard
        </Link>
        <Link href="/admin/artistes" style={{ padding: "0.6rem 0.8rem", fontSize: "0.8rem", color: "#e6c364", textDecoration: "none", background: "rgba(230,195,100,0.08)", borderRadius: "2px" }}>
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
          D\u00e9connexion
        </button>
      </aside>

      {/* \u2500\u2500 MAIN \u2500\u2500 */}
      <main style={{ flex: 1, padding: "3rem", overflow: "auto", maxWidth: "960px" }}>

        {/* Breadcrumb */}
        <Link href="/admin/artistes" style={{ color: "#99907e", textDecoration: "none", fontSize: "0.8rem", transition: "color .2s" }}>
          ← Retour à la liste
        </Link>

        {/* En-tête artiste */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginTop: "1.5rem", marginBottom: "2.5rem" }}>
          {artist.profileImage ? (
            <img
              src={artist.profileImage}
              alt={artist.name}
              style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(230,195,100,0.2)" }}
            />
          ) : (
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "rgba(230,195,100,0.08)",
                border: "2px solid rgba(230,195,100,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                color: "#e6c364",
                fontWeight: 700,
              }}
            >
              {artist.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2)}
            </div>
          )}
          <div>
            <h1 className={cinzel.className} style={{ fontSize: "2rem", fontWeight: 400, color: "#e7e2db", margin: 0 }}>
              {artist.name}
            </h1>
            {artist.tagline && (
              <p style={{ fontSize: "0.95rem", color: "#99907e", fontStyle: "italic", margin: "0.25rem 0 0" }}>{artist.tagline}</p>
            )}
            <p style={{ fontSize: "0.8rem", color: "#99907e", margin: "0.5rem 0 0" }}>
              @{artist.slug} \u00b7 {artist.email} \u00b7 Inscrit le {new Date(artist.createdAt).toLocaleDateString("fr-FR")}
            </p>
          </div>
        </div>

        {/* Section ACTIONS */}
        <section style={{ border: "1px solid rgba(230,195,100,0.1)", borderRadius: "4px", padding: "1.5rem", marginBottom: "2.5rem", position: "relative" }}>
          <h2 className={cinzel.className} style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.05em", color: "#e7e2db", margin: "0 0 1.25rem" }}>
            Actions admin
          </h2>
          {saving && (
            <span style={{ position: "absolute", top: "1.5rem", right: "1.5rem", fontSize: "0.75rem", color: "#e6c364" }}>
              Enregistrement...
            </span>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            {/* Statut */}
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.5rem", fontWeight: 600 }}>
                Statut
              </label>
              <select
                value={getStatus(artist)}
                disabled={saving}
                onChange={(e) => handleStatusChange(e.target.value as EntrealmStatus)}
                aria-label="Changer le statut de l'artiste"
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  fontSize: "0.85rem",
                  background: "#0a0906",
                  color: "#e7e2db",
                  border: "1px solid rgba(230,195,100,0.2)",
                  borderRadius: "2px",
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.5 : 1,
                }}
              >
                <option value="actif">Actif</option>
                <option value="suspendu">Suspendu</option>
                <option value="archive">Archiv\u00e9</option>
              </select>
            </div>
            {/* Plan */}
            <div>
              <label style={{ display: "block", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.5rem", fontWeight: 600 }}>
                Plan
              </label>
              <select
                value={artist.plan ?? ""}
                disabled={saving}
                onChange={(e) => handlePlanChange(e.target.value === "" ? null : (e.target.value as EntrealmPlan))}
                aria-label="Changer le plan de l'artiste"
                style={{
                  width: "100%",
                  padding: "0.6rem 0.8rem",
                  fontSize: "0.85rem",
                  background: "#0a0906",
                  color: "#e7e2db",
                  border: "1px solid rgba(230,195,100,0.2)",
                  borderRadius: "2px",
                  cursor: saving ? "not-allowed" : "pointer",
                  opacity: saving ? 0.5 : 1,
                }}
              >
                <option value="">\u2014 Aucun</option>
                <option value="vitrine">Vitrine (24\u20ac/mois)</option>
                <option value="scene">Sc\u00e8ne (44\u20ac/mois)</option>
                <option value="ambassadeur">Ambassadeur</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section STATS */}
        {stats && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className={cinzel.className} style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.05em", color: "#e7e2db", margin: "0 0 1.25rem" }}>
              Performance
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>
              <div style={{ background: "#0f0d0a", border: "1px solid rgba(230,195,100,0.1)", borderRadius: "4px", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.75rem", fontWeight: 600 }}>
                  R\u00e9servations pay\u00e9es
                </p>
                <p className={cinzel.className} style={{ fontSize: "1.6rem", color: "#e6c364", fontWeight: 400, margin: 0 }}>
                  {stats.nbReservations}
                </p>
                {stats.nbReservationsPending > 0 && (
                  <p style={{ fontSize: "0.75rem", color: "#99907e", margin: "0.4rem 0 0" }}>
                    + {stats.nbReservationsPending} en attente
                  </p>
                )}
              </div>
              <div style={{ background: "#0f0d0a", border: "1px solid rgba(230,195,100,0.1)", borderRadius: "4px", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.75rem", fontWeight: 600 }}>
                  Revenus bruts
                </p>
                <p className={cinzel.className} style={{ fontSize: "1.6rem", color: "#e6c364", fontWeight: 400, margin: 0 }}>
                  {formatEuros(stats.revenusBrutsCentimes)}
                </p>
              </div>
              <div style={{ background: "#0f0d0a", border: "1px solid rgba(230,195,100,0.1)", borderRadius: "4px", padding: "1.5rem" }}>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.75rem", fontWeight: 600 }}>
                  Commission ENTREALM
                </p>
                <p className={cinzel.className} style={{ fontSize: "1.6rem", color: "#e6c364", fontWeight: 400, margin: 0 }}>
                  {formatEuros(stats.commissionEntrealmCentimes)}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Section BIO */}
        {artist.bio && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className={cinzel.className} style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.05em", color: "#e7e2db", margin: "0 0 1rem" }}>
              Bio
            </h2>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, color: "#e7e2db" }}>{artist.bio}</p>
          </section>
        )}

        {/* Section R\u00c9SEAUX SOCIAUX */}
        {socialEntries.length > 0 && (
          <section style={{ marginBottom: "2.5rem" }}>
            <h2 className={cinzel.className} style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.05em", color: "#e7e2db", margin: "0 0 1rem" }}>
              R\u00e9seaux sociaux
            </h2>
            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
              {socialEntries.map(([key, url]) => (
                <a
                  key={key}
                  href={url as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#e6c364", fontSize: "0.85rem", textDecoration: "none", transition: "opacity .2s" }}
                >
                  {socialLabels[key] || key} ↗
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Section SERVICES */}
        <section style={{ marginBottom: "2.5rem" }}>
          <h2 className={cinzel.className} style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.05em", color: "#e7e2db", margin: "0 0 1.25rem" }}>
            Services ({(artist.services || []).length})
          </h2>
          {(!artist.services || artist.services.length === 0) ? (
            <p style={{ color: "#99907e" }}>Aucun service d\u00e9fini.</p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    {["Titre", "Prix", "Unit\u00e9", "Cat\u00e9gorie", "Statut"].map((h) => (
                      <th
                        key={h}
                        style={{
                          textAlign: "left",
                          padding: "0.6rem 0.8rem",
                          fontSize: "0.6rem",
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
                  {artist.services.map((s) => (
                    <tr key={s._id || s.title}>
                      <td style={{ padding: "0.6rem 0.8rem", fontSize: "0.85rem", color: "#e7e2db", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                        {s.title}
                      </td>
                      <td style={{ padding: "0.6rem 0.8rem", fontSize: "0.85rem", color: "#e6c364", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                        {s.price != null ? formatEuros(s.price) : "Sur devis"}
                      </td>
                      <td style={{ padding: "0.6rem 0.8rem", fontSize: "0.85rem", color: "#99907e", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                        {s.unit || "\u2014"}
                      </td>
                      <td style={{ padding: "0.6rem 0.8rem", fontSize: "0.85rem", color: "#99907e", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                        {s.category || "\u2014"}
                      </td>
                      <td style={{ padding: "0.6rem 0.8rem", borderBottom: "1px solid rgba(230,195,100,0.05)" }}>
                        <span
                          style={{
                            fontSize: "0.65rem",
                            letterSpacing: "0.08em",
                            textTransform: "uppercase",
                            padding: "0.2rem 0.5rem",
                            borderRadius: "2px",
                            background: s.isActive ? "rgba(100,200,100,0.1)" : "rgba(200,100,100,0.1)",
                            color: s.isActive ? "#6dc96d" : "#d06060",
                          }}
                        >
                          {s.isActive ? "Actif" : "Inactif"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: "2rem",
            right: "2rem",
            padding: "1rem 1.5rem",
            borderRadius: "4px",
            background: toast.type === "success" ? "#2d6a2d" : "#8b2020",
            color: "#fff",
            fontSize: "0.85rem",
            zIndex: 9999,
            boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
            animation: "fadeInUp 0.3s ease-out",
          }}
        >
          {toast.message}
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
