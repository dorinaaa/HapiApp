'use strict'

const Hapi = require('@hapi/hapi')

require('dotenv').config({path: require('find-config')('.env')})

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        // host: '0.0.0.0'
        debug: {request: ['error']}
    });

    // register plugins to server instance
    await server.register(require('./lib/database/'));
    await server.register(require('./lib/jwt-auth/'));

    // TODO check edge cases
    // TODO star another repo to test
    // add some try catches bro
    server.route({
        method: 'get',
        path: '/profile/{userId}',
        config: {
            cors: {credentials: true},
            auth: {
                strategy: 'jwt_strategy',
            },
            async handler(request, h) {
                let user = await request.mongo.db.collection('users').findOne({id: parseInt(request.params.userId)},
                    {
                        projection: {
                            name: 1,
                            bio: 1,
                            avatar_url: 1,
                            login: 1,
                            starred_repos_count: 1
                        }
                    })
                return h.response(user)
            },

        },
    });

    server.route({
        method: 'get',
        path: '/starred-repos/{userId}',
        config: {
            cors: {credentials: true},
            auth: {
                strategy: 'jwt_strategy',
            },
            async handler(request, h) {
                const user = await request.mongo.db.collection('users').findOne({id: parseInt(request.params.userId)},
                    {
                        projection: {
                            starred_repos: 1
                        }
                    })
                let starredRepos = []
                user.starred_repos.forEach(repo => {
                    starredRepos.push({
                        "full_name" : repo.full_name,
                        "link" : repo.html_url
                    })
                })
                return h.response(starredRepos)
            },

        },
    });

    await server.register(require('./lib/github-api/'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
