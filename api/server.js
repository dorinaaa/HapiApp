'use strict'

const Hapi = require('@hapi/hapi')
const Jwt = require('@hapi/jwt');
const jwt = require('jsonwebtoken');

require('dotenv').config({ path: require('find-config')('.env') })

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
       // host: '0.0.0.0'
    });

    await server.register(Jwt);

    server.auth.strategy('my_jwt_stategy', 'jwt', {
        keys: 'some_shared_secret',
        verify: {
            aud: 'urn:audience:test',
            iss: 'urn:issuer:test',
            sub: false,
            nbf: true,
            exp: true,
            maxAgeSec: 14400,
            timeSkewSec: 15
        },
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: { user: artifacts.decoded.payload.user }
            };
        }
    });

    server.route({
        method: 'GET',
        path: '/testing-tokens',
        config: {
            handler(request, h) {
                const token = jwt.sign({
                    aud: 'urn:audience:test',
                    iss: 'urn:issuer:test',
                    sub: false,
                    maxAgeSec: 14400,
                    timeSkewSec: 15
                }, 'some_shared_secret');
                return token;
            },
        }
    });

    server.route({
        method: 'GET',
        path: '/secret',
        auth: {
            strategy: 'my_jwt_stategy',
        },
        config: {
            handler(request, h) {
                return 'secret';
            }
        }
    });

    // register plugins to server instance
    // await server.register(require('./lib/github-auth/'));
    // await server.register(require('./lib/github-api/'));

    // TODO:: double check this
    // we probably dont need it, just use github auth
    // await server.register(require('./lib/jwt-auth/'));

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();
