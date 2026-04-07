"use client";

import { Noto_Serif, Manrope } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const notoSerif = Noto_Serif({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const API = "https://turnkey-backend-8y0i.onrender.com";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir tous les champs");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`${API}/api/entrealm/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Erreur ${res.status}`);
      localStorage.setItem("entrealm_token", data.token);
      localStorage.setItem("entrealm_artist", JSON.stringify({ slug: data.artistSlug, name: data.artistName }));
      router.push(`/entrealm/dashboard/${data.artistSlug}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur de connexion");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={manrope.className} style={{ background: "#0a0906", color: "#e7e2db", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "100%", maxWidth: "420px", padding: "2rem" }}>

        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <Link href="/entrealm" className={notoSerif.className} style={{ fontSize: "0.85rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#e7e2db", textDecoration: "none" }}>
            Entrealm
          </Link>
        </div>

        <h1 className={notoSerif.className} style={{ fontSize: "1.8rem", fontWeight: 400, color: "#e7e2db", textAlign: "center", marginBottom: "0.5rem" }}>
          Espace artiste
        </h1>
        <p style={{ fontSize: "0.85rem", color: "#99907e", textAlign: "center", marginBottom: "2.5rem" }}>
          Connectez-vous à votre tableau de bord
        </p>

        {error && (
          <div style={{ padding: "0.75rem 1rem", marginBottom: "1.5rem", background: "rgba(255,180,171,0.1)", border: "1px solid rgba(255,180,171,0.3)", color: "#ffb4ab", fontSize: "0.85rem" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.5rem", fontWeight: 700 }}>
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="artiste@entrealm.com"
            style={{ background: "#1d1b17", border: "1px solid #4d4637", color: "#e7e2db", padding: "0.75rem 1rem", width: "100%", marginBottom: "1.5rem", fontSize: "0.9rem", outline: "none" }}
          />

          <label style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", marginBottom: "0.5rem", fontWeight: 700 }}>
            Mot de passe
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            style={{ background: "#1d1b17", border: "1px solid #4d4637", color: "#e7e2db", padding: "0.75rem 1rem", width: "100%", marginBottom: "2rem", fontSize: "0.9rem", outline: "none" }}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.85rem",
              background: loading ? "#99907e" : "linear-gradient(135deg,#e6c364,#c9a84c)",
              color: "#0a0906",
              fontSize: "0.7rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              fontWeight: 700,
              border: "none",
              cursor: loading ? "wait" : "pointer",
              marginBottom: "1.5rem",
            }}
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p style={{ textAlign: "center" }}>
          <a
            href="mailto:contact@entrealm.com?subject=Mot de passe oublié"
            style={{ fontSize: "0.75rem", color: "#99907e", textDecoration: "none", transition: "color .3s" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#e6c364")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#99907e")}
          >
            Mot de passe oublié ?
          </a>
        </p>
      </div>
    </div>
  );
}
