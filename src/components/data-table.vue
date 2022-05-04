<template>
  <div class="bg-white table-wrapper rounded-lg max-w-full overflow-x-auto">
    <template>
      <table-header :table_headers="table_headers" />

      <template v-if="!policies.length">
        <empty-state />
      </template>

      <template v-else>
        <table-body :policies="policies" @navigate="navigateToDetailsPage" />
      </template>
    </template>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
import emptyState from "@/components/empty-state";
import tableBody from "@/components/table-body";
import tableHeader from "@/components/table-header";
export default {
  name: "dataTable",

  components: {
    emptyState,
    tableBody,
    tableHeader,
  },

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
</style>
