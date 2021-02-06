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
  <div class="text-center">
    <form class="form-signin"><img alt="" class="mb-4" height="72" src="@/assets/logo.svg" width="72">
      <h1 class="h3 mb-3 font-weight-normal">Login</h1>
      <p class="text-danger">{{ status }}</p>
      <label class="sr-only" for="inputUser">Username</label>
      <input id="inputUser" v-model="username" autofocus class="form-control" placeholder="Username" required
             type="text">
      <label class="sr-only" for="inputPassword">Password</label>
      <input id="inputPassword" v-model="password" class="form-control" placeholder="Password" required type="password">
      <div class="checkbox mb-3"><label><input type="checkbox" value="remember-me"> Remember me</label></div>
      <button class="btn btn-lg btn-primary btn-block" type="submit" @click.prevent="login">Sign in</button>
      <p class="mt-5 mb-3 text-muted">Kaguya</p></form>
  </div>
</template>

<script>
import Constant from "@/computes/const.js";

import axios from "axios";

export default {
  name: "Login",
  methods: {
    login() {
      axios.post(Constant.API_AUTHORIZE_POINT, {
        "username": this.username,
        "password": this.password
      })
          .then(xhr => {
            const result = xhr.data;
            if (result.status === 200) {
              this.status = "Success";
              this.$store.commit("setAuthorization", result.reason)
              this.$router.push({name: Constant.ROUTER_TAG_DASHBOARD})
            } else {
              this.status = result.reason;
              this.password = "";
            }
          })
    }
  },
  data() {
    return {
      status: "",
      username: "",
      password: ""
    }
  }
}
</script>
