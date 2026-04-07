export function getContrastColor(hexColor: string) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);
  const lightenAmount = 0.95;
  const newR = Math.round(r + (255 - r) * lightenAmount);
  const newG = Math.round(g + (255 - g) * lightenAmount);
  const newB = Math.round(b + (255 - b) * lightenAmount);
  const newHexColor = '#' + ((1 << 24) + (newR << 16) + (newG << 8) + newB).toString(16).slice(1);
  return newHexColor;
}
