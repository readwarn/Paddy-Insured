import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "../src/assets/css/style.css";
import "../src/assets/fonts/index.css";

let bus = new Vue();
Vue.prototype.$bus = bus;

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");