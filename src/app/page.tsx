import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

function Index() {
  return (
    <main className="flex flex-col items-center justify-start space-x-7 w-full text-center">
      <div className="p-2 content-center text-white rounded-[20px] w-96 h-96 shadow-2xl bg-opacity-20 backdrop-blur-sm bg-white">
        <h1 className="text-black text-7xl mb-4 font-medium">EMOCJE</h1>
        <a className="text-xl text-gray-900">
          Czy jesteś pewny autentyczności kaset z portierni?
          <br />
          Przeprowadź test diagnostyczny aby się przekonać.
        </a>
        <div className="flex flex-col text-xl p-3 mt-5">
          <div className="ml-24 w-2/5 h-[40px] bg-gray-900 rounded-xl pt-1.5 hover:translate-y-[-1px] hover:bg-gray-800 hover:cursor-pointer">
            <Link href="/concept" legacyBehavior passHref>
              KONCEPT
            </Link>
          </div>
          <div className="font-bold tracking-widest mt-6 text-lg w-full h-[40px] bg-gray-900 rounded-xl pt-1.5 hover:translate-y-[-1px] hover:bg-gray-800 hover:cursor-pointer">
            <Link href="/concept" legacyBehavior passHref>
              ZACZNIJ TRENING!
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Index;
