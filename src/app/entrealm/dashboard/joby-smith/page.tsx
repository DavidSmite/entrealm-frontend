"use client";

import { useEffect, useState } from "react";
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

const STATUS_STYLES: Record<string, { bg: string; color: string; label: string }> = {
  paid: { bg: "rgba(34,197,94,0.15)", color: "#22c55e", label: "Payé" },
  pending: { bg: "rgba(234,179,8,0.15)", color: "#eab308", label: "En attente" },
  cancelled: { bg: "rgba(239,68,68,0.15)", color: "#ef4444", label: "Annulé" },
  refunded: { bg: "rgba(168,162,158,0.15)", color: "#a8a29e", label: "Remboursé" },
};

function formatEur(cents: number) {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function JobySmithDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${API}/api/entrealm/dashboard/joby-smith`,
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error("Erreur chargement dashboard");
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Erreur inconnue");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div
        className={cormorant.className}
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0906",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#777",
          fontSize: "1.1rem",
        }}
      >
        Chargement du dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div
        className={cormorant.className}
        style={{
          minHeight: "100vh",
          backgroundColor: "#0a0906",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ef4444",
          fontSize: "1.1rem",
        }}
      >
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
    <div
      className={cormorant.className}
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0906",
        color: "#f5ede0",
        padding: "2.5rem 1.5rem",
      }}
    >
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              width: "60px",
              height: "1px",
              backgroundColor: "#c9a84c",
              margin: "0 auto 1.5rem",
            }}
          />
          <h1
            className={cinzel.className}
            style={{
              fontSize: "1.5rem",
              fontWeight: 400,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "0.4rem",
            }}
          >
            Dashboard — Joby Smith
          </h1>
          <p style={{ color: "#777", fontSize: "0.95rem" }}>
            Vue d&#39;ensemble de votre activité ENTREALM
          </p>
        </div>

        {/* KPIs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "1rem",
            marginBottom: "2.5rem",
          }}
        >
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              style={{
                border: "1px solid rgba(201, 168, 76, 0.25)",
                borderRadius: "4px",
                padding: "1.25rem",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#777",
                  marginBottom: "0.5rem",
                }}
              >
                {kpi.label}
              </p>
              <p
                className={cinzel.className}
                style={{
                  fontSize: "1.4rem",
                  color: "#c9a84c",
                  fontWeight: 400,
                }}
              >
                {kpi.value}
              </p>
            </div>
          ))}
        </div>

        {/* Réservations récentes */}
        <div>
          <h2
            className={cinzel.className}
            style={{
              fontSize: "1rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#c9a84c",
              marginBottom: "1rem",
            }}
          >
            Réservations récentes
          </h2>

          {data.bookings.length === 0 ? (
            <p style={{ color: "#777", fontSize: "0.95rem" }}>
              Aucune réservation pour le moment.
            </p>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.95rem",
                }}
              >
                <thead>
                  <tr
                    style={{
                      borderBottom: "1px solid rgba(201, 168, 76, 0.25)",
                    }}
                  >
                    {["Date", "Client", "Service", "Montant", "Statut"].map(
                      (h) => (
                        <th
                          key={h}
                          className={cinzel.className}
                          style={{
                            textAlign: "left",
                            padding: "0.75rem 0.5rem",
                            fontSize: "0.75rem",
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                            color: "#777",
                            fontWeight: 400,
                          }}
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {data.bookings.map((b) => {
                    const st = STATUS_STYLES[b.status] || STATUS_STYLES.pending;
                    return (
                      <tr
                        key={b._id}
                        style={{
                          borderBottom:
                            "1px solid rgba(201, 168, 76, 0.1)",
                        }}
                      >
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          {formatDate(b.createdAt)}
                        </td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          {b.customerName}
                        </td>
                        <td
                          style={{
                            padding: "0.75rem 0.5rem",
                            color: "#d5cdc0",
                          }}
                        >
                          {b.serviceId}
                        </td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          {b.artistRevenue
                            ? formatEur(b.artistRevenue)
                            : "—"}
                        </td>
                        <td style={{ padding: "0.75rem 0.5rem" }}>
                          <span
                            style={{
                              display: "inline-block",
                              padding: "0.2rem 0.6rem",
                              borderRadius: "3px",
                              fontSize: "0.8rem",
                              backgroundColor: st.bg,
                              color: st.color,
                            }}
                          >
                            {st.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer line */}
        <div
          style={{
            width: "40px",
            height: "1px",
            backgroundColor: "rgba(201, 168, 76, 0.3)",
            margin: "2.5rem auto 0",
          }}
        />
      </div>
    </div>
  );
}
