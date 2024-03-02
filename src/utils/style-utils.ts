import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CreateStyles = { [key: string]: React.CSSProperties }
export const createStyles =
  <T extends CreateStyles>(style: T) => {
    (): T => {
      return style as T;
    };
  }
