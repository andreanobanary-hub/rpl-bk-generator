import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Generator RPL BK - Deep Learning & POP BK",
  description: "Aplikasi penyusun RPL BK Kurikulum Merdeka otomatis",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="antialiased bg-slate-100">{children}</body>
    </html>
  );
}
