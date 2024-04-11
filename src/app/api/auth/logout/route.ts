import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import ironOptions from "@/lib/ironOptions";

import type Session from "@/types/Session";

async function LogoutRoute(req: Request) {
  try {
    const session = (await getIronSession(cookies(), ironOptions)) as Session;
    session.destroy();
    return Response.json({ message: "Wylogowano pomyślnie." }, { status: 200 });
  } catch (error: any) {
    return Response.json(
      { message: error.message || "Nieznany błąd." },
      { status: 500 }
    );
  }
}

export { LogoutRoute as GET };
