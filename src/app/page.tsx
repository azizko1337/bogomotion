import Image from "next/image";
import { Button } from "@/components/ui/button";

function Index() {
  return (
    <main className="flex flex-col items-center space-x-7 w-full text-center">
      <div className="p-5 content-center text-white rounded-[20px] w-96 h-96 shadow-2xl">
        <h1 className="text-black text-7xl mb-4 font-semibold">EMOCJE</h1>
        <a className="text-xl text-white">
          Czy jesteś pewny swoich zdolności rozpoznawania emocji?
          <br />
          Przeprowadź test diagnostyczny aby się przekonać
        </a>
        <div className="text-xl p-5">
          <Button className="m-4 hover:translate-y-[-1px]">KONCEPT</Button>
          <Button className="m-4 hover:translate-y-[-1px]">O EMOCJACH</Button>
        </div>
      </div>
    </main>
  );
}

export default Index;
