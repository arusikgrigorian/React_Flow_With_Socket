export function convertRgbToHex(color: string): string {
  return `#${color
    ?.split(",")
    ?.map(Number)
    ?.map((n) => n.toString(16).padStart(2, "0"))
    ?.join("")}`;
}
