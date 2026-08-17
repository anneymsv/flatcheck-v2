# FlatCheck v2

An AI copilot for assessing London rental listings — fit, legal compliance, scam risk, area safety, and commute, all from one pasted ad.

Five tabs in one app:
- **Evaluate** — fit score, red flags, move-in costs, all from one pasted listing
- **Legal audit** — a deterministic fee-compliance checklist (computed in code) plus an AI audit grounded against embedded gov.uk source text
- **Risks** — scam-signal screening, live crime data from police.uk, and a photo red-flag check (mould, damp, hidden angles) via Gemini vision
- **Transit** — live TfL journey routing with a map
- **Compare** — every evaluation saved locally for side-by-side comparison

Works with zero setup for any visitor — no API key, no sign-up.

## Architecture

- `index.html` — the entire frontend: markup, styles, and all client logic in one file. No build step, no framework.
- `backend/` — source for the serverless proxy the frontend calls for every AI request (Gemini API key held server-side, deployed separately on Vercel). See [backend/README.md](backend/README.md).
- Free public APIs called directly from the browser, no key needed: [postcodes.io](https://postcodes.io) (geocoding), [TfL](https://api.tfl.gov.uk) (journey planning), [police.uk](https://data.police.uk) (crime data).
- Deposit caps, holding-deposit caps, and prohibited-fee detection are computed deterministically in the frontend's own code, not asked of the model.

Live: https://anneymsv.github.io/flatcheck-v2/
