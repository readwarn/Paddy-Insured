<template>
  <div class="w-full h-screen bg-gray-200 login-layout gap-10">
    <h4 class="text-2xl sm:text-3xl text-center font-bold self-end">Welcome to Paddy Cover</h4>

    <div
      class="form self-start w-11/12 px-3 py-8 sm:px-4 sm:py-10 sm:w-9/12 lg:w-6/12 xl:w-5/12 bg-white rounded-md mx-auto"
    >
      <h3 class="font-bold text-xl md:text-2xl text-center mb-6">Log in to your account</h3>

      <input
        type="text"
        placeholder="Enter your username"
        class="w-full h-10 p-2 bg-gray-200 mb-4 rounded-md"
        v-model="username"
        @keyup.enter="register"
      />

      <button
        :disabled="!username"
        @click="register"
        class="bg-blue-500 rounded-md text-white text-lg font-semibold w-full h-10 disabled:bg-blue-300"
      >Continue</button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
export default {
  name: "Login",

  data() {
    return {
      username: "",
    };
  },

  watch: {
    getUsername: {
      handler(name) {
        console.log("username gotten");
        this.username = name;
      },
      immediate: true,
    },
  },

  computed: {
    ...policies.mapGetters(["getUsername"]),
  },

  methods: {
    ...policies.mapMutations(["SET_USER_NAME"]),

    register() {
      // register and save username

      localStorage.setItem("username", this.username);
      this.SET_USER_NAME(this.username);
      this.$router.push({ name: "Policies", params: { page: 1 } });
    },
  },
};
</script>

<style scoped>
.login-layout {
  display: grid;
  grid-template-rows: 100px 1fr;
}
</style>
