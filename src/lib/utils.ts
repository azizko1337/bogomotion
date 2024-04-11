import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function toggleStringInArray(arr: string[], str: string) {
  return arr.includes(str) ? arr.filter((item) => item !== str) : [...arr, str];
}
