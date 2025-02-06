const express = require("express");
const { fetchHistory } = require("../controllers/historyController");

const router = express.Router();

router.get("/history", fetchHistory);

module.exports = router;
