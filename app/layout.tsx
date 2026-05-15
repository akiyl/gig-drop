import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "../components/theme-provider";
import Navbar from "@/components/navbar";
import Web3Provider from "@/lib/web3-provider";
import { Toaster } from "sonner";
import "./globals.css";

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
      className={cn("h-full antialiased font-sans")}
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
            <Navbar />
            {children}
            <Toaster />
          </Web3Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}
