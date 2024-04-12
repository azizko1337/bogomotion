import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import sha256 from "sha256";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import ironOptions from "@/lib/ironOptions";
import type Session from "@/types/Session";
import type FrontendUser from "@/types/FrontendUser";
import type User from "@/types/User";

import { userToFrontendUser } from "@/lib/utils";

import validateUser from "@/lib/validateUser";

// interface RegisterRequest extends NextApiRequest {
//   body: {
//     email: string;
//     password: string;
//     birthYear: string;
//     sex: string;
//     placeOfResidence: string;
//     additionalInformation?: string;
//   };
// }

type ResponseData = {
  message: string;
};

async function RegisterRoute(req: Request) {
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

    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (session.user) throw new Error("Jesteś już zalogowany.");

    password = sha256(password);

    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        email,
        password,
        birthYear,
        sex,
        placeOfResidence,
        additionalInformation,
      },
    });
    prisma.$disconnect;

    if (!user) {
      throw new Error("Błąd bazy danych.");
    }

    session.user = userToFrontendUser(user as User);
    await session.save();

    return Response.json(
      { message: "Zarejestrowano pomyślnie." },
      { status: 200 }
    );
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd." },
      { status: 500 }
    );
  }
}

export { RegisterRoute as POST };
