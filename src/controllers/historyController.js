const { getHistory } = require("../models/History");

async function fetchHistory(req, res) {
    try {
        const history = await getHistory();
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve history" });
    }
}

module.exports = { fetchHistory };
