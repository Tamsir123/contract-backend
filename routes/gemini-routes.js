const express = require("express");
const router = express.Router();
const { summarize } = require("../controllers/summarize.controller");
const { clarify } = require("../controllers/clarify.controller");
const { generateImage } = require("../controllers/image.controller");

router.post("/summarize", summarize);
router.post("/clarify", clarify);
router.post("/generate-image", generateImage);

module.exports = router;
