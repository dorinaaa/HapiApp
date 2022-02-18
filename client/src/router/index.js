import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Register from "../views/RegisterView.vue";
import GithubView from "@/views/GithubView";

Vue.use(VueRouter);

const routes = [
    {
        path: "/me",
        name: "home",
        component: Home,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/register",
        name: "register",
        component: Register
    },
    {
        path: "/auth/callback",
        name: "github",
        component: GithubView
    }
];

const router = new VueRouter({
    mode: "history",
    //base: process.env.VUE_APP_API_ROOT,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.name === from.name) {
        return next();
    }
    next();
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem("user") == null) {
            next({
                path: "/login"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;