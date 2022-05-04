<template>
  <div class="layou relative h-screen" v-if="getDetailedPolicy">
    <button
      @click="goBack"
      class="rounded-3xl sm:py-0.5 px-3 sm:px-5 border-2 border-gray-600 fixed left-5 :sm:left-10 top-10 sm:top-30 transition-colors mt-8 hover:border-blue-300 hover:text-gray-500"
    >
      <span class="icon icon-caret-left text-2xl relative top-0.5"></span>

      <span class="relative -top-1">Back</span>
    </button>

    <div
      class="bg-white rounded-lg p-3 sm:p-5 w-11/12 sm:w-9/12 md:w-8/12 mx-auto grid place-items-center top-16 sm:top-18 relative"
    >
      <h2 class="font-2xl font-bold mb-1 text-center">{{getDetailedPolicy.provider}}</h2>

      <p class="mb-1 text-gray-700">{{getDetailedPolicy.type}} Insurance</p>

      <p class="mb-6 text-gray-700">{{getDetailedPolicy.policyNumber}}</p>

      <img class="w-48 h-48 mx-auto" :src="getInsuranceImage" alt />

      <p class="text-gray-700">{{ getDetailedPolicy.isActive ? 'Active':'Inactive'}}</p>

      <span
        class="icon text-2xl xs:text-4xl state-icon"
        :class="[getDetailedPolicy.isActive && 'icon-published text-green-400',!getDetailedPolicy.isActive && 'icon-unpublished text-red-400']"
      ></span>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const policies = createNamespacedHelpers("policies");
export default {
  name: "DetailsPage",

  computed: {
    ...policies.mapGetters(["getDetailedPolicy", "getPolicies"]),

    getInsuranceImage() {
      return this.insurance_types[this.getDetailedPolicy.type?.toLowerCase()];
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

  data() {
    return {
      //image for each insurance type
      insurance_types: {
        life: "https://img.freepik.com/free-vector/person-doing-exercise-around-heart-online-fitness-concept_24908-58987.jpg?t=st=1651618030~exp=1651618630~hmac=e13f1db2e24e49f761f03b024602fde9d581cf38bf7653f7c19bc05180d3daf9&w=740",
        travel:
          "https://img.freepik.com/free-vector/vacation-holidays-background-with-realistic-globe-suitcase-photo-camera_1284-10476.jpg?t=st=1651612546~exp=1651613146~hmac=320c1bd899223e7a5929e82066ef6bfd3f34dd5ff3eeb490810bc83676b01857&w=740",
        health:
          "https://img.freepik.com/free-vector/doctor-concept-illustration_114360-1072.jpg?t=st=1651618428~exp=1651619028~hmac=86d55fab1e17153ed63ae423b4b48a39f0ef0884dc75c45147433df1c7deeca9&w=740",
        mobile:
          "https://img.freepik.com/free-vector/digital-device-mockup-set_53876-89347.jpg?t=st=1651618502~exp=1651619102~hmac=1439171aba170b2d2e50d7bafcd999f6bb98d997e54e44f902c699db25c2f9b2&w=740",
        vehicle:
          "https://img.freepik.com/free-vector/old-red-truck-white-background_1308-105948.jpg?t=st=1651618532~exp=1651619132~hmac=57ad04c4e60db0e797c0347dbe7c5174c9d7fb12eba8c8aa3f91be10c35f7438&w=996",

        home: "https://img.freepik.com/free-vector/inspiration-big-house-vector-design_638353-14.jpg?w=740",
      },
    };
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
.state-icon {
  left: calc(100% - 30px);
  top: 10px;
  position: absolute;
}

@media screen and (min-width: 400px) {
  .state-icon {
    left: calc(100% - 50px);
    top: 10px;
    position: absolute;
  }
}
</style>
