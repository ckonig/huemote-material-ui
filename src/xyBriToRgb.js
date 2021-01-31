// https://stackoverflow.com/a/22918909/1216242
export default function xyBriToRgb(x, y, bri) {
  var z = 1.0 - x - y;
  var Y = bri / 255.0; // Brightness of lamp
  var X = (Y / y) * x;
  var Z = (Y / y) * z;
  var r = X * 1.612 - Y * 0.203 - Z * 0.302;
  var g = -X * 0.509 + Y * 1.412 + Z * 0.066;
  var b = X * 0.026 - Y * 0.072 + Z * 0.962;
  r =
    r <= 0.0031308 ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, 1.0 / 2.4) - 0.055;
  g =
    g <= 0.0031308 ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, 1.0 / 2.4) - 0.055;
  b =
    b <= 0.0031308 ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, 1.0 / 2.4) - 0.055;
  var maxValue = Math.max(r, g, b);
  r /= maxValue;
  g /= maxValue;
  b /= maxValue;
  r = r * 255;
  if (r < 0) {
    r = 255;
  }
  g = g * 255;
  if (g < 0) {
    g = 255;
  }
  b = b * 255;
  if (b < 0) {
    b = 255;
  }
  return {
    r: r,
    g: g,
    b: b,
  };
}
