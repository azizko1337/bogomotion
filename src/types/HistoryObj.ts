type HistoryObj = {
  endedAt: string;
  counters: {
    recognizedEmotions: number;
    falseRecognizedEmotions: number;
    nonRecognizedEmotions: number;
  };
};
