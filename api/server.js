'use strict'

const Hapi = require('@hapi/hapi')

require('dotenv').config({ path: require('find-config')('.env') })

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // register plugins to server instance
    await server.register(require('./lib/auth/github'));

    server.route({
        method: 'GET',
        path: '/',
        options: {
            handler: (request, h) => {
                return 'hapi coding'
            }
        }
    })

    server.route({
        method: 'GET',
        path: '/auth/github',
        options: {
            auth: 'github',
            handler: (request, h) => {
                if (request.auth.isAuthenticated) {
                    const user = request.auth.credentials.profile

                    return user;
                }

                return ('Could not authenticate with GitHub.').code(400)
            }
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
