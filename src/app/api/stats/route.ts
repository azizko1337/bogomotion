import { PrismaClient } from "@prisma/client";
import sha256 from "sha256";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import ironOptions from "@/lib/ironOptions";
import validateUser from "@/lib/validateUser";

import type Session from "@/types/Session";
import type FrontendUser from "@/types/FrontendUser";
import { userToFrontendUser } from "@/lib/utils";
import type UserStats from "@/types/UserStats";
import findMaxEmotionCounter from "@/lib/findMaxEmotionCounter";

import type User from "@/types/User";

async function GETStats(req: Request) {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const prisma = new PrismaClient();
    const trainingSessionResults = await prisma.training_session.findMany({
      take: 10,
      where: {
        userId: session.user.userId,
      },
      select: {
        TrainingSessionResults: true,
      },
    });
    prisma.$disconnect;

    const counters = {
      recognizedEmotions: 0,
      falseRecognizedEmotions: 0,
      nonRecognizedEmotions: 0,
    };
    const recognizedEmotionsCounter = {
      anger: 0,
      contempt: 0,
      fear: 0,
      disgust: 0,
      happiness: 0,
      sadness: 0,
      surprise: 0,
    };
    const falseRecognizedEmotionsCounter = {
      anger: 0,
      contempt: 0,
      fear: 0,
      disgust: 0,
      happiness: 0,
      sadness: 0,
      surprise: 0,
    };
    const nonRecognizedEmotionsCounter = {
      anger: 0,
      contempt: 0,
      fear: 0,
      disgust: 0,
      happiness: 0,
      sadness: 0,
      surprise: 0,
    };

    for (const trainingSessionResult of trainingSessionResults) {
      for (const trainingResult of trainingSessionResult.TrainingSessionResults) {
        const {
          recognizedEmotions,
          falseRecognizedEmotions,
          nonRecognizedEmotions,
        } = trainingResult;
        const recognizedEmotionsArray = recognizedEmotions.split(" ");
        const falseRecognizedEmotionsArray = falseRecognizedEmotions.split(" ");
        const nonRecognizedEmotionsArray = nonRecognizedEmotions.split(" ");

        recognizedEmotionsArray.forEach((emotion) => {
          counters.recognizedEmotions++;
          recognizedEmotionsCounter[emotion as Emotion]++;
        });
        falseRecognizedEmotionsArray.forEach((emotion) => {
          counters.falseRecognizedEmotions++;
          falseRecognizedEmotionsCounter[emotion as Emotion]++;
        });
        nonRecognizedEmotionsArray.forEach((emotion) => {
          counters.nonRecognizedEmotions++;
          nonRecognizedEmotionsCounter[emotion as Emotion]++;
        });
      }
    }

    const worstEmotion = findMaxEmotionCounter(nonRecognizedEmotionsCounter);
    const bestEmotion = findMaxEmotionCounter(recognizedEmotionsCounter);

    return Response.json(
      {
        message: "ok",
        stats: {
          lastTenGames: {
            goodAnswers: counters.recognizedEmotions,
            badAnswers:
              counters.nonRecognizedEmotions + counters.falseRecognizedEmotions,
            mostAccurateEmotion: bestEmotion,
            leastAccurateEmotion: worstEmotion,
          },
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd." },
      { status: 500 }
    );
  }
}

export { GETStats as GET };
