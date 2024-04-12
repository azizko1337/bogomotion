import Link from "next/link";

function Concept() {
  return (
    <div className="ml-[-150px] h-[600px] w-full content-center text-center">
      <h2 className="mr-[650px] mb-12 text-5xl font-bold"> KONCEPT </h2>
      <div className="w-1/2 h-[300px] backdrop-blur-sm bg-white bg-opacity-30 rounded-2xl shadow-xl font-bold pt-8">
        Nauka o emocjach ma na celu zrozumienie oraz wyjaśnienie ich funkcji,{" "}
        <br />
        wywoływania, wyrażania i regulacji. Badanie emocji pomaga lepiej
        zrozumieć <br />
        interakcje międzyludzkie, procesy poznawcze, zachowanie społeczne oraz{" "}
        <br />
        wpływają na zdrowie psychiczne i fizyczne jednostek. Dzięki zgłębianiu
        tego <br />
        obszaru naukowcy oraz praktycy zdobywają niezbędne narzędzia do lepszego{" "}
        <br />
        radzenia sobie z własnymi emocjami oraz wspierania innych w ich
        procesach <br />
        emocjonalnego rozwoju. <br />
        <div className="pt-2.5 text-center text-white ml-[200px] mt-6 h-[45px] w-60 bg-gray-900 rounded-xl hover:cursor-pointer font-bold hover:translate-y-[-1px] hover:bg-gray-800">
          <Link
            href="https://beatakaczor.pl/badania-na-temat-emocji-i-zmyslow/"
            legacyBehavior
            passHref
          >
            WIECEJ O EMOCJACH
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Concept;
