const assert = require("node:assert/strict");

function transform(pitches, ratio, pivotMode = "first") {
  let pivot = pitches[0];
  if (pivotMode === "lowest") pivot = Math.min(...pitches);
  if (pivotMode === "highest") pivot = Math.max(...pitches);
  return pitches.map((pitch) => Math.round(pivot + (pitch - pivot) * ratio));
}

assert.deepEqual(transform([60, 62, 64, 67], 2), [60, 64, 68, 74]);
assert.deepEqual(transform([48, 60, 72], 2), [48, 72, 96]);
assert.deepEqual(transform([72, 60, 48], 2), [72, 48, 24]);
assert.deepEqual(transform([60, 62, 64, 67], 0.5), [60, 61, 62, 64]);
assert.deepEqual(transform([60, 62, 64, 67], 1), [60, 62, 64, 67]);
assert.deepEqual(transform([60, 62, 64, 67], 0), [60, 60, 60, 60]);
assert.deepEqual(transform([67, 60, 64], 2, "lowest"), [74, 60, 68]);
assert.deepEqual(transform([60, 64, 67], 0.5, "highest"), [64, 66, 67]);
assert.deepEqual(transform([60, 61], 0.5), [60, 61]);

console.log("Expand-Compress-intervals transformation tests passed");
