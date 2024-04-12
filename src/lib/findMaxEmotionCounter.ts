type EmotionCounter = {
  anger: number;
  contempt: number;
  fear: number;
  disgust: number;
  happiness: number;
  sadness: number;
  surprise: number;
};

function findMaxEmotionCounter(emotionCounter: EmotionCounter) {
  let maxEmotion = "anger";
  let maxEmotionCounter = emotionCounter.anger;

  for (const emotion in emotionCounter) {
    if (emotionCounter[emotion as keyof EmotionCounter] > maxEmotionCounter) {
      maxEmotion = emotion;
      maxEmotionCounter = emotionCounter[emotion as keyof EmotionCounter];
    }
  }

  return maxEmotion;
}

export default findMaxEmotionCounter;
