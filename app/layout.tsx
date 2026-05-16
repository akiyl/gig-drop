import type { Metadata } from "next";
import { Syne, DM_Mono, Outfit } from "next/font/google";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../components/theme-provider";
import NavbarWrapper from "@/components/shared/navbar-wrapper";
import Web3Provider from "@/lib/web3-provider";
import { Toaster } from "sonner";
import "./globals.css";
import "../components/home/decentrlance.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--syne",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--mono",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "DecentraLance - Web3 Freelancing Marketplace",
  description: "A decentralized freelancing platform powered by blockchain escrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased font-sans",
        syne.variable,
        dmMono.variable,
        outfit.variable
      )}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{let e=localStorage.getItem("theme")||"light";e==="system"&&(e=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"),document.documentElement.classList.add(e)}catch(e){}`,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Web3Provider>
            <NavbarWrapper />
            {children}
            <Toaster />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
