import { useState, useEffect } from "react";
import Image from "next/image";

import EmotionsSelector from "@/components/EmotionsSelector";
import { Button } from "@/components/ui/button";

import type Resource from "@/types/Resource";
import type Emotion from "@/types/Emotion";

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

  return (
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
        <Button onClick={nextQuestion}>
          {showResult
            ? "Sprawdź"
            : currentResource === resourcesCount - 1
            ? "Zakończ sesję"
            : `Następne pytanie (${currentResource + 1}/${resourcesCount})`}
        </Button>
      </div>
    </div>
  );
}

export default Question;
