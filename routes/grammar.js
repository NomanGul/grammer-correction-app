const express = require("express");
const OpenAI = require("openai");
const { verifyToken } = require("./auth");

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.use(verifyToken);

router.post("/check", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        {
          role: "system",
          content: `You are a grammar-checking assistant. Your task is to analyze the provided English text and return an HTML-formatted version where only the specific incorrect words or phrases are wrapped in <span class="incorrect-grammar"></span> tags. Do not modify the original text. Do not mark words that are correct on their own but appear in an ungrammatical context—only highlight the directly incorrect elements (e.g., wrong verb forms, misspellings, incorrect word choices). Maintain all original formatting, punctuation, and line breaks. Output only valid HTML.`,
        },
        {
          role: "user",
          content: text,
        },
      ],
      temperature: 0.0,
      max_tokens: 500,
    });

    const response = completion.choices[0].message.content;
    res.json({ highlightedText: response });
  } catch (error) {
    console.error("OpenAI API Error:", error);
    res
      .status(500)
      .json({ message: "Error checking grammar", error: error.message });
  }
});

module.exports = router;
