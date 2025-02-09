const express = require("express");
const OpenAI = require("openai");
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const USE_MOCK_API = process.env.USE_MOCK_API === "true";

router.post("/", async (req, res) => {
    const { completedCourses } = req.body;

    if (!completedCourses || completedCourses.length === 0) {
        return res.status(400).json({ error: "No courses provided." });
    }

    if (USE_MOCK_API) {
        console.log("Mock Mode Active - No OpenAI API Calls");
        return res.json({
            suggestions: [
                "Machine Learning - Learn about AI algorithms and data science.",
                "Computer Networks - Understand how the internet works.",
                "Operating Systems - Learn about memory management and system processes.",
                "Cybersecurity - Protect systems from threats and attacks.",
                "Database Systems - Learn how to store and retrieve data efficiently."
            ]
        });
    }

    const prompt = `
    I am a computer science student. I have completed the following courses: ${completedCourses.join(", ")}.
    Based on my progress, suggest 5 next courses I should take and explain why.
    Keep suggestions relevant to CS education.
    `;

    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100
        });

        const suggestions = response.choices[0].message.content.split("\n").filter(line => line.trim() !== "");
        res.json({ suggestions });

    } catch (error) {
        console.error("OpenAI API Error:", error);
        res.status(500).json({ error: "AI service unavailable." });
    }
});

module.exports = router;