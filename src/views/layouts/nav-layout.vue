<template>
  <div class="nav-layout">
    <div
      class="z-30 text-center bg-white border p-3 md:py-3 md:px-16 grid grid-cols-2 items-center fixed w-full top-0 left-0"
    >
      <router-link :to="{name:'Login'}">
        <div class="flex items-center cursor-pointer group">
          <h2
            class="font-semibold text-lg mr-4 hidden sm:block group-hover:text-gray-600"
          >Paddy Cover</h2>
          <span class="icon icon-logo text-3xl text-green-600 group-hover:text-green-400"></span>
        </div>
      </router-link>

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
