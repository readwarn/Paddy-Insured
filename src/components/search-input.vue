<template>
  <div class="w-full input-wrapper relative rounded-md">
    <input
      v-model="search"
      @input="$emit('input',search)"
      placeholder="Filter Policies..."
      type="text"
      class="position-absoloute w-full bg-gray-50 pl-10 py-2 outline-none rounded-md border-2 focus:border-blue-400 text-sm"
    />

    <span class="icon icon-search text-xl text-gray-500 z-10 left-0 absolute ml-3 top-3"></span>

    <span
      @click="clearSearch"
      v-if="search"
      class="icon icon-close text-lg text-gray-500 z-10 right-2 absolute top-3"
    ></span>
  </div>
</template>

<script>
export default {
  name: "InputSearch",

  data: () => {
    return {
      search: "",
    };
  },

  methods: {
    clearSearch() {
      this.search = "";
      this.$emit("input", "");
    },
  },
};
</script>

<style>
</style>