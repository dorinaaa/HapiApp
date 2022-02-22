'use strict'

const Handler = require('./handler')

const Routes = [
    {
        method: 'post',
        path: '/auth/login',
        config: Handler.index
    }
]

module.exports = Routes