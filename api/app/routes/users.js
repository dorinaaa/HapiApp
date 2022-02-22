'use strict'

const Controller = require('../controllers/UserController')

const Routes = [
    {
        method: 'get',
        path: '/profile/{userId}',
        config: Controller.profile
    },
    {
        method: 'get',
        path: '/starred-repos/{userId}',
        config: Controller.starredRepos
    }
]

module.exports = Routes
