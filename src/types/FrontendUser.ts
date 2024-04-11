type FrontendUser = {
  userId: number;
  email: string;
  birthYear: number;
  sex: "male" | "female" | "other";
  role: "user" | "premium" | "admin";
  additionalInformation: string | null;
  placeOfResidence: "village" | "smallCity" | "averageCity" | "bigCity";
} | null;

export default FrontendUser;
