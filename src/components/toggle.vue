<template>
  <div
    class="w-full px-2 py-2 rounded-3xl cursor-pointer transition-colors duration-200 flex relative"
    :class="getBg"
  >
    <div class="text-center w-1/3 text-sm font-semibold z-10" @click="toggleState('all')">All</div>
    <div class="text-center w-1/3 text-sm font-semibold z-10" @click="toggleState('active')">Active</div>
    <div
      class="text-center w-1/3 text-sm font-semibold z-10"
      @click="toggleState('inactive')"
    >InActive</div>

    <div
      class="left-1 top-1 bg-white h-7 w-1/3 rounded-full absolute transition-position duration-300"
      :class="[
        isActive && 'active-toggle-ring',
        isInactive && 'inactive-toggle-ring ',
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: "Toggle",

  computed: {
    getBg() {
      switch (this.status) {
        case "all":
          return "bg-gray-300";
        case "active":
          return "bg-green-300";
        case "inactive":
          return "bg-red-400";
        default:
          return "bg-gray-100";
      }
    },

    isActive() {
      return this.status === "active";
    },

    isInactive() {
      return this.status === "inactive";
    },
  },

  data() {
    return {
      status: "all",
    };
  },

  methods: {
    toggleState(status) {
      this.status = status;
      this.$emit("input", status);
    },
  },
};
</script>

<style scoped>
.active-toggle-ring {
  left: 50%;
  transform: translateX(calc(-50% - 2px));
}

.inactive-toggle-ring {
  left: 100%;
  transform: translateX(calc(-100% - 5px));
}
</style>
