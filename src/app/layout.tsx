import type { Metadata } from "next";

import { Inter as FontSans } from "next/font/google";
import "@/styles/globals.css";

import { cn } from "@/lib/utils";

import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import ironOptions from "@/lib/ironOptions";

import type FrontendUser from "@/types/FrontendUser";
import imageSrc from "/background.png";
import type Session from "@/types/Session";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Bogomotion",
  description:
    "Przetestuj i wzmocnij umiejętność rozpoznawania emocji z Bogomotion.",
};

async function getIronSessionData() {
  const session = await getIronSession(cookies(), ironOptions);
  return session;
}

async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = (await getIronSessionData()) as Session;
  if (!session?.user) session.user = null;
  const { user } = session;

  console.log(user);

  return (
    <html lang="pl" suppressHydrationWarning>
      <body
        className={cn(
          " min-h-screen bg-orange-200 font-sans antialiased",
          fontSans.variable
        )}
      >
        {" "}
        <div className="bg-main-bg bg-right-bottom bg-no-repeat">
          <NavBar user={user} />
          <div className=" max-w-screen-xl m-auto py-4 min-h-[84vh] flex justify-center items-center">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

export default Layout;
