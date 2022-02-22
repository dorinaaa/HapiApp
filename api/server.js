'use strict'

const Hapi = require('@hapi/hapi')
const appRoutes = require('./app/routes/users')

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
    await server.register(require('./lib/auth/'));

    // register app routes
    server.route(appRoutes)

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
