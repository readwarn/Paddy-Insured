<template>
  <div
    class="details-layout py-0.5 px-4 mx-auto w-full xl:w-7/12 xl:max-w-3xl lg:w-8/12 lg:max-w-2xl md:w-11/12 md:max-w-xl sm:w-11/12 sm:w-max-xl relative -top-15"
    v-if="getDetailedPolicy"
  >
    <button
      @click="goBack"
      class="mb-5 border-2 bg-blue-200 border-gray-400 flex items-center pr-4 pl-1 py-1 rounded-3xl hover:border-transparent group hover:bg-blue-400 transition fixed z-10"
    >
      <span class="icon icon-caret-left text-2xl mt-1 text-gray-600 group-hover:text-white"></span>
      <span class="text-sm text-gray-600 group-hover:text-white">Back</span>
    </button>

    <div></div>

    <div class="top-12 relative pb-14 sm:pb-0 w-full">
      <div class="photos-gallery mx-auto">
        <div
          class="shadow-md border-2 rounded-md"
          :class="[getDetailedPolicy.isActive && 'border-green-500',!getDetailedPolicy.isActive && 'border-red-400']"
          v-for="(image,index) in getTypeImages"
          :key="index"
        >
          <img :src="image" alt="insured-image" />
        </div>
      </div>

      <h3 class="mt-6 text-3xl font-bold">{{getDetailedPolicy.type}} Insurance</h3>

      <p class="text-md text-gray-600 mb-5">
        by
        <span class="font-semibold">{{getDetailedPolicy.provider}}</span>
      </p>

      <div class="flex items-center gap-x-2 mb-3">
        <p class="text-md text-gray-800 w-28 xs:w-32">Status</p>
        <div class="bg-gray-600 h-0.5 top-0.5 relative w-48 xs:w-52 mr-2"></div>
        <p
          class="font-semibold"
          :class="[getDetailedPolicy.isActive && 'text-green-500',!getDetailedPolicy.isActive && 'text-red-500']"
        >{{getDetailedPolicy.isActive ? 'Active':'Inactive'}}</p>
      </div>

      <div class="flex items-center gap-x-2">
        <p class="text-md text-gray-800 w-28 xs:w-32">Policy Number</p>
        <div class="bg-gray-600 h-0.5 top-0.5 relative w-48 xs:w-52 mr-2"></div>
        <p class="font-semibold">{{getDetailedPolicy.policyNumber}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import types from "@/store/insurance-types";
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
export default {
  name: "DetailsPage",

  computed: {
    ...policies.mapGetters(["getDetailedPolicy", "getPolicies"]),

    getTypes() {
      // A JSON data of image list for each type of insurance
      return types;
    },

    getTypeImages() {
      // list of three images based on insurance type
      return this.getTypes[this.getDetailedPolicy.type.toLowerCase()];
    },
  },

  watch: {
    $route: {
      handler() {
        if (this.getDetailedPolicy) return;
        this.fetchAllPolicies();
        let policy = this.getPolicies.find(
          (policy) => policy.id === this.$route.params.id
        );
        this.SET_POLICY_DETAIL(policy);
      },
      immediate: true,
    },
  },

  methods: {
    ...policies.mapActions(["fetchAllPolicies"]),
    ...policies.mapMutations(["SET_POLICY_DETAIL"]),

    goBack() {
      // go back to previous [goes back to exact page number if the page was passed as a query param]
      let page = this.$route?.query?.page;
      this.$router.push({
        name: "Policies",
        params: { page: page ? page : 1 },
      });
    },
  },
};
</script>

<style scoped>
.photos-gallery {
  display: grid;
  grid-template-columns: 5.5fr 4.5fr;
  grid-template-rows: repeat(2, minmax(0, 1fr));
  gap: 15px;
  place-items: center;
  width: 100%;
  height: 260px;
  margin: auto;
}

.photos-gallery div {
  width: 100%;
  height: 100%;
}

.photos-gallery div img {
  object-fit: cover;
  max-width: 100%;
  width: 100%;
  height: 100%;
  max-height: 100%;
  border-radius: inherit;
}

.photos-gallery div:nth-child(1) {
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
}
.photos-gallery div:nth-child(2) {
  grid-column: 2 / span 1;
  grid-row: 1 / span 1;
}
.photos-gallery div:nth-child(3) {
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
}

@media screen and (max-width: 435px) {
  .photos-gallery {
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
    height: 325px;
  }

  .photos-gallery div:nth-child(1) {
    grid-column: auto;
    grid-row: auto;
  }

  .photos-gallery div:nth-child(2) {
    grid-column: auto;
    grid-row: auto;
  }

  .photos-gallery div:nth-child(3) {
    display: none;
  }
}
</style>
