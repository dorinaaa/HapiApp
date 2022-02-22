'use strict'
const Wreck = require("@hapi/wreck");

const APIService = {
    getFromAPI: async function (uri, headers = {}) {
        const {res, payload} = await Wreck.get(uri, {
            headers: headers
        });
        return payload.toString();
    }
}

module.exports = APIService
