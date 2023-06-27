import { defineStore } from 'pinia'
import axios from 'axios'
const BASE_URL = 'https://authar.site'
import socketIO from 'socket.io-client';
import Swal from 'sweetalert2';
const socket = socketIO.connect(BASE_URL);

export const useChatStore = defineStore('chat', {
    state: () => ({
        messages: [
            // { user: 'Alice', text: 'Hello!', timestamp: new Date() },
            // { user: 'Bob', text: 'Hi, Alice!', timestamp: new Date() },
            // More messages...
        ],
        onlineUsers: [],
        username: ''
    }),
    actions: {
        getFormattedTime(date) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        },
        newMessageSubmit(message) {
            if (message.trim() !== '') {
                socket.emit('message', {
                    user: this.username,
                    text: message,
                    timestamp: this.getFormattedTime(new Date())
                });
            }
        },
        initializeSocketListeners() {
            socket.on('messageResponse', (data) => {
                console.log('message received: ', data.text);
                this.messages.push({
                    user: data.user,
                    text: data.text,
                    timestamp: data.timestamp,
                });
            });
            socket.on('newUserResponse', (data) => {
                this.onlineUsers = data.map(user => user.username);
            });
            socket.on('userSeed', (data) => {
                this.onlineUsers = data.map(user => user.username);
            })
        },
        setUsername(value) {
            console.log(this.onlineUsers, 'onlineUsers');
            console.log(value, 'newUsername');
            if (this.onlineUsers.find(el => el === value)) {
                Swal.fire({
                    icon: 'error',
                    title: 'Username already taken',
                })
            }
            else {
                this.username = value;
                socket.emit('newUser', { username: value, socketID: socket.id });
            }
        },
        async discordUsername(token, type) {
            const { data } = await axios.get('https://discord.com/api/users/@me', {
                headers: {
                    authorization: `${type} ${token}`,
                }
            });
            console.log(token, type);
            console.log(data);
            if (data) this.setUsername(data.username);
        }
    },
})
