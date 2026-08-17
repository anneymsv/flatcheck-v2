// Generic proxy: forwards the exact request body the browser would have sent
// straight to Gemini, but with the API key held server-side. Lets FlatCheck
// work for any visitor with zero setup on their end.
module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: "GEMINI_API_KEY not set. Add it in Vercel Project Settings -> Environment Variables, then redeploy." });
    }
    const { contents, generationConfig, model } = req.body || {};
    if (!contents) return res.status(400).json({ error: "Missing 'contents' in request body" });

    const modelName = model || "gemini-flash-latest";
    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents, generationConfig })
      }
    );
    const data = await r.json();
    if (!r.ok) {
      return res.status(r.status).json({ error: "Gemini API error " + r.status, detail: data });
    }
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
