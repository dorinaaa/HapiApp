const Routes = require('./routes')

async function register(server, options) {

    // TODO:: Have a deeper understanding of strategies

    server.route(Routes)
}

exports.plugin = {
    register,
    name: 'github-api',
    version: '1.0.0',
    once: true
}