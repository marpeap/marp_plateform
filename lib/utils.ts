import { twMerge } from "tailwind-merge";

type InputClass =
  | string
  | number
  | boolean
  | undefined
  | null
  | Record<string, boolean>
  | InputClass[];

export function cn(...inputs: InputClass[]) {
  const parts: string[] = [];

  const walk = (value: InputClass) => {
    if (!value) return;
    if (typeof value === "string" || typeof value === "number") {
      parts.push(String(value));
      return;
    }
    if (Array.isArray(value)) {
      value.forEach(walk);
      return;
    }
    if (typeof value === "object") {
      Object.entries(value).forEach(([key, enabled]) => {
        if (enabled) parts.push(key);
      });
      return;
    }
  };

  inputs.forEach(walk);
  return twMerge(parts.join(" "));
}

