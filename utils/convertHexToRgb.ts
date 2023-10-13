export function convertHexToRgb(color: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color);

  return result
    ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(
        result[3],
        16,
      )}`
    : "255,102,170";
}
