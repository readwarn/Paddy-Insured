<template>
  <div class="layout relative">
    <div class="data-wrapper flex flex-col max-w-full overflow-x-auto">
      <div class="filter-row mb-5">
        <div class="search-wrapper">
          <search-input v-model="search" />
        </div>

        <div class="toggle-wrapper">
          <toggle v-model="status" />
        </div>

        <div class="flex justify-end">
          <custom-select :options="insurance_types" v-model="type" />
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
import customSelect from "@/components/custom-select";
import searchInput from "@/components/search-input";
export default {
  name: "Test",

  components: {
    paginator,
    dataTable,
    toggle,
    customSelect,
    searchInput,
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
          this.filterByExact(policy) &&
          (this.filterByMatch(policy, "provider") ||
            this.filterByMatch(policy, "policyNumber"))
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
      type: "life",
      insurance_types: [
        "life",
        "travel",
        "health",
        "mobile",
        "vehicle",
        "home",
      ],
    };
  },

  methods: {
    ...policies.mapActions(["fetchAllPolicies"]),

    filterByMatch(policy, key) {
      // returns true if the search string matches a part of the policy key
      return `${policy[key]}`.toLowerCase().includes(this.search.toLowerCase());
    },

    filterByExact(policy) {
      // returns true if the selected type is 'all'
      // returns true if the insurance type of the policy is exactly the same as the current selected type
      return this.type === "all"
        ? true
        : policy.type.toLowerCase() === this.type.toLowerCase();
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
  top: 35px;
}

.data-wrapper {
  width: 60%;
  margin: auto;
  height: calc(100vh - 170px);
}

.filter-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  position: relative;
}

.search-wrapper {
  width: calc(100% - 130px);
}

.toggle-wrapper {
  display: flex;
  align-items: center;
  left: 50%;
  transform: translateX(-50%);
  width: 230px;
  position: absolute;
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

@media screen and (max-width: 880px) {
  .data-wrapper {
    width: 81%;
  }

  .search-wrapper {
    width: 100%;
  }

  .toggle-wrapper {
    position: relative;
    margin-top: 20px;
    grid-column: 1 / -1;
    order: 3;
  }
  .filter-row {
    grid-template-columns: 1fr 1fr;
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
  .layout {
    height: calc(100vh - 60px);
    top: 15px;
  }
}

@media screen and (max-width: 400px) {
  .filter-row {
    grid-template-columns: 2.4fr 1fr;
  }
}
</style>
