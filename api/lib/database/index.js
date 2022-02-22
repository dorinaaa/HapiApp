const dbOptions = require('./config')

async function register(server, options) {
    console.log('dbOptions3')
    console.log(dbOptions)
    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOptions,
    });
}

exports.plugin = {
    register,
    name: 'database',
    version: '1.0.0',
    once: true
}
