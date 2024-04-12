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

import { emotionToText } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import stachConfig from "@/../stach.config.js";

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
    console.log(1);
    console.log(process.env);
    if (aiHelp.length === 0) {
      const res = await fetch(`${stachConfig.url}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          face_url: `${stachConfig.this}/resources/${resource.resourceId}.jpg`,
          key: stachConfig.key,
        }),
      });
      const data = await res.json();
      for (const emotion in data.emotions) {
        setAiHelp((prev) => [
          ...prev,
          { emotion, value: data.emotions[emotion] },
        ]);
      }
    }
  }
  function clearAiHelp() {
    setAiHelp([]);
  }

  console.log(aiHelp);

  return (
    <>
      {showResult && (
        <Drawer>
          <DrawerTrigger
            onClick={fetchAiHelp}
            className={cn("w-[150px] h-[150px] fixed bottom-12 right-12")}
          >
            <Image fill alt="AI ASSISTANT" src="/ai.png" />
          </DrawerTrigger>

          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Pomoc AI</DrawerTitle>
              <DrawerDescription>Opinia asystenta AI</DrawerDescription>
            </DrawerHeader>
            <DrawerFooter>
              {aiHelp.length == 0 ? (
                <Loading />
              ) : (
                aiHelp.map((help) => (
                  <div key={help.emotion}>
                    {emotionToText(help.emotion)}: {Math.round(help.value)}%
                  </div>
                ))
              )}
              <DrawerClose>
                <Button variant="outline">Zamknij</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
      {/* {showResult && (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              "animate-pulse z-1 w-[150px] h-[150px] absolute bottom-20 right-12"
            )}
          >
            <HoverCard className={cn("cursor-pointer")}>
              <HoverCardTrigger
                onClick={fetchAiHelp}
                className={cn("cursor-pointer")}
              ></HoverCardTrigger>
              <HoverCardContent>
                <p>Naciśnij, aby skorzystać z opinii asystenta AI</p>
              </HoverCardContent>
            </HoverCard>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Pomoc AI</DropdownMenuLabel>
            <DropdownMenuSeparator />

            {aiHelp.length == 0 ? (
              <Loading />
            ) : (
              aiHelp.map((help) => (
                <DropdownMenuItem key={help.emotion}>
                  {emotionToText(help.emotion)}: {Math.round(help.value)}%
                </DropdownMenuItem>
              ))
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      )} */}
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
