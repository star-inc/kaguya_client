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
      :current-user-id="currentUserId"
      :messages="messages"
      :rooms="rooms"
      height="90vh"
  />
</template>

<script>
import Constant from "@/data/const";

import ChatWindow from 'vue-advanced-chat'
import 'vue-advanced-chat/dist/vue-advanced-chat.css'

export default {
  name: Constant.ROUTER_TAG.DASHBOARD,
  components: {
    ChatWindow,
  },
  data() {
    return {
      rooms: [
        {
          roomId: 1,
          roomName: 'Room 1',
          avatar: '/static/avatar.svg',
          unreadCount: 4,
          index: 3,
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
              _id: 4321,
              username: 'John Snow',
              avatar: '/static/avatar.svg',
              status: {
                state: 'offline',
                last_changed: '14 July, 20:00'
              }
            }
          ],
          typingUsers: [4321]
        }
      ],
      messages: [
        {
          _id: 7890,
          content: 'message 1',
          sender_id: 1234,
          username: 'John Doe',
          date: '13 November',
          timestamp: '10:20',
          system: false,
          saved: true,
          distributed: true,
          seen: true,
          disable_actions: false,
          disable_reactions: false,
          file: {
            name: 'My File',
            size: 67351,
            type: 'svg',
            audio: true,
            duration: 14.4,
            url: '/static/avatar.svg'
          },
          reactions: {
            wink: [
              1234,
              4321
            ],
            laughing: [
              1234
            ]
          }
        }
      ],
      currentUserId: this.$store.state.username
    }
  }
};
</script>
