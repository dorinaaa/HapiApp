'use strict'

const Handler = {
    /**
     * used to authenticate
     */
    connect: {
        auth: 'github',
        handler: function (request, reply) {
            if (request.auth.isAuthenticated) {
                const user = request.auth.credentials

                return user
            }

            return 'Could not authenticate with GitHub.'
        }
    }
}

module.exports = Handler