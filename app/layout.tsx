import type { ReactNode } from "react";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: "Marcellin Fougang Lele — Senior Software Engineer",
  description:
    "Marcellin Fougang Lele — Senior Software Engineer specializing in Applied AI & DevOps. Fullstack development with TypeScript, React/Next.js, NestJS. Based in Cameroon, remote-first.",
  metadataBase: new URL("https://marcellin.dev"),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable}`}>
      <body className="bg-ivory text-forest-dark font-body antialiased">
        {children}
      </body>
    </html>
  );
}
