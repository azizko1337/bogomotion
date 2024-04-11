import type { IronSession } from "iron-session";
import type FrontendUser from "./FrontendUser";

type Session = IronSession<{ user: FrontendUser }>;

export default Session;
