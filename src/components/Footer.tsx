import type FrontendUser from "@/types/FrontendUser";
import Link from "next/link";

type Props = {
  user: FrontendUser;
};

function Footer(props: Props) {
  const { user } = props;
  return (
    <footer className="flex flex-col justify-center bg-[#e39646] absolute w-full text-xs font-bold text-white">
      <div className="flex gap-5 justify-between items-center py-5 pr-10 pl-1 w-full">
        <div className="flex gap-5 justify-between items-center px-16 ">
          <a href="https://www.facebook.com/antonizalupka" target="_blank">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/aa3cf408f51310df153f5ba14ba43d0adbfed67e814ec84b92143159fcf942cb?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
              alt="logo"
              className="shrink-0 aspect-square w-[30px]  hover:translate-y-[-2px]"
            />
          </a>
          <a href="https://twitter.com/USinKatowice" target="_blank">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/777928648d6551a0e79ebca51ef092056203821773018cf848553552ffcc285b?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
              alt="logo"
              className="shrink-0 aspect-square w-[30px]  hover:translate-y-[-2px]"
            />
          </a>
          <a
            href="https://pl.linkedin.com/in/antoni-za%C5%82upka-ab697a1b6"
            target="_blank"
          >
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/141e0d3dafa36b300c1ad34f1210cee0c48b801afba3855e454ac8189d7c5e35?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
              alt="logo"
              className="shrink-0 aspect-square w-[30px]  hover:translate-y-[-2px]"
            />
          </a>
          <a href="https://www.instagram.com/p/C3yLAQ-yCxX/" target="_blank">
            <img
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/4adf34d4063d2395e92e334d10aea4870ce52631ce482506b48810270f3f29ba?apiKey=cd16d52c23e84e78897130ca5fae7b62&"
              alt="logo"
              className="shrink-0 aspect-square w-[30px]  hover:translate-y-[-2px]"
            />
          </a>
        </div>
        <div className="flex gap-5 justify-between items-center">
          <a href="https://github.com/azizko1337" target="_blank">
            <div className="hover:translate-y-[-2px]">Antoni Załupka</div>
          </a>
          <a href="https://github.com/Nyeesir" target="_blank">
            <div className="hover:translate-y-[-2px]">Dawid Brożek</div>
          </a>
          <a href="https://github.com/dominikt2" target="_blank">
            <div className="hover:translate-y-[-2px]">Dominik Trebisz</div>
          </a>
          <a href="https://github.com/PanPeryskop" target="_blank">
            <div className="hover:translate-y-[-2px]">Stanisław Gądek</div>
          </a>
          <a href="https://github.com/czxrny" target="_blank">
            <div className="hover:translate-y-[-2px]">Szymon Czarnecki</div>
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
