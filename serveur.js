import express from "express";
import cors from "cors";
import { GoogleGenAI } from "@google/genai";

const app = express();
app.use(cors());
app.use(express.json());

// La clé est lue depuis une variable d'environnement : elle n'apparaît jamais dans le code
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

app.post("/generer", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ erreur: "Prompt manquant" });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-flash-latest",
      contents: prompt,
    });
    res.json({ texte: response.text });
  } catch (e) {
    res.status(500).json({ erreur: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Serveur démarré sur le port " + port));
