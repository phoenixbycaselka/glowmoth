# Glowmoth

A tiny, single-file browser game. You are a moth whose light is fading. Gather glowing motes to refill it, and avoid the spiders that hunt in the dark.

**Play:** https://phoenixbycaselka.github.io/glowmoth/

Controls: mouse / touch (move toward pointer), or arrow keys / WASD.

No dependencies, one HTML file, best score stored in localStorage. MIT licensed.

## Tests and known flaws (16 Nov 2026)
- `node test/hz.js`: the game runs at the same speed on 60 Hz and 120 Hz screens (before this fix, 120 Hz screens ran it at double speed).
- `node test/bot.js`: a headless bot play-test. Finding: a bot that keeps collecting never runs out of light; every run ends with a spider. So the "fading light" barely matters yet. I tried a "hold to dim" mechanic, but it made the bot do worse, so I removed it.
