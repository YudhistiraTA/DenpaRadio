const express = require("express");
const router = express.Router();
const playlistGetter = require("../helpers/playlistGetter");

router.get("/", async (req, res, next) => {
    try {
        const items = await playlistGetter();
        console.log(items);
        res.status(200).json({ items });
    }
    catch (err) {
        next(err);
    }
})

module.exports = router;