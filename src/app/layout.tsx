import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";

import { cn } from "@/lib/utils";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import type FrontUser from "@/types/FrontUser";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bogomotion",
  description:
    "Przetestuj i wzmocnij umiejętność rozpoznawania emocji z Bogomotion.",
};

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user: FrontUser = null;

  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <NavBar user={user} />
        <div className="max-w-screen-xl m-auto py-4 min-h-[80vh] flex justify-center items-center">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}

export default Layout;
