import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ENTREALM",
  description: "ENTREALM — Réservation artistes",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-[#0a0906] text-[#f5ede0] antialiased">
        {children}
      </body>
    </html>
  );
}
