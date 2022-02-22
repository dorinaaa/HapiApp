const Routes = require('./routes')
const configurations = require('./config')

async function register(server, options) {
    await server.register([
        require('@hapi/jwt')
    ])

    server.auth.strategy('jwt_strategy', 'jwt', {
        keys: configurations.shared_secret,
        verify: false,
        validate: (artifacts, request, h) => {
            return {
                isValid: true,
                credentials: {user: artifacts.decoded.payload.user}
            };
        }
    });

    server.route(Routes)
}

exports.plugin = {
    register,
    name: 'jwt-auth',
    version: '1.0.0',
    once: true
}
