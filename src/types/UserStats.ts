import type Emotion from "@/types/Emotion";

type UserStats = {
  wholeHistory: {
    goodAnswers: number;
    badAnswers: number;
    mostAccurateEmotions: Emotion[];
    leastAccurateEmotions: Emotion[];
  };
  lastTenGames: {
    goodAnswers: number;
    badAnswers: number;
    mostAccurateEmotions: Emotion[];
    leastAccurateEmotions: Emotion[];
  };
};

export default UserStats;
