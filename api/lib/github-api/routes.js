'use strict'

const Handler = require('./handler.js')

const Routes = [
    {
        method: 'GET',
        path: '/github/profile',
        config: Handler.profile
    }
]

module.exports = Routes