function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="flex max-w-xl m-auto">
        <div className="w-6/12">
          <h3>ROZPOZNAJ SWOJE EMOCJE!</h3>
          <h4>Projekt na Hackemotion</h4>
          <p>Pierwszy hackaton organizowany na Uniwersytecie Śląskim. </p>
        </div>
        <div className="w-6/12">
          <h5>Autorzy: </h5>
          <ul>
            <li>Antoni Załupka</li>
            <li>Dawid Brożek</li>
            <li>Szymon Czarnecki</li>
            <li>Stanisław Gądek</li>
            <li>Dominik Trebisz</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
