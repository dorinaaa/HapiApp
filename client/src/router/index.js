import Vue from "vue";
import VueRouter from "vue-router";
import ProfileView from "@/views/ProfileView";
import LoginView from "@/views/LoginView";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "login",
        component: LoginView
    },
    {
        path: "/profile",
        name: "profile",
        component: ProfileView,
        meta: {
            requiresAuth: true
        }
    },
];

const router = new VueRouter({
    mode: "history",
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
                path: "/"
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;