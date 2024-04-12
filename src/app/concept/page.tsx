import Link from "next/link";

function Concept() {
  return (
    <div className="ml-[-150px] h-[600px] w-full content-center text-center">
      <div className="w-3/5 h-[300px] backdrop-blur-sm bg-white bg-opacity-30 rounded-2xl shadow-xl font-bold pt-10">
        <h2 className="mb-3 text-5xl font-bold"> KONCEPT </h2>
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
      </div>
      <div className="pt-2.5 text-center text-white ml-[250px] mt-2 h-[45px] w-60 bg-gray-900 rounded-xl hover:cursor-pointer font-bold hover:translate-y-[-1px] hover:bg-gray-800">
        <Link
          href="https://beatakaczor.pl/badania-na-temat-emocji-i-zmyslow/"
          legacyBehavior
          passHref
        >
          <a target="_blank">WIECEJ O EMOCJACH</a>
        </Link>
      </div>
    </div>
  );
}
export default Concept;
