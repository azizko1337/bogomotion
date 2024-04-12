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

async function GETUser(req: Request) {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { userId: session.user.userId },
    });
    prisma.$disconnect;

    if (!user) throw new Error("Nieznany błąd.");

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

async function DELETEUser() {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    const prisma = new PrismaClient();
    const user = await prisma.user.delete({
      where: { userId: session.user.userId },
    });
    prisma.$disconnect;

    session.destroy();

    return Response.json(
      { message: "Pomyślnie usunięto konto" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd" },
      { status: 500 }
    );
  }
}

async function PUTUser(req: Request) {
  try {
    let {
      email,
      password,
      birthYear,
      sex,
      placeOfResidence,
      additionalInformation,
    } = await req.json();

    if (!email || !password || !birthYear || !sex || !placeOfResidence) {
      throw new Error("Nie podano wszystkich danych.");
    }

    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (!session?.user) throw new Error("Nie jesteś zalogowany.");

    try {
      validateUser(
        email,
        password,
        birthYear,
        sex,
        placeOfResidence,
        additionalInformation
      );
    } catch (error: any) {
      throw new Error(error.message);
    }

    password = sha256(password);

    const prisma = new PrismaClient();
    const user = await prisma.user.update({
      where: { userId: session.user.userId },
      data: {
        email,
        password,
        birthYear,
        additionalInformation,
        sex,
        placeOfResidence,
      },
    });
    prisma.$disconnect;

    session.user = userToFrontendUser(user as User);
    await session.save();

    return Response.json(
      { message: "Pomyślnie zaktualizowano konto" },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd" },
      { status: 500 }
    );
  }
}

export { GETUser as GET, DELETEUser as DELETE, PUTUser as PUT };
