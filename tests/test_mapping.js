const assert = require("node:assert/strict");

function mod12(value) {
  return ((value % 12) + 12) % 12;
}

function nearestDelta(sourcePc, selected, preferDown) {
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

assert.equal(nearestDelta(0, new Set([0, 4, 7]), true), 0);
assert.equal(nearestDelta(1, new Set([0, 4, 7]), true), -1);
assert.equal(nearestDelta(2, new Set([0, 4, 7]), true), -2);
assert.equal(nearestDelta(2, new Set([0, 4, 7]), false), 2);
assert.equal(nearestDelta(11, new Set([0]), true), 1);
assert.equal(nearestDelta(6, new Set([0]), true), -6);
assert.equal(nearestDelta(6, new Set([0]), false), 6);

for (let source = 0; source < 12; source += 1) {
  const delta = nearestDelta(source, new Set([0, 3, 7, 10]), true);
  assert.ok(Math.abs(delta) <= 6);
  assert.ok(new Set([0, 3, 7, 10]).has(mod12(source + delta)));
}

console.log("PCSet-remap mapping tests passed");
