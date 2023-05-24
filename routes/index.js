const express = require("express");
const router = express.Router();
const videoQueueController = require("../controllers/videoQueueController.js");

router.get("/", videoQueueController.playlistGenerate);

module.exports = router;