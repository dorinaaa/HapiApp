'use strict'

const jwt = require("jsonwebtoken");

const UserService = require('../../lib/services/UserService')
const APIService = require('../../lib/services/APIService')
const jwtConfigurations = require('../../lib/auth/config')

const UserController = {
    profile: {
        cors: {credentials: true},
        auth: {strategy: 'jwt_strategy'},
        async handler(request, h) {
            try {
                return await UserService.findUser(request.mongo.db, {id: parseInt(request.params.userId)},
                    {
                        name: 1,
                        bio: 1,
                        avatar_url: 1,
                        login: 1
                    })
            } catch (err) {
                console.log(err)
                return {}
            }

        }
    },
    starredRepos: {
        cors: {credentials: true},
        auth: {strategy: 'jwt_strategy'},
        async handler(request, h) {
            try {
                const user = await UserService.findUser(request.mongo.db, {id: parseInt(request.params.userId)}, {starred_url: 1})

                const jwtToken = request.headers.authorization.replace("Bearer ", "")
                const githubToken = jwt.verify(jwtToken, jwtConfigurations.shared_secret).github_token;

                const starredRepos = await APIService.getFromAPI(user.starred_url.replace("{/owner}{/repo}", ""), {
                    Authorization: 'token ' + githubToken,
                    'User-Agent': 'request'
                })

                await UserService.createOrUpdate(request.mongo.db,
                    {id: parseInt(request.params.userId)},
                    {"starred_repos": JSON.parse(starredRepos)})

                const starred_repos = []
                JSON.parse(starredRepos).forEach(repo => {
                    starred_repos.push({
                        "full_name": repo.full_name,
                        "link": repo.html_url
                    })
                })
                return starred_repos

            } catch (error) {
                console.log(error)
                return []
            }

        },

    }
}

module.exports = UserController
