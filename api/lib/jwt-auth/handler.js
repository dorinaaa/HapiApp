'use strict'
const jwt = require("jsonwebtoken");
const Wreck = require("@hapi/wreck");

const githubAPI = async function (uri, token) {

    const {res, payload} = await Wreck.get(uri, {
        headers: {
            Authorization: 'token ' + token,
            'User-Agent': 'request'
        }
    });
    return payload.toString();
};

const Handler = {
    index: {
        cors: {credentials: true},
        handler: function (request, h) {
            let userData = request.payload.user.userData

            githubAPI(userData.starred_url.replace("{/owner}{/repo}", ""), request.payload.user.access_token)
                .then(starredRepos => {

                    userData["starred_repos"] = JSON.parse(starredRepos)
                    userData["starred_repos_count"] = JSON.parse(starredRepos).length

                    request.mongo.db.collection('users').updateOne(
                        {id: userData.id},
                        {$set: userData},
                        {upsert: true}
                    )

                })

            const token = jwt.sign({"userId": userData.id}, 'some_shared_secret');
            return {token: token}
        }
    }
}

module.exports = Handler