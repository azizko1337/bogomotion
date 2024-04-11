import * as React from "react";

interface LogoProps {
  src: string;
  alt: string;
}

interface SocialIconProps {
  src: string;
  alt: string;
}

const SocialIcon: React.FC<SocialIconProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="shrink-0 aspect-square w-[30px]"
  />
);

const categories = [
  "NEGOCIO",
  "MODA",
  "SOSTENIBILIDAD",
  "ENTRETENIMIENTO",
  "SOCIAL",
  "HYPE",
  "TECH",
  "CULTURA",
];

const teamMembers = [
  "ANTONI ZAŁUPKA",
  "DAWID BROŻEK",
  "SZYMON CZARNECKI",
  "STANISŁAW GĄDEK",
  "DOMINIK TREBISZ",
];

const MyComponent: React.FC = () => {
  return (
    <div className="flex flex-col justify-center bg-white">
      <div className="flex flex-col pt-0.5 w-full bg-white max-md:max-w-full">
        <header className="flex flex-col -mt-px w-full bg-stone-400 max-md:mt-10 max-md:max-w-full">
          <div className="flex flex-col items-center px-5 pt-6 w-full bg-stone-400 max-md:max-w-full">
            <p className="text-sm font-semibold text-center text-white w-[1137px] max-md:max-w-full">
              Strona BOGOMOTION pomaga rozpoznawać emocje będąc interaktywną
              platformą
              <br />
              która oferuje różnego rodzaju testy, gry czy quizy.
              <br />
              Dzięki różnorodnym narzędziom i wskazówkom użytkownicy
              <br />
              mogą poprawić swoją inteligencję emocjonalną oraz lepiej radzić
              sobie w relacjach z innymi.
            </p>
            <nav className="flex gap-5 justify-between mt-5 max-w-full text-xl font-bold text-white whitespace-nowrap w-[1173px] max-md:flex-wrap">
              {categories.map((category) => (
                <div key={category}>{category}</div>
              ))}
            </nav>
            <footer className="flex gap-5 justify-between self-stretch px-8 pt-2 pb-5 mt-3.5 w-full bg-stone-400 max-md:flex-wrap max-md:px-5 max-md:max-w-full">
              <div className="flex flex-col">
                <div className="flex gap-5 justify-between self-center">
                  <SocialIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/23b19e7fec93d0e3542bad1a5e08cac5d048e1460bb9a22b73f06d1785d5aeb4?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
                    alt="Social media icon 1"
                  />
                  <SocialIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/2b6946b06d71075ca5512fe049861a461cd924949dc9f1cf9e5a1b7d26d9fb5d?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
                    alt="Social media icon 2"
                  />
                  <SocialIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/feeadca118b25df11857bd9947c47c8195b26f77e577e5cae822d4c608f79f89?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
                    alt="Social media icon 3"
                  />
                  <SocialIcon
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/3bc221f120df3d4350b850b93419a899c4db2c80579575df8c5e6a9b666c07a1?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
                    alt="Social media icon 4"
                  />
                </div>
                <p className="mt-1.5 text-sm font-semibold text-center text-white">
                  WSZYSTKIE PRAWA ZASTRZEŻONE 2024 BOGOMOTION®.
                </p>
              </div>
              <div className="flex gap-5 justify-between self-end mt-9 text-xs font-bold text-white max-md:flex-wrap">
                {teamMembers.map((member) => (
                  <div key={member}>{member}</div>
                ))}
              </div>
            </footer>
          </div>
        </header>
      </div>
    </div>
  );
};

export default MyComponent;
