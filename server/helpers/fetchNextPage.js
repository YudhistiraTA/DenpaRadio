const {VideoMeta, Video} = require('../models');
const playlistGetter = require('./playlistGetter.js');
const arrayShuffle = require('../helpers/arrayShuffle.js');
module.exports = async () => {
    const currentMeta = await VideoMeta.findOne({ order: [['createdAt', 'DESC']] });
    const newPlaylistPage = await playlistGetter(currentMeta?.nextPageToken);
    const playlistIdArray = newPlaylistPage.items.map(video => video.contentDetails.videoId);
    const playlistObjectForm = arrayShuffle(playlistIdArray.map(id => {
        return {videoId: id}
    }));
    await VideoMeta.create({
        nextPageToken: newPlaylistPage.nextPageToken,
        currentPage: currentMeta ? currentMeta.currentPage + 1 : 1,
        currentVideoIndex: 0,
        currentVideoPlayTime: new Date()
    });
    const videoList = await Video.bulkCreate(playlistObjectForm);
    return videoList;
}