export default {
    UPDATE_POLICY_LIST: (state, policies) => (state.policies = policies),
    SET_POLICY_DETAIL: (state, policy) => (state.policy_detail = policy),
    SET_USER_NAME: (state, name) => (state.username = name),
};