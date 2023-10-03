import { isColorLight } from "@/utils/defineColorMode";

export function getInputColor(color: string): string {
  return isColorLight(color)
    ? "text-gray-5 placeholder-gray-5"
    : "text-[white] placeholder-[white]";
}

export function getOverlayInnerStyle(color: string): string {
  return isColorLight(color) ? "#83848a" : "#ffffff";
}
