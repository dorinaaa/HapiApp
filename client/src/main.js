import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import VueAxios from 'vue-axios'
import VueAuthenticate from 'vue-authenticate'
import axios from "axios";
import BootstrapVue from "bootstrap-vue";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(VueAxios, axios)
Vue.use(VueAuthenticate, {
    baseUrl: 'http://localhost:3000', // Your API domain

    // TODO:: store in .env the client id
    providers: {
        github: {
            name: 'github',
            clientId: '4d23f04c299e525bb98e',
            url: 'http://localhost:3000/auth/github',
            authorizationEndpoint: 'https://github.com/login/oauth/authorize',
            redirectUri: 'http://localhost:8080/auth/callback',
            optionalUrlParams: [],
            scope: ['user:email'],
            scopeDelimiter: ' ',
            oauthType: '2.0',
            popupOptions: { width: 1020, height: 618 },
        },
    }
})


import store from "./store/index";

Vue.config.productionTip = false;

Vue.use(BootstrapVue);

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount("#app");