import policies from "@/store/policy/policies";

export default {
    fetchAllPolicies: ({ commit }) => {
        commit("UPDATE_POLICY_LIST", policies);
        return policies;
    },
};