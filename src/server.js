const express = require("express");
const cors = require("cors");
require("dotenv").config();

const aiRoutes = require("./routes/aiRoutes");
const historyRoutes = require("./routes/historyRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", aiRoutes);
app.use("/api", historyRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
