const Routes = require('./routes')

async function register(server, options) {
    await server.register([
        require('bell'),
    ])

    /**
     * Register 'github' authentication strategy
     */
    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'githubCookiePassThatNeedsToBeLonger',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        isSecure: process.env.NODE_ENV === 'production'
    })

    server.route(Routes)
}

exports.plugin = {
    register,
    name: 'github-auth',
    version: '1.0.0',
    once: true
}