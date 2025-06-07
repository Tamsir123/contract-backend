// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const analyzeRoute = require("./routes/analyze");

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(bodyParser.json());

// app.use("/analyze", analyzeRoute);

// app.listen(PORT, () => {
//   console.log(`✅ Backend démarré sur http://localhost:${PORT}`);
// });


// const express = require("express");
// const dotenv = require("dotenv");
// const bodyParser = require("body-parser");
// const routes = require("./routes/gemini-routes");

// dotenv.config();

// const app = express();
// app.use(bodyParser.json());
// app.use("/api", routes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`✅ Backend démarré sur http://localhost:${PORT}`));


const express = require("express");
const dotenv = require("dotenv");

// Configuration dotenv pour charger les variables d'environnement
dotenv.config();

const app = express();
app.use(express.json());

// Import des controllers
const summarizeController =  require("./Controllers/summarize-controller");
const clarifyController = require("./Controllers/clarify-controller");
const imageController = require("./Controllers/image-controller");

// Routes POST
app.post("/api/summarize", summarizeController.summarize);
app.post("/api/clarify", clarifyController.clarify);
app.post("/api/generate-image", imageController.generateImage);

// Démarrage serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend démarré sur http://localhost:${PORT}`));

