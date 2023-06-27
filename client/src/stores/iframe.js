import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_URL = 'https://authar.site'

export const usePlayerStore = defineStore('player', {
    state: () => ({
        player: null,
        videoIds: [],
        recordIds: [],
        currentVideoIndex: 0
    }),
    actions: {
        async fetchVideoIds() {
            try {
                const { data } = await axios.get(BASE_URL);
                this.videoIds = data.map(item => item.videoId);
                this.recordIds = data.map(item => item.id);
                const { data: metadata } = await axios.get(BASE_URL + '/meta');
                this.currentVideoIndex = metadata.currentVideoIndex;
                // if(this.player){
                console.log(Math.floor((new Date() - new Date(metadata.currentVideoPlayTime)) / 1000));
                this.player.loadVideoById(this.videoIds[this.currentVideoIndex], Math.floor((new Date() - new Date(metadata.currentVideoPlayTime)) / 1000));
                this.player.seekTo(Math.floor((new Date() - new Date(metadata.currentVideoPlayTime)) / 1000))
                // }
            } catch (error) {
                console.error(error);
            }
        },
        onYouTubeIframeAPIReady() {
            this.player = new YT.Player('player', {
                height: '390',
                width: '640',
                videoId: this.videoIds[this.currentVideoIndex],
                playerVars: {
                    showinfo: 0,
                    autohide: 1,
                    modestbranding: 1
                },
                events: {
                    'onReady': this.onPlayerReady,
                    'onStateChange': this.onPlayerStateChange
                }
            });
        },
        async onPlayerReady(event) {
            // for (let i = 1; i < this.videoIds.length; i++) {
            //     this.player.cueVideoById(this.videoIds[i]);
            // }
            event.target.playVideo();
            const { data } = await axios.get(BASE_URL + '/meta');
            this.player.seekTo(Math.floor((new Date() - new Date(data.currentVideoPlayTime)) / 1000))
        },
        async onPlayerStateChange(event) {
            if (event.data == YT.PlayerState.ENDED) {
                this.currentVideoIndex++;
                await this.checkAndFetchNextPage();
                // if (this.currentVideoIndex < this.videoIds.length) {
                const { data } = await axios.get(BASE_URL + '/meta');
                this.player.loadVideoById(this.videoIds[this.currentVideoIndex], Math.floor((new Date() - new Date(data.currentVideoPlayTime)) / 1000));
                this.player.seekTo(Math.floor((new Date() - new Date(data.currentVideoPlayTime)) / 1000))
                if (this.player.getDuration > 600) this.player.nextVideo();
                // };
                await axios.post(BASE_URL + '/newMeta', {
                    currentVideoPlayTime: new Date(),
                    currentVideoIndex: this.currentVideoIndex
                })
            };
            // if (event.data == YT.PlayerState.PAUSED) {
                // if (event.data == YT.PlayerState.PLAYING) {
                // console.log("Playing");
                // const { data } = await axios.get(BASE_URL + '/meta');
                // this.player.seekTo(Math.floor((new Date() - new Date(data.currentVideoPlayTime)) / 1000))
            // }
        },
        async checkAndFetchNextPage() {
            console.log(this.currentVideoIndex, 'index')
            console.log(this.videoIds.length, 'videoIdsLength')
            if (this.currentVideoIndex >= this.videoIds.length - 1) {
                try {
                    // fetch next page from the server
                    const { data } = await axios.get(`${BASE_URL}`);

                    this.videoIds = data.items.map(item => item.videoId);
                    this.recordIds = data.items.map(item => item.id);
                    this.currentVideoIndex = 0;

                    // load the first video from the next page
                    // this.player.loadVideoById(this.videoIds[this.currentVideoIndex]);

                    // post new meta data to the server
                    await axios.post(`${BASE_URL}/newMeta`, {
                        currentVideoPlayTime: new Date(),
                        currentVideoIndex: this.currentVideoIndex
                    });
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
})
