const Routes = require('./routes')

async function register(server, options) {
    await server.register([
        require('hapi-auth-jwt2')
    ])

    const validate = async function (decoded, request, h) {

        return {isValid: true}
        // do your checks to see if the person is valid
        // if (!people[decoded.id]) {
        //     return { isValid: false };
        // }
        // else {
        //     return { isValid: true };
        // }
    }
    server.auth.strategy('jwt', 'jwt',
        {
            key: 'NeverShareYourSecret', validate
        });

    server.route(Routes)
}

exports.plugin = {
    register,
    name: 'jwt-auth',
    version: '1.0.0',
    once: true
}