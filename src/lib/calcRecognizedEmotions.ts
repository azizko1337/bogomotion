import type Emotion from "@/types/Emotion";

function calcRecognizedEmotions(answer: Emotion[], correct: Emotion[]) {
  const recognizedEmotions = correct.filter((emotion) =>
    answer.includes(emotion)
  );
  return recognizedEmotions;
}

export default calcRecognizedEmotions;
