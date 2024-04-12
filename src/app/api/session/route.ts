import { PrismaClient } from "@prisma/client";
import sha256 from "sha256";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import ironOptions from "@/lib/ironOptions";
import validateUser from "@/lib/validateUser";

import type Session from "@/types/Session";
import type FrontendUser from "@/types/FrontendUser";
import { userToFrontendUser } from "@/lib/utils";
import type FrontendResult from "@/types/FrontendResult";
import type Emotion from "@/types/Emotion";

import type User from "@/types/User";

async function POSTTrainingSession(req: Request) {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const body = await req.json();
    const results = body.results as FrontendResult[];
    for (const result of results) {
      if (!result.endedAt || !result.startedAt || !result.resourceId) {
        throw new Error("Nieprawidłowe dane.");
      }
    }

    const prisma = new PrismaClient();
    const trainingSession = await prisma.training_session.create({
      data: {
        userId: session.user.userId,
        age: new Date().getFullYear() - session.user.birthYear,
        endedAt: results[results.length - 1].endedAt as Date,
        startedAt: results[0].startedAt as Date,
        type: "training",
      },
    });
    if (!trainingSession)
      throw new Error("Nie udało się zapisać sesji treningowej.");

    for (const result of results) {
      await prisma.training_session_result.create({
        data: {
          endedAt: result.endedAt as Date,
          resourceId: result.resourceId as number,
          startedAt: result.startedAt as Date,
          sessionId: trainingSession.sessionId,
          nonRecognizedEmotions: (
            result.nonRecognizedEmotions as Emotion[]
          ).join(" "),
          recognizedEmotions: (result.recognizedEmotions as Emotion[]).join(
            " "
          ),
          falseRecognizedEmotions: (
            result.falseRecognizedEmotions as Emotion[]
          ).join(" "),
        },
      });
    }
    prisma.$disconnect;

    return Response.json(
      {
        message: "Pomyślnie zapisano sesję w bazie danych.",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return Response.json(
      { message: error.message || "Nieznany błąd." },
      { status: 500 }
    );
  }
}

export { POSTTrainingSession as POST };
