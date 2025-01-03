<template>
  <div>
    <div class="container clearfix">
      <div class="people-list" id="people-list">
        <div class="search">
          <input type="text" placeholder="search" v-model="searchTerm" />
          <i class="fa fa-search"></i>
        </div>
        <ul class="list">
          <li @click.prevent="selectUser(user.id)" v-for="user in filteredUsers" :key="user.id" class="clearfix">
            <img :src="defaultAvatar" alt="avatar" />
            <div class="about">
              <div class="name">{{ user.name }}</div>
              <div class="status">
                <i class="fa fa-circle online"></i> online
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="chat">
        <div class="chat-header clearfix">
          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01_green.jpg" alt="avatar" />
          <div class="chat-about">
            <div class="chat-with">Chat with {{ selectedUserName }}</div>
            <div class="chat-num-messages">{{ messages.length }} messages</div>
          </div>
          <i class="fa fa-star"></i>
        </div>
        <div class="chat-history">
          <ul>
            <li v-for="message in messages" :key="message.id" class="clearfix">
              <div class="message-data" :class="{'align-right': message.form !== currentUser.id}">
                <span class="message-data-time">{{ $filters.formatDate(message.created_at) }}</span>
                <span class="message-data-name">{{ message.user.name }}</span>
                <i :class="{'fa fa-circle me': message.form === currentUser.id, 'fa fa-circle other': message.form !== currentUser.id}"></i>
              </div>
              <div :class="{'message my-message': message.form === currentUser.id, 'message other-message float-right': message.form !== currentUser.id}">
                {{ message.message }}
              </div>
            </li>
          </ul>
        </div>
        <div class="chat-message clearfix">
          <textarea @keydown.enter="sendMessage" v-model="message" name="message-to-send" id="message-to-send" placeholder="Type your message" rows="3"></textarea>
          <i class="fa fa-file-o"></i>&nbsp;&nbsp;&nbsp;
          <i class="fa fa-file-image-o"></i>
          <button @click="sendMessage">Send</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      searchTerm: "",
      message: "",
      defaultAvatar: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg",
      selectedUserName: "",
      currentUser: { id: 1, name: "Olia" },
      selectedUser: null,
    };
  },
  mounted() {
    this.$store.dispatch("fetchUserList");

    Echo.private(`chating.${this.currentUser.id}`).
    listen('MessageSend', (e) => { 
      console.log("event working"); 
      console.log(e.message.message);
      this.selectUser(e.message.to); 
    });


  },
  computed: {
    users() {
      return this.$store.getters.getUsers;
    },
    messages() {
      return this.$store.getters.getMessages;
    },
    filteredUsers() {
      return this.users.filter((user) =>
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    selectUser(userId) {
      this.selectedUser = this.users.find(user => user.id === userId);
      this.selectedUserName = this.selectedUser ? this.selectedUser.name : "User";
      this.$store.dispatch('fetchMessages', userId);
    },
    sendMessage(e) {
      e.preventDefault();
      if (this.selectedUser && this.message.trim() !== "") {
        axios.post("/api/send-message", {
          message: this.message,
          user_id: this.selectedUser.id
        })
        .then(response => {
          // Refresh messages
          this.$store.dispatch('fetchMessages', this.selectedUser.id);
          this.message = "";
        })
        .catch(error => {
          console.error("Error sending message:", error);
        });
      } else {
        console.warn("No user selected or message is empty.");
      }
    }
  }
};
</script>

<style>
/* Add your existing styles here or import them */
</style>
