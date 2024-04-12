import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import ironOptions from "@/lib/ironOptions";

import type Session from "@/types/Session";

async function getIronSessionData() {
  const session = await getIronSession(cookies(), ironOptions);
  return session;
}

async function Index() {
  const session = (await getIronSessionData()) as Session;
  if (!session?.user) session.user = null;
  const { user } = session;

  return (
    <main className="flex justify-start w-full">
      <div className="p-12 text-center content-center text-white rounded-[20px] shadow-2xl bg-opacity-20 backdrop-blur-sm bg-white hover:translate-y-[-5px] hover:shadow-lg">
        <h1 className="text-black text-7xl mb-4 font-medium ">EMOCJE</h1>
        <a className="text-xl text-gray-900">
          Czy jesteś pewny swoich umiejętności rozpoznawania emocji?
          <br />
          Przeprowadź test diagnostyczny aby się przekonać.
        </a>
        <div className="flex flex-col text-xl p-3 mt-5">
          <Link href="/concept" legacyBehavior passHref>
            <div className="ml-40 w-2/5 h-[40px] bg-gray-900 rounded-xl pt-1.5 hover:translate-y-[-1px] hover:bg-gray-800 hover:cursor-pointer">
              KONCEPT
            </div>
          </Link>

          {user ? (
            <Link href="/session" legacyBehavior passHref>
              <div className="font-bold tracking-widest mt-6 text-lg w-full h-[40px] bg-gray-900 rounded-xl pt-1.5 hover:translate-y-[-1px] hover:bg-gray-800 hover:cursor-pointer">
                ZACZNIJ TRENING!
              </div>
            </Link>
          ) : (
            <Link href="/auth/register" legacyBehavior passHref>
              <div className="font-bold tracking-widest mt-6 text-lg w-full h-[40px] bg-gray-900 rounded-xl pt-1.5 hover:translate-y-[-1px] hover:bg-gray-800 hover:cursor-pointer">
                ZAŁÓŻ KONTO, ABY SIĘ SPRAWDZIĆ!
              </div>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}

export default Index;
