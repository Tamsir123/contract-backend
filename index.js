require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
// const analyzeRoute = require("./routes/analyze");
// const classicChatRoute = require("./routes/classicChat");
// const alertChatRoute = require("./routes/alertChat");
const contractSummaryRoute = require("./routes/contractSummary");
const riskAlertRoute = require("./routes/riskAlert");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// app.use("/analyze", analyzeRoute);
// app.use("/classic-chat", classicChatRoute);
// app.use("/alert-chat", alertChatRoute);
app.use("/contract", contractSummaryRoute);
app.use("/contract", riskAlertRoute);

app.listen(PORT, () => {
  console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
});
