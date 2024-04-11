import type Emotion from "@/types/Emotion";

type Resource = {
  resourceId: number;
  type: string;
  age: string;
  imageCategory: string;
  resourceEmotions: Emotion[];
};

export default Resource;

// resourceId Int @id @unique
// type String
// age String //??
// sex String
// imageCategory String
// sessionResults TrainingSessionResult?
// resourceEmotions ResourceEmotion[]
