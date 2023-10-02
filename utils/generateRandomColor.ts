export function generateRandomColor() {
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  const color = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(randomColor);

  return color
    ? `${parseInt(color[1], 16)},${parseInt(color[2], 16)},${parseInt(
        color[3],
        16,
      )}`
    : "255,102,170";
}
