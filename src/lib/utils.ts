import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type Emotion from "@/types/Emotion";
import type User from "@/types/User";
import type FrontendUser from "@/types/FrontendUser";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleStringInArray(arr: string[], str: string) {
  return arr.includes(str) ? arr.filter((item) => item !== str) : [...arr, str];
}

export function emotionToText(emotion: Emotion) {
  switch (emotion) {
    case "anger":
      return "Złość";
    case "contempt":
      return "Pogarda";
    case "disgust":
      return "Wstręt";
    case "fear":
      return "Strach";
    case "happiness":
      return "Radość";
    case "sadness":
      return "Smutek";
    case "surprise":
      return "Zaskoczenie";
  }
}

export function userToFrontendUser(user: User): FrontendUser {
  return {
    userId: user.userId,
    email: user.email,
    birthYear: user.birthYear,
    placeOfResidence: user.placeOfResidence,
    sex: user.sex,
    additionalInformation: user.additionalInformation,
    role: user.role,
  };
}
