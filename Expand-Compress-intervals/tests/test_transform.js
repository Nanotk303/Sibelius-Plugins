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

function transform(pitches, ratioText) {
  const [numerator, denominator] = parseRatio(String(ratioText));
  const result = [pitches[0]];
  for (let index = 1; index < pitches.length; index += 1) {
    const interval = pitches[index] - pitches[index - 1];
    result.push(result[index - 1] + scaleDistance(interval, numerator, denominator));
  }
  return result;
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
assert.deepEqual(transform([67, 60, 64], 2), [67, 53, 61]);
assert.deepEqual(transform([60, 64, 67], 0.5), [60, 62, 64]);
assert.deepEqual(transform([60, 61], 0.5), [60, 61]);
assert.deepEqual(transform([60, 62, 66, 72, 80], 0.5), [60, 61, 63, 66, 70]);

console.log("Expand-Compress-intervals transformation tests passed");
