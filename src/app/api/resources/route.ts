import { PrismaClient } from "@prisma/client";
import sha256 from "sha256";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import ironOptions from "@/lib/ironOptions";
import validateUser from "@/lib/validateUser";

import type Session from "@/types/Session";
import type FrontendUser from "@/types/FrontendUser";
import { userToFrontendUser } from "@/lib/utils";

import type User from "@/types/User";

async function GETResources(req: Request) {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const prisma = new PrismaClient();
    const resources = await prisma.$queryRawUnsafe(
      // DO NOT pass in or accept user input here
      `SELECT * FROM "resource" ORDER BY RANDOM() LIMIT 10;`
    );
    prisma.$disconnect;

    return Response.json(
      {
        message: "Pomyślnie pobrano 10 losowych rekordów.",
        resources: resources,
      },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd" },
      { status: 500 }
    );
  }
}

export { GETResources as GET };
