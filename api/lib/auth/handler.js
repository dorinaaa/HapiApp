'use strict'
const jwt = require("jsonwebtoken");
const UserService = require('../services/UserService')
const authConfigurations = require('./config')

const Handler = {
    index: {
        cors: {credentials: true},
        handler: function (request, h) {
            try {
                let userData = request.payload.user.userData
                UserService.createOrUpdate(request.mongo.db, {id: userData.id}, userData)

                const token = jwt.sign(
                    {"userId": userData.id, "github_token" : request.payload.user.access_token},
                    authConfigurations.shared_secret);
                return {token: token}
            } catch (error) {
                console.log(error)
                return {}
            }

        }
    }
}

module.exports = Handler
