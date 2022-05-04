<template>
  <div class="table-columns p-3 bg-gray-100 border-b border-gray-400">
    <div
      v-for="(title, index) in table_headers"
      :key="index"
      class="text-sm font-semibold"
    >{{ title }}</div>
  </div>
</template>

<script>
export default {
  name: "TableHeader",

  props: {
    table_headers: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
</style>