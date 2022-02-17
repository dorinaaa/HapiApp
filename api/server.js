'use strict'

const Hapi = require('@hapi/hapi')

require('dotenv').config({ path: require('find-config')('.env') })

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    // register plugins to server instance
    await server.register(require('./lib/github-auth/'));
    await server.register(require('./lib/github-api/'));

    // TODO:: double check this
    // we probably dont need it, just use github auth
    await server.register(require('./lib/jwt-auth/'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
