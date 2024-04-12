"use client";

import Link from "next/link";
import type FrontendResult from "@/types/FrontendResult";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

type Props = {
  results: FrontendResult[];
};

let goodAnswers = 0;
let badAnswers = 0;

function SessionSummary(props: Props) {
  const { results } = props;
  const router = useRouter();

  for (const result of results) {
    goodAnswers += result.recognizedEmotions?.length;
    badAnswers +=
      result.falseRecognizedEmotions?.length +
      result.nonRecognizedEmotions?.length;
  }

  const score = Math.round((goodAnswers * 100) / (goodAnswers + badAnswers));

  return (
    <div className="flex flex-col items-center gap-2">
      <HoverCard>
        <HoverCardTrigger className={cn("animate-pulse text-xl")}>
          Twój wynik: {score}%
        </HoverCardTrigger>
        <HoverCardContent>
          <p>
            {score >= 70
              ? "Wynik powyżej 70% wskazuje na brak problemów z rozpoznawaniem emocji. Zachęcamy jednak do trenowania w naszej aplikacji."
              : "Wynik poniżej 70% wskazuje na problemy w rozpoznawaniu emocji. Rozpocznij kolejny test i monitoruj swoje postępy w zakładce statystyki."}
          </p>
        </HoverCardContent>
      </HoverCard>
      <Button
        onClick={() => {
          router.push("/");
        }}
      >
        Wróć do strony głównej
      </Button>
    </div>
  );
}

export default SessionSummary;
