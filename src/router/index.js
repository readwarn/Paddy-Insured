import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import navLayout from "@/views/layouts/nav-layout";

Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Login",
        component: Login,
    },

    {
        path: "",
        name: "NavLayout",
        component: navLayout,
        children: [{
                path: "/policies/:page",
                name: "Policies",
                component: () =>
                    import ( /* webpackChunkName: "about" */ "../views/Policies.vue"),
                meta: {
                    theme: "dark",
                },
            },

            {
                path: "/policy-detail/:id",
                name: "PolicyDetails",
                component: () =>
                    import ( /* webpackChunkName: "about" */ "../views/PolicyDetails.vue"),
                meta: {
                    theme: "dark",
                },
            },
        ],
    },
    {
        path: "/*",
        name: "LostPage",
        component: () =>
            import ( /* webpackChunkName: "about" */ "../views/LostPage.vue"),
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;