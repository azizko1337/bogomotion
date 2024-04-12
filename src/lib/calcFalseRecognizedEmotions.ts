import type Emotion from "@/types/Emotion";

function calcFalseRecognizedEmotions(answer: Emotion[], correct: Emotion[]) {
  const falseRecognizedEmotions = answer.filter(
    (emotion) => !correct.includes(emotion)
  );
  return falseRecognizedEmotions;
}

export default calcFalseRecognizedEmotions;
