// node test/hz.js  - frame-rate independence: same wall time at 60 Hz and 120 Hz must give the same game time & travel.
// Fakes performance.now + requestAnimationFrame, holds ArrowRight, steps 2 s of frames. Exit 1 on failure.
const os = require("os"), path = require("path"), { withPage } = require(os.homedir() + "/tools/pshot.js");
const run = (hz) => withPage(async (page, go) => {
  await page.evaluateOnNewDocument(() => { let now = 0, q = [];
    performance.now = () => now; window.requestAnimationFrame = (f) => q.push(f);
    window.__step = (ms) => { now += ms; const f = q; q = []; f.forEach((g) => g(now)); }; });
  await go("file://" + path.join(__dirname, "..", "index.html") + "?" + Date.now());
  return page.evaluate((hz) => { __step(1000 / hz); start(); moth.x = 100; moth.y = 200; light = 100;
    keys.arrowright = 1; const x0 = moth.x, t0 = t;
    for (let i = 0; i < 2 * hz; i++) { spiders = []; __step(1000 / hz); }
    return { t: t - t0, dx: moth.x - x0 }; }, hz);
}, { w: 1600, h: 600 }).then((r) => r.value);
(async () => {
  const a = await run(60), b = await run(120);
  const ok = Math.abs(b.t / a.t - 1) < 0.05 && Math.abs(b.dx / a.dx - 1) < 0.05;
  console.log("60Hz", a, "120Hz", b, ok ? "PASS" : "FAIL"); process.exit(ok ? 0 : 1);
})();
