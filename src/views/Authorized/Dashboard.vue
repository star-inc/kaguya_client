<!--
    Kaguya - The opensource instant messaging framework.
    ---
    Copyright 2020 Star Inc.(https://starinc.xyz)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
-->

<template>
  <chat-window
      :current-user-id="$store.state.username"
      :messages="messages"
      :messages-loaded="true"
      :rooms-loaded="true"
      :rooms="rooms"
      height="90vh"
      @send-message="sendMessage"
  />
</template>

<script>
import Constant from "@/data/const";

import TalkService from "@/computes/TalkService"

import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  name: Constant.ROUTER_TAG.DASHBOARD,
  components: {
    ChatWindow,
  },
  data() {
    return {
      client: null,
      rooms: [
        {
          roomId: 1,
          roomName: 'Room 1',
          avatar: '/static/avatar.svg',
          unreadCount: 0,
          index: 1,
          lastMessage: {
            content: 'Last message received',
            sender_id: 1234,
            username: 'John Doe',
            timestamp: '10:20',
            saved: true,
            distributed: false,
            seen: false,
            new: true
          },
          users: [
            {
              _id: 1234,
              username: 'John Doe',
              avatar: '/static/avatar.svg',
              status: {
                state: 'online',
                last_changed: 'today, 14:30'
              }
            },
            {
              _id: 12342,
              username: 'John Doe',
              avatar: '/static/avatar.svg',
              status: {
                state: 'online',
                last_changed: 'today, 14:30'
              }
            },
          ],
          typingUsers: []
        }
      ],
      messages: [],
      currentUserId: this.$store.state.username
    }
  },
  methods: {
    sendMessage({roomId, content}) {
      this.client.sendTextMessage(roomId.toString(), content);
    },
    syncMessage(){
      const timestamp = new Date().getDate();
      this.client.getHistoryMessage(timestamp, 50);
    },
    receivedMessageFactory(operation) {
      if (!("new_val" in operation)) return ;
      const event = operation.new_val;
      return {
        _id: event.id,
        content: event.message.content,
        sender_id: event.message.origin,
        username: event.message.origin,
        date: '13 November',
        timestamp: '10:20',
        system: false,
        saved: true,
        distributed: true,
        seen: true,
        disable_actions: false,
        disable_reactions: false,
        file: null,
        reactions: null
      }
    }
  },
  created() {
    this.client = new TalkService(Constant.API_POINT.TALK + "/admin", "kaguya_test");
    this.client.setOnMessageHandle(
        (operation) => this.messages.push(this.receivedMessageFactory(operation))
    );
  }
};
</script>
