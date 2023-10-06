export function formatRgbString(color: string) {
  return color.split("rgb")[1].replace(/([()])/g, "");
}
