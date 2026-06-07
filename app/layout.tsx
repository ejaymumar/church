import type { Metadata } from "next";
import "@/styles/index.css";

export const metadata: Metadata = {
  title: "Evangelical Community Church | Website POC",
  description:
    "Evangelical Community Church — a self-hosted church website and member management system.",
  icons: {
    icon: "/ecc_logo.png",
    apple: "/ecc_logo.png",
  },
  // Demo / proof-of-concept site — keep it out of search indexes.
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-background text-foreground"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {children}
      </body>
    </html>
  );
}
