import path from "path";

export const cx = (...classNames: (string | undefined | null | false)[]): string =>
    classNames.filter(Boolean).join(" ");


import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

  
