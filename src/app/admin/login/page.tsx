"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cinzel, Manrope } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "700"] });

const API = "https://turnkey-backend-8y0i.onrender.com";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/entrealm/admin/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erreur de connexion");
        setLoading(false);
        return;
      }

      localStorage.setItem("entrealm_admin_token", data.token);
      localStorage.setItem("entrealm_admin_name", data.name);
      router.replace("/admin/dashboard");
    } catch {
      setError("Impossible de contacter le serveur");
      setLoading(false);
    }
  }

  return (
    <div
      className={manrope.className}
      style={{
        minHeight: "100vh",
        background: "#0a0906",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: "400px",
          border: "1px solid rgba(230,195,100,0.15)",
          borderRadius: "4px",
          padding: "3rem 2.5rem",
          background: "#0f0d0a",
        }}
      >
        <h1
          className={cinzel.className}
          style={{
            fontSize: "1.2rem",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#e6c364",
            textAlign: "center",
            marginBottom: "2.5rem",
          }}
        >
          Admin ENTREALM
        </h1>

        <label style={{ display: "block", marginBottom: "1.5rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", display: "block", marginBottom: "0.5rem" }}>
            Email
          </span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "#1a1610",
              border: "1px solid rgba(230,195,100,0.2)",
              borderRadius: "2px",
              color: "#f5ede0",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </label>

        <label style={{ display: "block", marginBottom: "2rem" }}>
          <span style={{ fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "#99907e", display: "block", marginBottom: "0.5rem" }}>
            Mot de passe
          </span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: "#1a1610",
              border: "1px solid rgba(230,195,100,0.2)",
              borderRadius: "2px",
              color: "#f5ede0",
              fontSize: "0.9rem",
              outline: "none",
            }}
          />
        </label>

        {error && (
          <p style={{ color: "#e05555", fontSize: "0.85rem", marginBottom: "1rem", textAlign: "center" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "0.85rem",
            background: "linear-gradient(135deg,#e6c364,#c9a84c)",
            color: "#0a0906",
            fontSize: "0.75rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 700,
            border: "none",
            cursor: loading ? "wait" : "pointer",
            opacity: loading ? 0.6 : 1,
            transition: "opacity .3s",
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}
