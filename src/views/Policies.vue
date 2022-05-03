<template>
  <div class="layout max-w-full">
    <div class="data-wrapper flex flex-col max-w-full overflow-x-auto">
      <div
        class="flex flex-wrap justify-between gap-2 sm:gap-6 mb-4 sm:flex-nowrap sm:justify-between"
      >
        <div class="w-full input-wrapper relative rounded-md">
          <input
            v-model="search"
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

        <div class="toggle-wrapper">
          <toggle v-model="status" />
        </div>
      </div>

      <template v-if="getPolicies.length">
        <data-table :policies="getFilteredPolicies" />
      </template>
    </div>
    <paginator />
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
import paginator from "@/components/paginator";
import dataTable from "@/components/data-table";
import toggle from "@/components/toggle";
export default {
  name: "Test",

  components: {
    paginator,
    dataTable,
    toggle,
  },

  computed: {
    ...policies.mapGetters(["getPolicies"]),

    getStartIndex() {
      // start index to slice the list of policies from
      return (Number(this.$route.params.page) - 1) * 20;
    },

    getEndIndex() {
      // slice 20 items per page
      return this.getStartIndex + 20;
    },

    getPoliciesByPage() {
      // returns at most 20 items from the policy list
      return this.getPolicies.slice(this.getStartIndex, this.getEndIndex);
    },

    getFilteredPolicies() {
      //filter policy list based on the search keyword and the activeness state [active or inactive or all]
      return this.getPoliciesByPage?.filter((policy) => {
        return (
          this.filterByStatus(policy) &&
          (this.filterByMatch(policy, "provider") ||
            this.filterByExact(policy, "policyNumber") ||
            this.filterByExact(policy, "type"))
        );
      });
    },
  },

  mounted() {
    //fetches the policy list from the mocked data, only if
    // it is not saved in store yet
    if (!this.getPolicies?.length) this.fetchAllPolicies();
  },

  data() {
    return {
      status: "all",
      search: "",
    };
  },

  methods: {
    ...policies.mapActions(["fetchAllPolicies"]),

    filterByMatch(policy, key) {
      // returns true if the search string matches a part of the policy key
      return policy[key].toLowerCase().includes(this.search.toLowerCase());
    },

    filterByExact(policy, value) {
      return `${policy[value]}`
        .toLowerCase()
        .includes(this.search.toLowerCase());

      // return `${policy[value]}`.toLowerCase() === this.search.toLowerCase();
    },

    filterByStatus(policy) {
      switch (this.status) {
        case "all":
          return true;
        case "active":
          return policy.isActive;
        case "inactive":
          return !policy.isActive;
        default:
          return false;
      }
    },

    clearSearch() {
      this.search = "";
    },
  },
};
</script>

<style scoped>
.layout {
  display: grid;
  height: calc(100vh - 60px);
  grid-template-rows: 1fr auto;
}

.data-wrapper {
  width: 60%;
  margin: auto;
  height: calc(100vh - 140px);
}

.toggle-wrapper {
  /* width: max-content; */
  width: 450px;
  display: flex;
  align-items: center;
}

@media screen and (max-width: 1100px) {
  .data-wrapper {
    width: 70%;
  }
}

@media screen and (max-width: 930px) {
  .data-wrapper {
    width: 79%;
  }
}

@media screen and (max-width: 730px) {
  .data-wrapper {
    width: 83%;
  }
}

@media screen and (max-width: 600px) {
  .data-wrapper {
    width: 95%;
  }
}

@media screen and (max-width: 400px) {
  .data-wrapper {
    width: 97%;
  }
}
</style>
