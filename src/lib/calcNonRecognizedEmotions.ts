import type Emotion from "@/types/Emotion";

function calcNonRecognizedEmotions(answer: Emotion[], correct: Emotion[]) {
  const nonRecognizedEmotions = correct.filter(
    (emotion) => !answer.includes(emotion)
  );
  return nonRecognizedEmotions;
}

export default calcNonRecognizedEmotions;
