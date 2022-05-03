<template>
  <div class="bg-white table-wrapper rounded-lg max-w-full overflow-x-auto">
    <template>
      <div class="table-columns p-3 bg-gray-100 border-b border-gray-400">
        <div
          v-for="(title, index) in table_headers"
          :key="index"
          class="text-sm font-semibold"
        >{{ title }}</div>
      </div>

      <template v-if="!policies.length">
        <div class="empty-cell space-y-7">
          <img
            class="w-32 h-32 md:w-40 md:h-40"
            src="https://img.freepik.com/free-vector/hand-holding-empty-wallet-with-coin-web-spider-inside-financial-problem-cartoon-illustration-vector_201904-407.jpg?w=740"
            alt="empty"
          />
          <p class="text-lg text-gray-600">No Match Found!!!</p>
        </div>
      </template>

      <div class="table-body" v-else>
        <div
          class="table-columns p-3 border-b border-gray-400 even:bg-gray-100 text-sm cursor-pointer hover:border-blue-400"
          v-for="policy in policies"
          :key="policy.id"
          @click="navigateToDetailsPage(policy)"
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
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
export default {
  name: "dataTable",

  props: {
    policies: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      table_headers: ["Status", "Provider", "Policy Number", "Type"],
    };
  },

  methods: {
    ...policies.mapMutations(["SET_POLICY_DETAIL"]),

    navigateToDetailsPage(policy) {
      this.SET_POLICY_DETAIL(policy);

      let page = this.$route.params.page;

      this.$router.push({
        name: "PolicyDetails",
        query: { page },
        params: { id: policy.id },
      });
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  height: 100%;
}

.table-wrapper::-webkit-scrollbar {
  height: 3px;
}

.table-wrapper::-webkit-scrollbar-track {
  background: #d1d5db;
}

.table-wrapper::-webkit-scrollbar-thumb {
  background: #6b7280;
}

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

.empty-cell {
  width: 100%;

  height: calc(100% - 55px);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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
</style>
