/*jshint esversion: 8 */

/*
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
*/

import Vue from "vue";
import VueRouter from "vue-router";

import Constant from "@/computes/const";

import Dashboard from "@/views/Dashboard.vue";
import Login from "@/views/Login.vue";
import Contacts from "@/views/Contacts.vue";
import Settings from "@/views/Settings.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: Constant.ROUTER_TAG_DASHBOARD,
    component: Dashboard,
  },
  {
    path: "/login",
    name: Constant.ROUTER_TAG_LOGIN,
    component: Login,
  },
  {
    path: "/contacts",
    name: Constant.ROUTER_TAG_CONTACTS,
    component: Contacts,
  },
  {
    path: "/settings",
    name: Constant.ROUTER_TAG_SETTINGS,
    component: Settings,
  },
  {
    path: "/about",
    name: Constant.ROUTER_TAG_ABOUT,
    component: About,
  },
  {
    path: "*",
    component: NotFound,
  },
];

const Router = new VueRouter({
  routes,
});

export default Router;
