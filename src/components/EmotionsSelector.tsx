"use client";

import { useState, useEffect } from "react";
import { toggleStringInArray } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

const emotions = [
  { key: "anger", text: "złość" },
  { key: "contempt", text: "pogarda" },
  { key: "fear", text: "strach" },
  { key: "disgust", text: "obrzydzenie" },
  { key: "happiness", text: "szczęście" },
  { key: "sadness", text: "smutek" },
  { key: "surprise", text: "zaskoczenie" },
];

type Props = {
  onEmotionChange: (emotions: string[]) => void;
};

function EmotionsSelector(props: Props) {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  function handleChange(e: React.MouseEvent<HTMLButtonElement>) {
    const emotion = e.target.id;
    setSelectedEmotions(toggleStringInArray(selectedEmotions, emotion));
    console.log(selectedEmotions);
  }

  useEffect(() => {
    props.onEmotionChange(selectedEmotions);
  }, [selectedEmotions, props]);

  return (
    <div>
      {emotions.map((emotion) => (
        <Alert key={emotion.key} className={cn("flex gap-3")}>
          <Switch
            checked={selectedEmotions.includes(emotion.key)}
            key={emotion.key}
            id={emotion.key}
            onClick={handleChange}
          />
          <AlertTitle>{emotion.text}</AlertTitle>
        </Alert>
      ))}
    </div>
  );
}

export default EmotionsSelector;
