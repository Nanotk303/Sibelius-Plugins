const assert = require("node:assert/strict");

function parseRatio(text) {
  const normalized = text.replace(",", ".");
  const parts = normalized.split(".");
  if (parts.length > 2 || !/^\d*$/.test(parts[0]) || !/^\d*$/.test(parts[1] ?? "")) {
    throw new Error("invalid ratio");
  }
  const whole = Number(parts[0] || 0);
  const denominator = parts.length === 2 ? 10 ** (parts[1].length || 1) : 1;
  const fraction = Number(parts[1] || 0);
  return [whole * denominator + fraction, denominator];
}

function scaleDistance(distance, numerator, denominator) {
  return Math.sign(distance) * Math.floor((Math.abs(distance) * numerator + Math.floor(denominator / 2)) / denominator);
}

function transform(pitches, ratioText, pivotMode = "first") {
  let pivot = pitches[0];
  if (pivotMode === "lowest") pivot = Math.min(...pitches);
  if (pivotMode === "highest") pivot = Math.max(...pitches);
  const [numerator, denominator] = parseRatio(String(ratioText));
  return pitches.map((pitch) => pivot + scaleDistance(pitch - pivot, numerator, denominator));
}

assert.deepEqual(transform([60, 62, 64, 67], 2), [60, 64, 68, 74]);
assert.deepEqual(transform([48, 60, 72], 2), [48, 72, 96]);
assert.deepEqual(transform([72, 60, 48], 2), [72, 48, 24]);
assert.deepEqual(transform([60, 62, 64, 67], 0.5), [60, 61, 62, 64]);
assert.deepEqual(transform([60, 65, 70], "0.4"), [60, 62, 64]);
assert.deepEqual(transform([70, 65, 60], "0.4"), [70, 68, 66]);
assert.deepEqual(transform([60, 65, 70], "0,4"), [60, 62, 64]);
assert.deepEqual(transform([60, 62, 64, 67], 1), [60, 62, 64, 67]);
assert.deepEqual(transform([60, 62, 64, 67], 0), [60, 60, 60, 60]);
assert.deepEqual(transform([67, 60, 64], 2, "lowest"), [74, 60, 68]);
assert.deepEqual(transform([60, 64, 67], 0.5, "highest"), [63, 65, 67]);
assert.deepEqual(transform([60, 61], 0.5), [60, 61]);

console.log("Expand-Compress-intervals transformation tests passed");
