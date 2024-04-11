import { useState } from "react";
import Image from "next/image";

import EmotionsSelector from "@/components/EmotionsSelector";
import { Button } from "@/components/ui/button";

import type Resource from "@/types/Resource";

type Props = {
  resource: Resource;
};

function Question(props: Props) {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const resource = props;

  console.log(selectedEmotions);

  return (
    <div className="flex flex-col">
      <div className="flex gap-6 items-center">
        <div className="relative">
          <div className="w-[500px] h-[500px]">
            <Image fill src={resource.id} />
          </div>
        </div>
        <EmotionsSelector onEmotionChange={setSelectedEmotions} />
      </div>
      <div className="flex justify-end">
        <Button>Następne</Button>
      </div>
    </div>
  );
}

export default Question;
