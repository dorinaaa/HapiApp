'use strict'

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt');
const jwt = require('jsonwebtoken');
const Wreck = require('@hapi/wreck');

require('dotenv').config({path: require('find-config')('.env')})

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        debug: {request: ['error']}
        // host: '0.0.0.0'
    });

    const dbOptions = {
        url: 'mongodb://localhost:27017/hapiApp',
        settings: {
            useUnifiedTopology: true
        },
        decorate: true
    }
    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOptions
    });

    await server.register(Jwt);

    server.auth.strategy('my_jwt_stategy', 'jwt', {
        keys: 'some_shared_secret',
        verify: false,
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {user: artifacts.decoded.payload.user}
            };
        }
    });

    server.route({
        method: 'POST',
        path: '/auth/login',
        config: {
            cors: {credentials: true},
            handler(request, h) {
                // call mongo db, store user data in db or update
                // TODO: add check if github fails or sth,
                //  also dont go to profile page if errors
                // get starred repos
                const starredRepos = Wreck.get(request.payload.user.userData.starred_url.replace("{/owner}{/repo}", ""), {
                    headers: {
                        Authorization: 'token ' + request.payload.user.access_token,
                        'User-Agent': 'request'
                    }
                }).then(repos => {
                    console.log(repos.toString())
                });
                let userData = request.payload.user.userData
                userData["starred_repos"] = starredRepos.toString()
                const user = request.mongo.db.collection('users').updateOne(
                    {id: userData.id},
                    {$set : userData},
                    {upsert: true}
                )

                // instead of request payload store only the user id
                const token = jwt.sign(userData.id, 'some_shared_secret');
                const data = {token: token}
                return h.response(data)
            },
        }
    });

    server.route({
        method: 'GET',
        path: '/secret',
        config: {
            handler(request, h) {
                return 'secret';
            },
            auth: {
                strategy: 'my_jwt_stategy',
            },
        },
    });

    // register plugins to server instance
    await server.register(require('./lib/github-api/'));
    // await server.register(require('./lib/jwt-auth/'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
