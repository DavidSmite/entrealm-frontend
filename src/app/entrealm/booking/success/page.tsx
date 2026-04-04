"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { Cormorant_Garamond, Cinzel } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

interface BookingInfo {
  artistName: string;
  artistSlug: string;
  serviceName: string;
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [booking, setBooking] = useState<BookingInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      return;
    }

    fetch(`${API}/api/entrealm/booking/session/${sessionId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data) setBooking(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [sessionId]);

  return (
    <div
      className={cormorant.className}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0906",
        color: "#f5ede0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* Ligne décorative */}
        <div
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "#c9a84c",
            margin: "0 auto 2rem",
          }}
        />

        {/* Titre */}
        <h1
          className={cinzel.className}
          style={{
            fontSize: "1.6rem",
            fontWeight: 400,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "#c9a84c",
            marginBottom: "1.5rem",
          }}
        >
          Réservation confirmée
        </h1>

        {/* Message principal */}
        <p
          style={{
            fontSize: "1.15rem",
            lineHeight: 1.7,
            color: "#f5ede0",
            marginBottom: "2rem",
          }}
        >
          Votre réservation est confirmée.
          <br />
          Un email de confirmation vous a été envoyé.
        </p>

        {/* Détails si disponibles */}
        {loading && (
          <p style={{ color: "#777", fontSize: "0.95rem" }}>
            Chargement des détails...
          </p>
        )}

        {!loading && booking && (
          <div
            style={{
              border: "1px solid rgba(201, 168, 76, 0.25)",
              borderRadius: "4px",
              padding: "1.5rem",
              marginBottom: "2.5rem",
            }}
          >
            <p
              className={cinzel.className}
              style={{
                fontSize: "1rem",
                letterSpacing: "0.08em",
                color: "#c9a84c",
                marginBottom: "0.5rem",
              }}
            >
              {booking.artistName}
            </p>
            <p style={{ fontSize: "1.05rem", color: "#d5cdc0" }}>
              {booking.serviceName}
            </p>
          </div>
        )}

        {/* Ligne séparatrice */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(201, 168, 76, 0.3)",
            margin: "0 auto 2rem",
          }}
        />

        {/* Bouton retour */}
        <a
          href={
            booking
              ? `/entrealm/artist/${booking.artistSlug}`
              : "/entrealm"
          }
          style={{
            display: "inline-block",
            padding: "0.75rem 2rem",
            border: "1px solid #c9a84c",
            color: "#c9a84c",
            fontSize: "0.85rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
            transition: "all 0.3s ease",
          }}
          className={cinzel.className}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#c9a84c";
            e.currentTarget.style.color = "#0a0906";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#c9a84c";
          }}
        >
          Retour
        </a>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense
      fallback={
        <div
          style={{
            minHeight: "100vh",
            backgroundColor: "#0a0906",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#777",
          }}
        >
          Chargement...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
