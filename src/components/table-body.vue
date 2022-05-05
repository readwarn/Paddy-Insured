<template>
  <div class="table-body">
    <div
      class="table-columns p-3 border-b border-gray-400 even:bg-gray-100 text-sm cursor-pointer hover:border-blue-400"
      v-for="policy in policies"
      :key="policy.id"
      @click="$emit('navigate',policy)"
    >
      <div class="flex items-center text-sm">
        <span
          class="icon text-xl mr-2"
          :class="[
                policy.isActive && 'icon-published text-green-400',
                !policy.isActive && 'icon-unpublished text-red-500',
              ]"
        ></span>
        <span>{{ policy.isActive ? "Active" : "Inactive" }}</span>
      </div>

      <div>{{ policy.provider }}</div>
      <div>{{ policy.policyNumber }}</div>
      <div>{{ policy.type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataRow",

  props: {
    policies: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.table-columns {
  display: grid;
  grid-template-columns: 120px minmax(325px, 1fr) 130px 80px;
  min-width: max-content;
  margin: auto;
}

.table-body {
  max-height: calc(100% - 50px);
  min-width: max-content;
  overflow-y: auto;
  margin: auto;
}

.table-body::-webkit-scrollbar {
  width: 3px;
  height: 0;
}

.table-body::-webkit-scrollbar-track {
  background: #d1d5db;
}

.table-body::-webkit-scrollbar-thumb {
  background: #6b7280;
}

@media screen and (max-width: 1100px) {
  .table-columns {
    grid-template-columns: 115px minmax(310px, 1fr) 120px 90px;
  }
}

@media screen and (max-width: 730px) {
  .table-columns {
    grid-template-columns: 110px minmax(310px, 1fr) 110px 100px;
  }
}

@media screen and (max-width: 435px) {
  .table-columns {
    grid-template-columns: 90px minmax(235px, 1fr) 110px 100px;
  }
}
</style>