import type Emotion from "@/types/Emotion";

type UserStats = {
  lastTenGames: {
    goodAnswers: number;
    badAnswers: number;
    mostAccurateEmotion: Emotion;
    leastAccurateEmotion: Emotion;
  };
};

export default UserStats;
