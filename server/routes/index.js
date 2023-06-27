const express = require("express");
const router = express.Router();
const videoQueueController = require("../controllers/videoQueueController.js");

router.get("/", videoQueueController.getPlaylist);
router.get("/playlist", videoQueueController.playlistGenerate);
router.get("/meta", videoQueueController.getMeta);
router.post("/newMeta", videoQueueController.newMeta);
module.exports = router;