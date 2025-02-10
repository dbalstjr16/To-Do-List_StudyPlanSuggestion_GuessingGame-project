const express = require("express");
const OpenAI = require("openai");
const router = express.Router();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const USE_MOCK_API = process.env.USE_MOCK_API === "true";

router.post("/", async (req, res) => {
    const { schoolInput, completedCourses, interests } = req.body;

    if (USE_MOCK_API) {
        console.log("Mock Mode Active - No OpenAI API Calls");
        return res.json({
            suggestions: [
                "CS540: Intro to AI - Learn about AI algorithms and data science.",
                "CS640: Computer Network - Understand how the internet works.",
                "CS537: Operating Systems - Learn about memory management and system processes.",
                "CS435: Cryptography - Protect systems from threats and attacks.",
                "CS564: Database Systems - Learn how to store and retrieve data efficiently."
            ]
        });
    }

    const prompt = `
    I am a computer science student attending: ${schoolInput}. I have completed the following courses: ${completedCourses.join(", ")}.
    I am interested in: ${interests.join(", ")}. Based on my progress and interests, from my college, could you suggest 3 or more courses 
    I should take and explain why? Keep suggestions relevant to CS education. If I put unrelated or unexisting schools and courses next to ":", output
    message similar to saying "it is hard to recommned you courses if you do not give me actual inputs that i can help you."
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