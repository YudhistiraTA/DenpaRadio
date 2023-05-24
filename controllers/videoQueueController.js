const playlistGetter = require("../helpers/playlistGetter");

module.exports = class videoQueueController {
    static async playlistGenerate(req, res, next) {
        try {
            const items = await playlistGetter();
            res.status(200).json({ items });
        }
        catch (err) {
            next(err);
        }

    }
}