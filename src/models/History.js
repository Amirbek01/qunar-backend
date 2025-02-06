const pool = require("../config/dataBase");

async function saveHistory(prompt, response, imagePath) {
    const query = "INSERT INTO history (prompt, response, image_path) VALUES ($1, $2, $3)";
    await pool.query(query, [prompt, response, imagePath]);
}

async function getHistory() {
    const result = await pool.query("SELECT * FROM history ORDER BY created_at DESC");
    return result.rows;
}

module.exports = { saveHistory, getHistory };
