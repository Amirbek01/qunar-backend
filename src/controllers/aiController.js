const openai = require("../config/openai");
const { saveHistory } = require("../models/History");


const cleanResponse = (text) => {
    return text.replace(/\n/g, " ").trim(); // Убирает \n и удаляет лишние пробелы
};

async function analyzeImage(req, res) {
    try {
        const { prompt } = req.body;
        const image = req.file;
        
        if (!prompt && !image) {
            return res.status(400).json({ error: "Требуется либо текст, либо изображение, либо оба варианта." });
        }

        let messages = [];
        if (prompt) messages.push({ type: "text", text: prompt });

        let imagePath = null;
        if (image) {
            const base64Image = image.buffer.toString("base64");
            messages.push({ type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } });
            imagePath = image.path;
        }

        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            max_tokens: 2000,
            messages: [{ role: "user", content: messages }]
        });

        let responseText = response.choices[0].message.content;
        responseText = cleanResponse(responseText); // Очищаем текст перед отправкой

        await saveHistory(prompt || "Без текста", responseText, imagePath);

        res.json({ response: responseText });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Ошибка обработки запроса." });
    }
}

module.exports = { analyzeImage };
