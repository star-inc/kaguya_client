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
  <div id="app">
    <div v-if="!ready" class="loader">
      <Loader/>
    </div>
    <Console v-else/>
  </div>
</template>

<script>
import Constant from "@/data/const";

import Loader from "@/components/Common/Loader";
import Console from "@/views/Console";

import axios from "axios";

export default {
  name: "App",
  components: {
    Loader,
    Console,
  },
  computed: {
    ready() {
      return this.$store.state.ready;
    },
  },
  watch: {
    $route() {
      this.checkVerify();
    }
  },
  methods: {
    async checkVerify() {
      if (this.$route.name === Constant.ROUTER_TAG.ABOUT) return;
      const status = await this.verify();
      const result = status.data;
      if (result.status === 200) {
        this.$store.commit("setUsername", result.reason);
      } else {
        if (this.$route.name !== Constant.ROUTER_TAG.LOGIN) {
          await this.$router.push({
            name: Constant.ROUTER_TAG.LOGIN
          });
        }
      }
    },
    verify() {
      return new Promise((resolve, reject) => {
        axios.get(
            Constant.API_POINT.VERIFY, {
              withCredentials: true
            })
            .then(resolve)
            .catch(reject);
      })
    }
  },
  async created() {
    await this.checkVerify();
    this.$store.commit("setReady");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.loader {
  width: 10px;
  margin: 0 auto;
}
</style>
