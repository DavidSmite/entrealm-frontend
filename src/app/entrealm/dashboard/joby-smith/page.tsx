"use client";

import { useEffect, useState } from "react";
import { Noto_Serif, Manrope } from "next/font/google";

const notoSerif = Noto_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface Booking {
  _id: string;
  customerName: string;
  serviceId: string;
  amountTotal: number;
  artistRevenue: number;
  status: string;
  type: string;
  createdAt: string;
}

interface DashboardData {
  totalBookings: number;
  totalRevenue: number;
  pendingBookings: number;
  monthRevenue: number;
  bookings: Booking[];
}

interface Service {
  _id: string;
  title: string;
  description?: string;
  price: number | null;
  unit?: string;
  category?: string;
  isActive: boolean;
}

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  paid: { bg: "rgba(34,197,94,0.15)", color: "#22c55e", label: "Payé" },
  pending: { bg: "rgba(234,179,8,0.15)", color: "#eab308", label: "En attente" },
  cancelled: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", label: "Annulé" },
  refunded: { bg: "rgba(168,162,158,0.15)", color: "#a8a29e", label: "Remboursé" },
};

const EMPTY_FORM = { title: "", description: "", price: "", unit: "", category: "" };

function formatEur(cents: number) {
  return (cents / 100).toLocaleString("fr-FR", { style: "currency", currency: "EUR" });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.6rem 0.8rem",
  background: "#1a1610",
  border: "1px solid rgba(201,168,76,0.2)",
  borderRadius: "2px",
  color: "#f5ede0",
  fontSize: "0.85rem",
  outline: "none",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "#777",
  display: "block",
  marginBottom: "0.3rem",
};

const smallBtnStyle: React.CSSProperties = {
  padding: "0.4rem 1rem",
  border: "1px solid rgba(201,168,76,0.3)",
  background: "transparent",
  color: "#c9a84c",
  fontSize: "0.65rem",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  cursor: "pointer",
  transition: "all .3s",
};

export default function JobySmithDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(() => {
    if (typeof window !== "undefined") return localStorage.getItem("entrealm_profile_image");
    return null;
  });
  const [uploading, setUploading] = useState(false);
  const [tab, setTab] = useState<"reservations" | "services" | "profil">("reservations");
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [profileForm, setProfileForm] = useState({ tagline: "", bio: "", theme: "dark", instagram: "", facebook: "", youtube: "", website: "" });
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API}/api/entrealm/dashboard/joby-smith`, { cache: "no-store" });
        if (!res.ok) throw new Error("Erreur chargement dashboard");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    // Charger la photo de profil au montage
    const token = localStorage.getItem("entrealm_token");
    if (token) {
      fetch(`${API}/api/entrealm/artist/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.ok ? r.json() : null)
        .then((json) => {
          if (!cancelled && json?.profileImage) {
            setProfileImage(json.profileImage);
            localStorage.setItem("entrealm_profile_image", json.profileImage);
          }
        })
        .catch(() => {});
    }

    return () => { cancelled = true; };
  }, []);

  function getToken() {
    return localStorage.getItem("entrealm_token") || "";
  }

  async function loadServices() {
    try {
      const res = await fetch(`${API}/api/entrealm/artist/services`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const json = await res.json();
        setServices(json.filter((s: Service) => s.isActive));
        setServicesLoaded(true);
      }
    } catch { /* ignore */ }
  }

  async function loadProfile() {
    try {
      const res = await fetch(`${API}/api/entrealm/artist/profile`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      });
      if (res.ok) {
        const json = await res.json();
        setProfileForm({
          tagline: json.tagline || "",
          bio: json.bio || "",
          theme: json.theme || "dark",
          instagram: json.socialLinks?.instagram || "",
          facebook: json.socialLinks?.facebook || "",
          youtube: json.socialLinks?.youtube || "",
          website: json.socialLinks?.website || "",
        });
        if (json.profileImage) setProfileImage(json.profileImage);
        setProfileLoaded(true);
      }
    } catch { /* ignore */ }
  }

  async function saveProfile() {
    setProfileSaving(true);
    setProfileSuccess(false);
    try {
      const res = await fetch(`${API}/api/entrealm/artist/profile`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` },
        body: JSON.stringify({
          tagline: profileForm.tagline,
          bio: profileForm.bio,
          theme: profileForm.theme,
          socialLinks: {
            instagram: profileForm.instagram,
            facebook: profileForm.facebook,
            youtube: profileForm.youtube,
            website: profileForm.website,
          },
        }),
      });
      if (res.ok) setProfileSuccess(true);
    } catch { /* ignore */ }
    setProfileSaving(false);
  }

  function startEdit(s: Service) {
    setEditingId(s._id);
    setForm({
      title: s.title,
      description: s.description || "",
      price: s.price != null ? String(s.price / 100) : "",
      unit: s.unit || "",
      category: s.category || "",
    });
    setAdding(false);
  }

  function startAdd() {
    setAdding(true);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  function cancelForm() {
    setAdding(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
  }

  async function saveService() {
    const body = {
      title: form.title,
      description: form.description,
      price: form.price ? Math.round(parseFloat(form.price) * 100) : null,
      unit: form.unit,
      category: form.category,
    };
    const headers = { "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` };

    if (adding) {
      await fetch(`${API}/api/entrealm/artist/services`, { method: "POST", headers, body: JSON.stringify(body) });
    } else if (editingId) {
      await fetch(`${API}/api/entrealm/artist/services/${editingId}`, { method: "PUT", headers, body: JSON.stringify(body) });
    }
    cancelForm();
    await loadServices();
  }

  async function deleteService(id: string) {
    await fetch(`${API}/api/entrealm/artist/services/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    });
    await loadServices();
  }

  if (loading) {
    return (
      <div className={manrope.className} style={{ minHeight: "100vh", backgroundColor: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#777", fontSize: "1.1rem" }}>
        Chargement du dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={manrope.className} style={{ minHeight: "100vh", backgroundColor: "#0a0906", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", fontSize: "1.1rem" }}>
        {error || "Impossible de charger les données."}
      </div>
    );
  }

  const kpis = [
    { label: "Total réservations", value: String(data.totalBookings) },
    { label: "Revenus totaux (85%)", value: formatEur(data.totalRevenue) },
    { label: "En attente", value: String(data.pendingBookings) },
    { label: "Ce mois", value: formatEur(data.monthRevenue) },
  ];

  return (
    <div className={manrope.className} style={{ minHeight: "100vh", backgroundColor: "#0a0906", color: "#f5ede0", padding: "2.5rem 1.5rem" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>

        {/* Photo de profil */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ width: "120px", height: "120px", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(201,168,76,0.3)", margin: "0 auto 1.25rem", background: "#1a1610", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {profileImage ? (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={profileImage} alt="Photo de profil" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <span className={notoSerif.className} style={{ fontSize: "2rem", color: "#c9a84c" }}>JS</span>
            )}
          </div>
          <label style={{ display: "inline-block", padding: "0.5rem 1.5rem", border: "1px solid rgba(201,168,76,0.3)", color: "#c9a84c", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: uploading ? "wait" : "pointer", opacity: uploading ? 0.5 : 1, transition: "all .3s" }}>
            {uploading ? "Envoi..." : "Changer la photo"}
            <input type="file" accept="image/*" style={{ display: "none" }} disabled={uploading} onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              setUploading(true);
              try {
                const fd = new FormData();
                fd.append("photo", file);
                const res = await fetch(`${API}/api/entrealm/artist/upload-photo`, { method: "POST", headers: { Authorization: `Bearer ${getToken()}` }, body: fd });
                const json = await res.json();
                if (res.ok && json.profileImage) {
                  setProfileImage(json.profileImage);
                  localStorage.setItem("entrealm_profile_image", json.profileImage);
                }
              } catch { /* */ } finally { setUploading(false); }
            }} />
          </label>
        </div>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ width: "60px", height: "1px", backgroundColor: "#c9a84c", margin: "0 auto 1.5rem" }} />
          <h1 className={notoSerif.className} style={{ fontSize: "1.5rem", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "0.4rem" }}>
            Dashboard — Joby Smith
          </h1>
          <p style={{ color: "#777", fontSize: "0.95rem" }}>Vue d&#39;ensemble de votre activité ENTREALM</p>
        </div>

        {/* KPIs */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {kpis.map((kpi) => (
            <div key={kpi.label} style={{ border: "1px solid rgba(201, 168, 76, 0.25)", borderRadius: "4px", padding: "1.25rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "#777", marginBottom: "0.5rem" }}>{kpi.label}</p>
              <p className={notoSerif.className} style={{ fontSize: "1.4rem", color: "#c9a84c", fontWeight: 400 }}>{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Onglets */}
        <div style={{ display: "flex", gap: "0", marginBottom: "2rem", borderBottom: "1px solid rgba(201,168,76,0.15)" }}>
          {[
            { key: "reservations" as const, label: "Réservations" },
            { key: "services" as const, label: "Services" },
            { key: "profil" as const, label: "Profil" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => {
                setTab(t.key);
                if (t.key === "services" && !servicesLoaded) loadServices();
                if (t.key === "profil" && !profileLoaded) loadProfile();
              }}
              style={{
                padding: "0.75rem 2rem",
                background: "transparent",
                border: "none",
                borderBottom: tab === t.key ? "2px solid #c9a84c" : "2px solid transparent",
                color: tab === t.key ? "#c9a84c" : "#777",
                fontSize: "0.8rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                cursor: "pointer",
                fontWeight: tab === t.key ? 700 : 400,
                transition: "all .3s",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ═══ TAB RÉSERVATIONS ═══ */}
        {tab === "reservations" && (
          <div>
            <h2 className={notoSerif.className} style={{ fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1rem" }}>
              Réservations récentes
            </h2>
            {data.bookings.length === 0 ? (
              <p style={{ color: "#777", fontSize: "0.95rem" }}>Aucune réservation pour le moment.</p>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.95rem" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.25)" }}>
                      {["Date", "Client", "Service", "Montant", "Statut"].map((h) => (
                        <th key={h} className={notoSerif.className} style={{ textAlign: "left", padding: "0.75rem 0.5rem", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#777", fontWeight: 400 }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.bookings.map((b) => {
                      const st = STATUS_STYLES[b.status] || STATUS_STYLES.pending;
                      return (
                        <tr key={b._id} style={{ borderBottom: "1px solid rgba(201, 168, 76, 0.1)" }}>
                          <td style={{ padding: "0.75rem 0.5rem" }}>{formatDate(b.createdAt)}</td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>{b.customerName}</td>
                          <td style={{ padding: "0.75rem 0.5rem", color: "#d5cdc0" }}>{b.serviceId}</td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>{b.artistRevenue ? formatEur(b.artistRevenue) : "—"}</td>
                          <td style={{ padding: "0.75rem 0.5rem" }}>
                            <span style={{ display: "inline-block", padding: "0.2rem 0.6rem", borderRadius: "3px", fontSize: "0.8rem", backgroundColor: st.bg, color: st.color }}>{st.label}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ═══ TAB SERVICES ═══ */}
        {tab === "services" && (
          <div>
            <h2 className={notoSerif.className} style={{ fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.5rem" }}>
              Mes services
            </h2>

            {services.length === 0 && !adding && (
              <p style={{ color: "#777", fontSize: "0.95rem", marginBottom: "1.5rem" }}>Aucun service configuré.</p>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {services.map((s) =>
                editingId === s._id ? (
                  /* ── Formulaire édition ── */
                  <div key={s._id} style={{ border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px", padding: "1.5rem", background: "#0f0d0a" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <span style={labelStyle}>Titre</span>
                        <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                      </div>
                      <div>
                        <span style={labelStyle}>Catégorie</span>
                        <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                      </div>
                      <div>
                        <span style={labelStyle}>Prix (€) — vide = sur devis</span>
                        <input style={inputStyle} type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                      </div>
                      <div>
                        <span style={labelStyle}>Unité</span>
                        <input style={inputStyle} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
                      </div>
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                      <span style={labelStyle}>Description</span>
                      <input style={inputStyle} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                    </div>
                    <div style={{ display: "flex", gap: "0.75rem" }}>
                      <button style={{ ...smallBtnStyle, background: "#c9a84c", color: "#0a0906", border: "none" }} onClick={saveService}>Enregistrer</button>
                      <button style={smallBtnStyle} onClick={cancelForm}>Annuler</button>
                    </div>
                  </div>
                ) : (
                  /* ── Carte service ── */
                  <div key={s._id} style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: "4px", padding: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <p style={{ fontSize: "1rem", color: "#f5ede0", marginBottom: "0.25rem", fontWeight: 600 }}>{s.title}</p>
                      <p style={{ fontSize: "0.8rem", color: "#777" }}>
                        {s.category && <span style={{ color: "#c9a84c", marginRight: "0.75rem" }}>{s.category}</span>}
                        {s.price != null ? `${(s.price / 100).toFixed(0)} €` : "Sur devis"}
                        {s.unit && <span style={{ color: "#555", marginLeft: "0.25rem" }}>/ {s.unit}</span>}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.5rem" }}>
                      <button style={smallBtnStyle} onClick={() => startEdit(s)}>Modifier</button>
                      <button style={{ ...smallBtnStyle, borderColor: "rgba(239,68,68,0.3)", color: "#ef4444" }} onClick={() => deleteService(s._id)}>Supprimer</button>
                    </div>
                  </div>
                )
              )}

              {/* ── Formulaire ajout ── */}
              {adding && (
                <div style={{ border: "1px solid rgba(201,168,76,0.25)", borderRadius: "4px", padding: "1.5rem", background: "#0f0d0a" }}>
                  <p className={notoSerif.className} style={{ fontSize: "0.8rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1rem" }}>Nouveau service</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                    <div>
                      <span style={labelStyle}>Titre</span>
                      <input style={inputStyle} value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
                    </div>
                    <div>
                      <span style={labelStyle}>Catégorie</span>
                      <input style={inputStyle} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                    </div>
                    <div>
                      <span style={labelStyle}>Prix (€) — vide = sur devis</span>
                      <input style={inputStyle} type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
                    </div>
                    <div>
                      <span style={labelStyle}>Unité</span>
                      <input style={inputStyle} value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ marginBottom: "1rem" }}>
                    <span style={labelStyle}>Description</span>
                    <input style={inputStyle} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem" }}>
                    <button style={{ ...smallBtnStyle, background: "#c9a84c", color: "#0a0906", border: "none" }} onClick={saveService}>Ajouter</button>
                    <button style={smallBtnStyle} onClick={cancelForm}>Annuler</button>
                  </div>
                </div>
              )}
            </div>

            {!adding && !editingId && (
              <button
                onClick={startAdd}
                style={{
                  marginTop: "1.5rem",
                  padding: "0.75rem 2rem",
                  border: "1px solid #c9a84c",
                  background: "transparent",
                  color: "#c9a84c",
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                  transition: "all .3s",
                }}
              >
                + Ajouter un service
              </button>
            )}
          </div>
        )}

        {/* ═══ TAB PROFIL ═══ */}
        {tab === "profil" && (
          <div>
            <h2 className={notoSerif.className} style={{ fontSize: "1rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#c9a84c", marginBottom: "1.5rem" }}>
              Mon profil
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", maxWidth: "600px" }}>
              <div>
                <span style={labelStyle}>Tagline</span>
                <input style={inputStyle} value={profileForm.tagline} onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })} placeholder="Ex : Architecte Vocale & Artiste" />
              </div>

              <div>
                <span style={labelStyle}>Bio</span>
                <textarea
                  style={{ ...inputStyle, minHeight: "120px", resize: "vertical" }}
                  value={profileForm.bio}
                  onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                  placeholder="Votre biographie..."
                />
              </div>

              <div>
                <span style={labelStyle}>Thème de ma page publique</span>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.3rem" }}>
                  {[
                    { key: "dark", label: "Sombre" },
                    { key: "light", label: "Claire" },
                  ].map((t) => (
                    <button
                      key={t.key}
                      onClick={() => setProfileForm({ ...profileForm, theme: t.key })}
                      style={{
                        padding: "0.5rem 1.5rem",
                        border: profileForm.theme === t.key ? "1px solid #c9a84c" : "1px solid rgba(201,168,76,0.2)",
                        background: profileForm.theme === t.key ? "rgba(201,168,76,0.15)" : "transparent",
                        color: profileForm.theme === t.key ? "#c9a84c" : "#777",
                        fontSize: "0.75rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        transition: "all .3s",
                      }}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ borderTop: "1px solid rgba(201,168,76,0.1)", paddingTop: "1.25rem", marginTop: "0.5rem" }}>
                <span style={{ ...labelStyle, marginBottom: "1rem", display: "block" }}>Réseaux sociaux</span>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <span style={labelStyle}>Instagram</span>
                    <input style={inputStyle} value={profileForm.instagram} onChange={(e) => setProfileForm({ ...profileForm, instagram: e.target.value })} placeholder="https://instagram.com/..." />
                  </div>
                  <div>
                    <span style={labelStyle}>Facebook</span>
                    <input style={inputStyle} value={profileForm.facebook} onChange={(e) => setProfileForm({ ...profileForm, facebook: e.target.value })} placeholder="https://facebook.com/..." />
                  </div>
                  <div>
                    <span style={labelStyle}>YouTube</span>
                    <input style={inputStyle} value={profileForm.youtube} onChange={(e) => setProfileForm({ ...profileForm, youtube: e.target.value })} placeholder="https://youtube.com/..." />
                  </div>
                  <div>
                    <span style={labelStyle}>Site web</span>
                    <input style={inputStyle} value={profileForm.website} onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })} placeholder="https://..." />
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginTop: "0.5rem" }}>
                <button
                  onClick={saveProfile}
                  disabled={profileSaving}
                  style={{
                    padding: "0.75rem 2rem",
                    background: "linear-gradient(135deg,#e6c364,#c9a84c)",
                    color: "#0a0906",
                    fontSize: "0.75rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    border: "none",
                    cursor: profileSaving ? "wait" : "pointer",
                    opacity: profileSaving ? 0.6 : 1,
                    transition: "opacity .3s",
                  }}
                >
                  {profileSaving ? "Enregistrement..." : "Enregistrer"}
                </button>
                {profileSuccess && (
                  <span style={{ fontSize: "0.85rem", color: "#22c55e" }}>Profil mis à jour</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Footer line */}
        <div style={{ width: "40px", height: "1px", backgroundColor: "rgba(201, 168, 76, 0.3)", margin: "2.5rem auto 0" }} />
      </div>
    </div>
  );
}
