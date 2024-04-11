import Image from "next/image";

function Loading() {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="animate-spin relative w-[80px] h-[80px]">
        <Image fill alt="BOGOLOGO" src="/logo.png" />
      </div>
      <p className="text-center text-lg font-semibold text-stone-500">
        Ładowanie...
      </p>
    </div>
  );
}

export default Loading;
