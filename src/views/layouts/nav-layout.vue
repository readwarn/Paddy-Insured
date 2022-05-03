<template>
  <div class="nav-layout">
    <div class="text-center bg-white border p-3 md:py-3 md:px-16 grid grid-cols-2 items-center">
      <div class="flex items-center">
        <h2 class="font-semibold text-lg mr-4 hidden sm:block">Paddy Cover</h2>
        <span class="icon icon-logo text-3xl text-green-500"></span>
      </div>

      <h2 class="font-semibold text-md text-right" v-if="getUsername">{{getUsername}}</h2>

      <router-link :to="{name:'Login'}" class="font-semibold text-md text-right" v-else>Login</router-link>
    </div>

    <router-view></router-view>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
export default {
  name: "NavLayout",

  computed: {
    ...policies.mapGetters(["getUsername"]),
  },
};
</script>

<style></style>
