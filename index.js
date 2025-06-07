require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const analyzeRoute = require("./routes/analyze");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use("/analyze", analyzeRoute);

app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
});
