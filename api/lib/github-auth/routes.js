'use strict'

const Handler = require('./handler')

const Routes = [
    {
        method: 'GET',
        path: '/auth/github',
        config: Handler.connect
    }
]

module.exports = Routes