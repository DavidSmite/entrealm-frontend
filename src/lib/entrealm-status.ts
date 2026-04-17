export type EntrealmStatus = "actif" | "suspendu" | "archive";
export type EntrealmPlan = "vitrine" | "scene" | "ambassadeur" | null;

export const STATUS_STYLES: Record<EntrealmStatus, { bg: string; color: string; label: string }> = {
  actif:    { bg: "rgba(100,200,100,0.1)", color: "#6dc96d", label: "Actif" },
  suspendu: { bg: "rgba(230,195,100,0.1)", color: "#e6c364", label: "Suspendu" },
  archive:  { bg: "rgba(200,100,100,0.1)", color: "#d06060", label: "Archivé" },
};

export const PLAN_LABELS: Record<string, string> = {
  vitrine: "Vitrine (24\u20ac/mois)",
  scene: "Sc\u00e8ne (44\u20ac/mois)",
  ambassadeur: "Ambassadeur",
};

export function getStatus(a: { status?: string; isActive?: boolean }): EntrealmStatus {
  if (a.status === "actif" || a.status === "suspendu" || a.status === "archive") {
    return a.status;
  }
  return a.isActive ? "actif" : "archive";
}

export function formatEuros(centimes: number): string {
  return (centimes / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
}
