import type Emotion from "@/types/Emotion";

type FrontendResult = {
  startedAt: Date;
  endedAt?: Date;
  resourceId?: number;
  recognizedEmotions?: Emotion[];
  nonRecognizedEmotions?: Emotion[];
  falseRecognizedEmotions?: Emotion[];
};

export default FrontendResult;
