import { PrismaClient } from "@prisma/client";
import sha256 from "sha256";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";

import ironOptions from "@/lib/ironOptions";

import type User from "@/types/User";
import type Session from "@/types/Session";
import { userToFrontendUser } from "@/lib/utils";

async function LoginRoute(req: Request) {
  try {
    let { email, password } = await req.json();

    password = sha256(password);

    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    if (session.user) throw new Error("Jesteś już zalogowany.");

    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    prisma.$disconnect;

    if (!user) throw new Error("Błędny email.");
    if (user.password !== password) {
      throw new Error("Błędne hasło.");
    }

    session.user = userToFrontendUser(user as User);
    await session.save();

    return Response.json({ message: "Zalogowano pomyślnie." }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd." },
      { status: 500 }
    );
  }
}

export { LoginRoute as POST };
