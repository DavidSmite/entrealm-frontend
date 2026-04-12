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

function FadeIn({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div
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

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

const DISCIPLINES = [
  "Musique",
  "Chant",
  "Danse",
  "Theatre",
  "Arts visuels",
  "Autre",
];

const PROFIL_TYPES = [
  "Artiste solo",
  "Groupe",
  "Chorale",
  "Ensemble",
  "Autre",
];

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 1rem",
  backgroundColor: "#1d1b17",
  border: "1px solid #4d4637",
  color: "#e7e2db",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.3s ease",
  fontFamily: "inherit",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "#99907e",
  marginBottom: "0.5rem",
  fontWeight: 500,
};

export default function InscriptionPage() {
  const [form, setForm] = useState({
    nomArtistique: "",
    nomComplet: "",
    email: "",
    telephone: "",
    discipline: "",
    typeProfil: "",
    offre: "",
    codeInvitation: "",
    lienTravail: "",
    message: "",
    conditions: false,
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update(field: string, value: string | boolean) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit() {
    if (!form.nomArtistique || !form.nomComplet || !form.email || !form.message) {
      setErrorMsg("Veuillez remplir tous les champs requis.");
      setStatus("error");
      return;
    }
    if (!form.conditions) {
      setErrorMsg("Veuillez accepter les conditions d'utilisation.");
      setStatus("error");
      return;
    }
    if (form.offre === "ambassadeur" && form.codeInvitation !== "SANKOFA2026") {
      setErrorMsg("Code d'invitation invalide.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch(`${API}/api/entrealm/inscription`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setStatus("success");
    } catch {
      setErrorMsg("Une erreur est survenue. Veuillez reessayer.");
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        className={manrope.className}
        style={{
          backgroundColor: "#0a0906",
          color: "#f5ede0",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <FadeIn delay={100}>
          <div>
            <div
              style={{
                width: "60px",
                height: "1px",
                backgroundColor: "#e6c364",
                margin: "0 auto 2rem",
              }}
            />
            <h1
              className={notoSerif.className}
              style={{
                fontSize: "1.5rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                color: "#e6c364",
                marginBottom: "1.5rem",
              }}
            >
              Candidature envoyee
            </h1>
            <p style={{ color: "#999", fontSize: "0.95rem", maxWidth: "440px", lineHeight: 1.7 }}>
              Votre candidature a bien ete recue. Nous vous repondrons sous 48h.
            </p>
          </div>
        </FadeIn>
      </div>
    );
  }

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
            Rejoindre ENTREALM ART
          </h1>
        </FadeIn>
        <FadeIn delay={400}>
          <p style={{ color: "#999", fontSize: "1rem", letterSpacing: "0.04em" }}>
            Votre candidature sera examinee sous 48h
          </p>
        </FadeIn>
      </section>

      {/* Formulaire */}
      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "0 1.5rem 3rem" }}>
        <FadeIn delay={500}>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Nom artistique */}
            <div>
              <label style={labelStyle}>Nom artistique *</label>
              <input
                type="text"
                value={form.nomArtistique}
                onChange={(e) => update("nomArtistique", e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              />
            </div>

            {/* Nom complet */}
            <div>
              <label style={labelStyle}>Nom complet *</label>
              <input
                type="text"
                value={form.nomComplet}
                onChange={(e) => update("nomComplet", e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              />
            </div>

            {/* Email */}
            <div>
              <label style={labelStyle}>Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              />
            </div>

            {/* Telephone */}
            <div>
              <label style={labelStyle}>Telephone</label>
              <input
                type="tel"
                value={form.telephone}
                onChange={(e) => update("telephone", e.target.value)}
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              />
            </div>

            {/* Discipline */}
            <div>
              <label style={labelStyle}>Discipline artistique</label>
              <select
                value={form.discipline}
                onChange={(e) => update("discipline", e.target.value)}
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              >
                <option value="" style={{ backgroundColor: "#1d1b17" }}>Choisir...</option>
                {DISCIPLINES.map((d) => (
                  <option key={d} value={d} style={{ backgroundColor: "#1d1b17" }}>{d}</option>
                ))}
              </select>
            </div>

            {/* Type de profil */}
            <div>
              <label style={labelStyle}>Type de profil</label>
              <select
                value={form.typeProfil}
                onChange={(e) => update("typeProfil", e.target.value)}
                style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              >
                <option value="" style={{ backgroundColor: "#1d1b17" }}>Choisir...</option>
                {PROFIL_TYPES.map((p) => (
                  <option key={p} value={p} style={{ backgroundColor: "#1d1b17" }}>{p}</option>
                ))}
              </select>
            </div>

            {/* Offre choisie */}
            <div>
              <label style={labelStyle}>Offre choisie</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[
                  { value: "vitrine", label: "VITRINE — 24€/mois (14 jours gratuits)" },
                  { value: "scene", label: "SCENE — 44€/mois (14 jours gratuits)" },
                  { value: "ambassadeur", label: "AMBASSADEUR — Sur invitation" },
                ].map((o) => (
                  <label
                    key={o.value}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.75rem",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                      backgroundColor: form.offre === o.value ? "rgba(230, 195, 100, 0.06)" : "#1d1b17",
                      border: form.offre === o.value ? "1px solid #e6c364" : "1px solid #4d4637",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <input
                      type="radio"
                      name="offre"
                      value={o.value}
                      checked={form.offre === o.value}
                      onChange={(e) => update("offre", e.target.value)}
                      style={{ accentColor: "#e6c364" }}
                    />
                    <span style={{ fontSize: "0.88rem", color: form.offre === o.value ? "#e6c364" : "#ccc" }}>
                      {o.label}
                    </span>
                  </label>
                ))}
              </div>
              {form.offre === "ambassadeur" && (
                <p style={{ color: "#999", fontSize: "0.78rem", fontStyle: "italic", marginTop: "0.5rem", lineHeight: 1.6 }}>
                  Abonnement offert sur invitation — commission standard applicable sur les reservations et ventes (8% VITRINE / 10% SCENE)
                </p>
              )}
            </div>

            {/* Code d'invitation (si ambassadeur) */}
            {form.offre === "ambassadeur" && (
              <FadeIn delay={0}>
                <div>
                  <label style={labelStyle}>Code d&apos;invitation *</label>
                  <input
                    type="text"
                    value={form.codeInvitation}
                    onChange={(e) => update("codeInvitation", e.target.value.toUpperCase())}
                    placeholder="Ex: SANKOFA2026"
                    style={{ ...inputStyle, letterSpacing: "0.1em" }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                    onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
                  />
                </div>
              </FadeIn>
            )}

            {/* Lien travail */}
            <div>
              <label style={labelStyle}>Lien vers un exemple de votre travail</label>
              <input
                type="url"
                value={form.lienTravail}
                onChange={(e) => update("lienTravail", e.target.value)}
                placeholder="https://..."
                style={inputStyle}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              />
            </div>

            {/* Message */}
            <div>
              <label style={labelStyle}>Parlez-nous de votre projet artistique *</label>
              <textarea
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={5}
                style={{ ...inputStyle, resize: "vertical" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "#e6c364")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "#4d4637")}
              />
            </div>

            {/* Conditions */}
            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                cursor: "pointer",
                fontSize: "0.85rem",
                color: "#999",
              }}
            >
              <input
                type="checkbox"
                checked={form.conditions}
                onChange={(e) => update("conditions", e.target.checked)}
                style={{ accentColor: "#e6c364", marginTop: "0.15rem" }}
              />
              J&apos;accepte les conditions d&apos;utilisation
            </label>

            {/* Erreur */}
            {status === "error" && (
              <p style={{ color: "#ef4444", fontSize: "0.85rem" }}>{errorMsg}</p>
            )}

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={status === "loading"}
              style={{
                width: "100%",
                padding: "0.9rem",
                backgroundColor: "#e6c364",
                color: "#0a0906",
                border: "none",
                fontSize: "0.8rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 700,
                cursor: status === "loading" ? "wait" : "pointer",
                opacity: status === "loading" ? 0.7 : 1,
                transition: "opacity 0.3s ease",
                fontFamily: "inherit",
              }}
            >
              {status === "loading" ? "Envoi en cours..." : "Envoyer ma candidature"}
            </button>
          </div>
        </FadeIn>
      </section>

      {/* Sankofa Unit */}
      <section style={{ maxWidth: "640px", margin: "0 auto", padding: "1rem 1.5rem 3rem" }}>
        <FadeIn delay={700}>
          <div
            style={{
              backgroundColor: "#1d1b17",
              border: "1px solid rgba(230, 195, 100, 0.2)",
              padding: "2rem",
              borderRadius: "4px",
            }}
          >
            <h3
              className={notoSerif.className}
              style={{
                fontSize: "1.2rem",
                fontWeight: 400,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#e6c364",
                marginBottom: "0.4rem",
              }}
            >
              Sankofa Unit
            </h3>
            <p style={{ color: "#999", fontSize: "0.88rem", marginBottom: "1.2rem", fontStyle: "italic" }}>
              La chorale fondee par Joby Smith — entre Paris et Londres
            </p>
            <p style={{ color: "#ccc", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "1rem" }}>
              Les membres de Sankofa Unit beneficient d&apos;un acces Ambassadeur offert.
              Utilisez votre code d&apos;invitation pour rejoindre ENTREALM ART gratuitement.
            </p>
            <p style={{ color: "#999", fontSize: "0.78rem", fontStyle: "italic", lineHeight: 1.6 }}>
              L&apos;abonnement est offert — les commissions sur reservations et ventes restent applicables dans les conditions standard.
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
        <p style={{ color: "#555", fontSize: "0.75rem", letterSpacing: "0.1em" }}>
          &copy; 2026 ENTREALM ART
        </p>
      </footer>
    </div>
  );
}
