"use client";

import { useState, useEffect } from "react";
import { toggleStringInArray, emotionToText } from "@/lib/utils";
import { cn } from "@/lib/utils";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Switch } from "@/components/ui/switch";

import type Emotion from "@/types/Emotion";

const emotions: Emotion[] = [
  "anger",
  "contempt",
  "fear",
  "disgust",
  "happiness",
  "sadness",
  "surprise",
];

type Props = {
  onEmotionChange: (emotions: string[]) => void;
};

function EmotionsSelector(props: Props) {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  function handleChange(e: React.MouseEvent<HTMLButtonElement>) {
    const emotion = (e.target as HTMLButtonElement).id;
    setSelectedEmotions(toggleStringInArray(selectedEmotions, emotion));
    console.log(selectedEmotions);
  }

  useEffect(() => {
    props.onEmotionChange(selectedEmotions);
  }, [selectedEmotions, props]);

  return (
    <div>
      {emotions.map((emotion) => (
        <Alert key={emotion} className={cn("flex gap-3")}>
          <Switch
            checked={selectedEmotions.includes(emotion)}
            key={emotion}
            id={emotion}
            onClick={handleChange}
          />
          <AlertTitle>{emotionToText(emotion)}</AlertTitle>
        </Alert>
      ))}
    </div>
  );
}

export default EmotionsSelector;
