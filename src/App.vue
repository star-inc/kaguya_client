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
    <Console v-else />
  </div>
</template>

<script>
import Constant from "@/computes/const";

import Loader from "@/components/App/Loader.vue";
import Console from "@/components/App/Console.vue";

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
    verified() {
      return this.$store.state.verified;
    },
  },
  watch:{
    $route(){
      this.checkVerify();
    }
  },
  methods: {
    checkVerify() {
      if(this.$route.name === Constant.ROUTER_TAG_ABOUT) return;
      if (this.$store.state.authorization.length) {
        const authorized_key = this.$store.state.authorization;
        axios.post(Constant.API_VERIFY_POINT, {
          "authToken": authorized_key
        })
            .then((xhr) => console.log(xhr));
        this.$store.commit("setVerified");
      } else {
        if(this.$route.name !== Constant.ROUTER_TAG_LOGIN){
          this.$router.push({
            name: Constant.ROUTER_TAG_LOGIN
          })
        }
      }
    }
  },
  created() {
    this.checkVerify();
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
  margin:0 auto;
}
</style>
