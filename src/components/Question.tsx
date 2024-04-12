import { useState, useEffect } from "react";
import Image from "next/image";

import EmotionsSelector from "@/components/EmotionsSelector";
import { Button } from "@/components/ui/button";

import type Resource from "@/types/Resource";
import type Emotion from "@/types/Emotion";
import { cn } from "@/lib/utils";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import Loading from "@/components/Loading";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  resource: Resource;
  nextQuestion: () => void;
  currentResource: number;
  resourcesCount: number;
  setAnswer: (answer: Emotion[]) => void;
  showResult: boolean;
};

function Question(props: Props) {
  const [selectedEmotions, setSelectedEmotions] = useState<Emotion[]>([]);
  const [aiHelp, setAiHelp] = useState<Array<any>>([]);
  const {
    resource,
    nextQuestion,
    currentResource,
    resourcesCount,
    setAnswer,
    showResult,
  } = props;

  useEffect(() => {
    setAnswer(selectedEmotions);
  }, [selectedEmotions, setAnswer]);

  async function fetchAiHelp() {
    if (aiHelp.length === 0) {
      const res = await fetch(`${process.env.STACH_API_URL}/`, {
        method: "POST",
        body: JSON.stringify({
          face_url: `${process.env.THIS}/resources/${resource.resourceId}.jpg`,
          key: process.env.STACH_API_KEY,
        }),
      });
      const data = await res.json();
      console.log(data);
    }
  }
  function clearAiHelp() {
    setAiHelp([]);
  }

  return (
    <>
      {showResult && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "animate-pulse w-[150px] h-[150px] absolute bottom-12 right-12"
            )}
          >
            <HoverCard>
              <HoverCardTrigger onClick={fetchAiHelp} className={cn("")}>
                <Image fill alt="AI ASSISTANT" src="/ai.png" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p>Naciśnij, aby skorzystać z opinii asystenta AI</p>
              </HoverCardContent>
            </HoverCard>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Pomoc AI</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Loading />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Team</DropdownMenuItem>
            <DropdownMenuItem>Subscription</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
      <div className="w-7/12 flex gap-6 items-sretch">
        <div className=" relative w-[500px] h-[500px]">
          <Image
            fill
            src={`/resources/${resource.resourceId}.jpg`}
            alt="Obrazek z emocjami"
          />
        </div>

        <div className="flex flex-col justify-end gap-6">
          {showResult && (
            <EmotionsSelector onEmotionChange={setSelectedEmotions} />
          )}
          <Button
            onClick={() => {
              nextQuestion();
              clearAiHelp();
            }}
          >
            {showResult
              ? "Sprawdź"
              : currentResource === resourcesCount - 1
              ? "Zakończ sesję"
              : `Następne pytanie (${currentResource + 1}/${resourcesCount})`}
          </Button>
        </div>
      </div>
    </>
  );
}

export default Question;
