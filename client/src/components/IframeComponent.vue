<script>
import { usePlayerStore } from '../stores/iframe'
export default {
    name: "IframeComponent",
    setup() {
        const playerStore = usePlayerStore();
        // Make sure to handle the YT API callbacks in setup()
        window.onYouTubeIframeAPIReady = playerStore.onYouTubeIframeAPIReady;
        window.onPlayerStateChange = playerStore.onPlayerStateChange;
        window.onPlayerReady = playerStore.onPlayerReady;
        // Load the API and fetch the videoIds when the component is mounted
    },
    created: async () => {
        const playerStore = usePlayerStore();
        var tag = document.createElement("script");
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        await playerStore.fetchVideoIds();
    },
    // Cleanup when the component is unmounted
    beforeUnmount: () => {
        window.onYouTubeIframeAPIReady = null;
        window.onPlayerStateChange = null;
        window.onPlayerReady = null;
    },
}
</script>
<template>
    <div id="player"></div>
</template>