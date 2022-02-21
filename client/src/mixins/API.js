import Vue from "vue";

const API_URL = 'http://localhost:3000'

Vue.mixin({
    methods: {
        getFromAPI: function (path, token) {
            return fetch(API_URL + path,
                {
                    method: "get",
                    headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"},
                }).then(response => response.json())
        },
        postDataToAPI: function (path, body) {
            return fetch( API_URL + path,
                {
                    method: "post",
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify(body)
                })
        }
    }
})

