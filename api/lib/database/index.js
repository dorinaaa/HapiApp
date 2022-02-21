const dbOptions = require('./config')

async function register(server, options) {
    await server.register({
        plugin: require('hapi-mongodb'),
        options: dbOptions,
    });

    server.method('updateRecord', (search, update) => {

    })

}

exports.plugin = {
    register,
    name: 'database-connection',
    version: '1.0.0',
    once: true
}