import * as React from "react";

interface PersonImageProps {
  src: string;
  alt: string;
}

const PersonImage: React.FC<PersonImageProps> = ({ src, alt }) => (
  <img
    loading="lazy"
    src={src}
    alt={alt}
    className="shrink-0 aspect-square w-[30px]"
  />
);

interface PersonNameProps {
  name: string;
}

const PersonName: React.FC<PersonNameProps> = ({ name }) => (
  <div className="text-xs font-bold text-white">{name}</div>
);

const people = [
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/aa3cf408f51310df153f5ba14ba43d0adbfed67e814ec84b92143159fcf942cb?apiKey=cd16d52c23e84e78897130ca5fae7b62&",
    alt: "Antoni Załupka",
    name: "ANTONI ZAŁUPKA",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/777928648d6551a0e79ebca51ef092056203821773018cf848553552ffcc285b?apiKey=cd16d52c23e84e78897130ca5fae7b62&",
    alt: "Dawid Brożek",
    name: "DAWID BROŻEK",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/141e0d3dafa36b300c1ad34f1210cee0c48b801afba3855e454ac8189d7c5e35?apiKey=cd16d52c23e84e78897130ca5fae7b62&",
    alt: "Szymon Czarnecki",
    name: "SZYMON CZARNECKI",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4adf34d4063d2395e92e334d10aea4870ce52631ce482506b48810270f3f29ba?apiKey=cd16d52c23e84e78897130ca5fae7b62&",
    alt: "Stanisław Gądek",
    name: "STANISŁAW GĄDEK",
  },
  {
    src: "https://cdn.builder.io/api/v1/image/assets/TEMP/4adf34d4063d2395e92e334d10aea4870ce52631ce482506b48810270f3f29ba?apiKey=cd16d52c23e84e78897130ca5fae7b62&",
    alt: "Dominik Trebisz",
    name: "DOMINIK TREBISZ",
  },
];

function Footer() {
  return (
    <section className="flex flex-col justify-center bg-[#000000] absolute w-full">
      <div className="flex gap-5 justify-between items-center py-5 pr-10 pl-1 w-full">
        <div className="flex gap-5 justify-between items-center px-16 ">
          {people.slice(0, -1).map((person, index) => (
            <PersonImage key={index} src={person.src} alt={person.alt} />
          ))}
        </div>
        <div className="flex gap-5 justify-between items-center">
          {people.map((person, index) => (
            <PersonName key={index} name={person.name} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Footer;
