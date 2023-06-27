const playlistGetter = require("../helpers/playlistGetter.js");
const fetchNextPage = require("../helpers/fetchNextPage.js");
const { Video, VideoMeta } = require("../models");
const { Op } = require("sequelize");

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
    static async getPlaylist(req, res, next) {
        try {
            let items = [];
            const data = await VideoMeta.findOne({ order: [['createdAt', 'DESC']] });
            if (!data || data.currentVideoIndex >= 49) {
                await Video.destroy({
                    where: {},
                    restartIdentity: true,
                    truncate: true,
                    cascade: true
                });
                items = await fetchNextPage();
            }
            else items = await Video.findAll({ attributes: { exclude: ['createdAt', 'updatedAt'] } });
            res.status(200).json(items);
        }
        catch (error) {
            next(error);
        }
    }
    static async getMeta(req, res, next) {
        try {
            const data = await VideoMeta.findOne({
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            res.status(200).json(data);
        }
        catch (error) {
            next(error);
        }
    }
    static async newMeta(req, res, next) {
        try {
            const { currentVideoPlayTime, currentVideoIndex } = req.body;
            const data = await VideoMeta.findOne({
                order: [['createdAt', 'DESC']],
                attributes: { exclude: ['createdAt', 'updatedAt'] }
            });
            console.log(data);
            const [newMeta, created] = await VideoMeta.findOrCreate({
                where: {
                    [Op.and]: [
                        { currentVideoIndex },
                        { nextPageToken: data.nextPageToken }
                    ]
                },
                defaults: {
                    nextPageToken: data.nextPageToken,
                    currentPage: data.currentPage,
                    currentVideoPlayTime,
                    currentVideoIndex
                }
            });
            res.status(201).json(newMeta);
        }
        catch (error) {
            next(error);
        }
    }
}