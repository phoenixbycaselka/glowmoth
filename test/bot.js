// node test/bot.js [games] [WxH]  - play-test: a greedy bot (nearest mote; flees spiders within F px; dims when one is within D px) plays headless games.
// Reports duration, motes and cause of death per game. Calls step() directly (no drawing), so it is fast.
const os = require("os"), path = require("path"), { withPage } = require(os.homedir() + "/tools/pshot.js");
const N = +process.argv[2] || 6, [BW, BH] = (process.argv[3] || "1000x700").split("x").map(Number);
withPage(async (page, go) => {
  await go("file://" + path.join(__dirname, "..", "index.html") + "?" + Date.now());
  return page.evaluate((N) => { const out = [];
    for (const [F, D] of [[0, 0], [90, 0]]) for (let g = 0; g < N; g++) { start();
      while (state == "play" && t < 600) {
        let best = null, bd = 1e9; for (const m of motes) { const d = Math.hypot(m.x - moth.x, m.y - moth.y); if (d < bd) { bd = d; best = m; } }
        let fx = 0, fy = 0; for (const s of spiders) { const d = Math.hypot(s.x - moth.x, s.y - moth.y); if (d < F) { fx += (moth.x - s.x) / d; fy += (moth.y - s.y) / d; } }
        if (typeof dim !== "undefined") keys[" "] = D && spiders.some((s) => Math.hypot(s.x - moth.x, s.y - moth.y) < D) ? 1 : 0;
        target = fx || fy ? { x: moth.x + fx * 100, y: moth.y + fy * 100 } : { x: best.x, y: best.y };
        step(); }
      out.push({ flee: F, dimAt: D, secs: +t.toFixed(0), motes: score, end: light <= 0 ? "light" : "spider", spiders: spiders.length }); }
    return out; }, N);
}, { w: BW, h: BH }).then((r) => { for (const g of r.value) console.log(JSON.stringify(g)); if (r.errors.length) console.log(r.errors); });
