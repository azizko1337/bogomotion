import ironOptions from "@/lib/ironOptions";
import Session from "@/types/Session";
import { PrismaClient } from "@prisma/client";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

async function GETHistory() {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const prisma = new PrismaClient();
    const history = await prisma.training_session.findMany({
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
    let objects = [];

    for (const trainingSessionResult of history) {
      let endedAt = "0";
      for (const trainingResult of trainingSessionResult.TrainingSessionResults) {
        const {
          recognizedEmotions,
          falseRecognizedEmotions,
          nonRecognizedEmotions,
        } = trainingResult;
        endedAt = trainingResult.endedAt.toString();
        const recognizedEmotionsArray = recognizedEmotions.split(" ");
        const falseRecognizedEmotionsArray = falseRecognizedEmotions.split(" ");
        const nonRecognizedEmotionsArray = nonRecognizedEmotions.split(" ");

        recognizedEmotionsArray.forEach((emotion) => {
          counters.recognizedEmotions++;
        });
        falseRecognizedEmotionsArray.forEach((emotion) => {
          counters.falseRecognizedEmotions++;
        });
        nonRecognizedEmotionsArray.forEach((emotion) => {
          counters.nonRecognizedEmotions++;
        });
      }
      objects.push({ endedAt: endedAt, counters: counters });
    }

    console.log("asdsad");
    console.log(objects);

    return Response.json(
      {
        message: "ok",
        objects: objects,
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
