const options = {
    url: process.env.MONGODB_CONNECTION_STRING,
    settings: {
        useUnifiedTopology: true
    },
    decorate: true
}

module.exports = options
