const configurations = {
    shared_secret: process.env?.JWT_SHARED_SECRET ?? 'some_shared_secret'
}

module.exports = configurations
