<template>
    <div class="d-flex">
        <div class="card me-3" style="width: 200px;" v-if="username">
            <div class="card-header">
                Online Users
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="(user, index) in onlineUsers" :key="index">{{ user }}</li>
            </ul>
        </div>

        <div class="card">
            <div class="card-header">
                Chat Box
            </div>
            <div v-if="username" class="card-body chat-body ">
                <div class="overflow-auto chat-messages d-flex flex-column" id="chat-box">
                    <div v-for="(message, index) in messages" :key="index" class="chat-message mb-2" :class="{ 'align-self-end': message.user === username }">
                        <div class="fw-bold mb-1">{{ message.user }}</div>
                        <div class="bubble text-wrap" :class="{ 'user-message': message.user === username }" style="width: 12rem;">
                            {{ message.text }}
                            <span class="timestamp">{{ message.timestamp }}</span>
                        </div>
                    </div>
                    <div id="anchor"></div>
                </div>
                <form @submit.prevent="handleSendMessage">
                    <div class="input-group mt-3">
                        <input v-model="newMessage" type="text" class="form-control" placeholder="Type your message...">
                        <button type="submit" class="btn btn-primary">Send</button>
                    </div>
                </form>
            </div>
            <div v-else>
                <form @submit.prevent="handleSetUsername" class="m-3">
                    <div class="mb-3">
                        <label for="usernameInput" class="form-label">Enter a username</label>
                        <input type="text" class="form-control" id="usernameInput" autocomplete="off" v-model="newUsername">
                    </div>
                    <div class="d-flex justify-content-evenly">
                        <button type="submit" class="btn btn-primary">Submit</button>
                        <a href="https://discord.com/api/oauth2/authorize?client_id=1115914838921707530&redirect_uri=https%3A%2F%2Fdenparadio.web.app%2F&response_type=token&scope=identify">
                            <button type="button" class="btn btn-secondary">Discord Login</button>
                        </a>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>
  
<script>
import { mapActions, mapState } from 'pinia';
import { useChatStore } from '../stores/chat';

export default {
    data() {
        return {
            newMessage: '',
            newUsername: ''
        };
    },
    computed: {
        ...mapState(useChatStore, ['messages', 'onlineUsers', 'username'])
    },
    methods: {
        ...mapActions(useChatStore, ['newMessageSubmit', 'setUsername']),
        handleSendMessage() {
            this.newMessageSubmit(this.newMessage);
            this.newMessage = '';
        },
        handleSetUsername() {
            this.setUsername(this.newUsername);
        }
    },
    created: function () {
        const chatStore = useChatStore();
        chatStore.initializeSocketListeners();
        chatStore.messages = chatStore.messages.map(message => {
            message.timestamp = chatStore.getFormattedTime(message.timestamp);
            return message;
        })
        document.scrollingElement.scroll(0, 1);
        if(this.$route.hash) {
            const fragment = new URLSearchParams(window.location.hash.slice(1));
            const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];
            chatStore.discordUsername(accessToken, tokenType);
        }
    }
};
</script>
  
<style scoped>
.chat-body {
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.chat-messages {
    height: calc(100% - 60px);
}

#chat-box * {
    overflow-anchor: none;
}

#anchor {
    overflow-anchor: auto;
    height: 1px;
}


.chat-message {
    padding: 10px;
    border-radius: 5px;
}

.bubble {
    padding: 10px;
    background-color: palegoldenrod;
    border-radius: 10px;
    display: inline-block;
}

.timestamp {
    font-size: 0.8rem;
    color: #888;
    margin-left: 10px;
}
.user-message{
    background-color: paleturquoise;
}
</style>
  
  