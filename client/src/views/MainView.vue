<template>
    <div class="mt-2 py-2">
        <h1 class="text-secondary text-center">電波ラジ</h1>
    </div>
    <div class="d-flex flex-wrap justify-content-evenly flex-row mb-5 pb-5">
        <div class="my-2">
            <IframeComponent />
        </div>
        <div class="my-2">
            <ChatBox />
        </div>
    </div>
</template>

  
<script>
import ChatBox from '../components/ChatBox.vue';
import IframeComponent from '../components/IframeComponent.vue';
export default {
    components: { ChatBox, IframeComponent }
}
</script>

