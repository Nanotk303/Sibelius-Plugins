const assert = require("node:assert/strict");

function mod12(value) {
  return ((value % 12) + 12) % 12;
}

function transposeSet(selected, transposition) {
  return new Set([...selected].map((pitchClass) => mod12(pitchClass + transposition)));
}

function nearestDelta(sourcePc, baseSet, transposition, preferDown) {
  const selected = transposeSet(baseSet, transposition);
  if (selected.has(sourcePc)) return 0;

  for (let distance = 1; distance <= 6; distance += 1) {
    const down = selected.has(mod12(sourcePc - distance));
    const up = selected.has(mod12(sourcePc + distance));
    if (down && up) return preferDown ? -distance : distance;
    if (down) return -distance;
    if (up) return distance;
  }
  return 0;
}

assert.deepEqual([...transposeSet(new Set([0, 2, 4, 6, 10]), 4)], [4, 6, 8, 10, 2]);
assert.deepEqual([...transposeSet(new Set([0, 2, 4, 6, 10]), -4)], [8, 10, 0, 2, 6]);
assert.deepEqual([...transposeSet(new Set([0, 2, 4]), 12)], [0, 2, 4]);
assert.deepEqual([...transposeSet(new Set([0, 2, 4]), -12)], [0, 2, 4]);

assert.equal(nearestDelta(0, new Set([0, 4, 7]), 0, true), 0);
assert.equal(nearestDelta(1, new Set([0, 4, 7]), 0, true), -1);
assert.equal(nearestDelta(2, new Set([0, 4, 7]), 0, true), -2);
assert.equal(nearestDelta(2, new Set([0, 4, 7]), 0, false), 2);
assert.equal(nearestDelta(11, new Set([0]), 0, true), 1);
assert.equal(nearestDelta(6, new Set([0]), 0, true), -6);
assert.equal(nearestDelta(6, new Set([0]), 0, false), 6);
assert.equal(nearestDelta(4, new Set([0, 2, 4, 6, 10]), 4, true), 0);

for (let source = 0; source < 12; source += 1) {
  const transposition = -4;
  const transposed = transposeSet(new Set([0, 3, 7, 10]), transposition);
  const delta = nearestDelta(source, new Set([0, 3, 7, 10]), transposition, true);
  assert.ok(Math.abs(delta) <= 6);
  assert.ok(transposed.has(mod12(source + delta)));
}

console.log("PCSet-remap mapping tests passed");
