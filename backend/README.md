# Backend

Source for the serverless function the frontend (`index.html`) calls for every AI request — a thin proxy that holds the Gemini API key server-side so no visitor ever needs their own key.

Deployed separately at `https://flatcheck-api-anneycf.vercel.app/api/gemini-proxy` (not from this folder directly — kept out of the repo root so pushing here doesn't trigger an unrelated deploy attempt on this repo's own Vercel project).

`gemini-proxy.js` forwards the exact request body the browser would otherwise have sent straight to Google's Generative Language API, injecting `GEMINI_API_KEY` from its own environment variable. No other logic — extraction, evaluation, scam screening, legal audit, and image analysis are all prompted for from the frontend; the backend's only job is to not expose the key.
