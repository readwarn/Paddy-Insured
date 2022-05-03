import Vue from "vue";
import Vuex from "vuex";
import policies from "@/store/policy";

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        policies,
    },
});