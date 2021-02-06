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
  <div class="d-flex justify-content-center">
    <div>
      <div title="profileId" class="bg-dark w-25 d-flex align-items-center p-3 my-3 text-white-50 bg-purple rounded shadow-sm">
        <svg width="48" height="48" viewBox="0 0 16 16" class="mr-3" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
        </svg>
        <div class="lh-100">
          <h6 class="mb-0 text-white lh-100">profileName</h6>
          <small>version</small>
        </div>
      </div>
    </div>
    <div>

    </div>
  </div>
</template>

<script>
import Constant from "@/computes/const";

export default {
  name: Constant.ROUTER_TAG_DASHBOARD,
};
</script>
