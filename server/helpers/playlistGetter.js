const axios = require("axios");
const shuffleArray = require("./arrayShuffle.js");
module.exports = async (nextPageToken) => {
    let params = {
        params: {
            part: 'contentDetails',
            maxResults: 50,
            playlistId: process.env.PLAYLIST_ID,
            key: process.env.YOUTUBE_API,  // replace with your YouTube Data API key
        }
    };
    if (nextPageToken) params.params.pageToken = nextPageToken;
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/playlistItems', params);
    return data;
}