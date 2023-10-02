export function isColorLight(color: string): boolean {
  const colors = color.split(",").map(Number);

  return colors[0] * 0.299 + colors[1] * 0.587 + colors[2] * 0.114 > 186;
}
