import { PrismaClient } from "@prisma/client";
import sha256 from "sha256";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import ironOptions from "@/lib/ironOptions";

import type Session from "@/types/Session";
import type FrontendUser from "@/types/FrontendUser";
import { userToFrontendUser } from "@/lib/utils";

import type User from "@/types/User";

async function GETUser(req: Request) {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { userId: session.user.userId },
    });
    prisma.$disconnect;

    if (!user) throw new Error("Nie jesteś zalogowany.");

    return Response.json(
      { user: userToFrontendUser(user as User) },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd.", user: null },
      { status: 500 }
    );
  }
}

export { GETUser as GET };
