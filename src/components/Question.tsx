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
    <div className="w-6/12 flex flex-col gap-2">
      <div className="flex gap-6 items-center">
        <div className="relative">
          <div className="w-[500px] h-[500px]">
            <Image
              fill
              src={`/resources/${resource.resourceId}.jpg`}
              alt="Obrazek z emocjami"
            />
          </div>
        </div>
        {showResult && (
          <EmotionsSelector onEmotionChange={setSelectedEmotions} />
        )}
      </div>
      <div className="flex justify-end">
        <Button onClick={nextQuestion}>
          {showResult ? "Sprawdź" : "Następne pytanie"}
        </Button>
      </div>
    </div>
  );
}

export default Question;
