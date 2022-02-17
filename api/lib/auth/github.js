async function register(server, options) {
    await server.register({
            plugin: require('bell')
        },
    )

    /**
     * Register 'github' authentication strategy
     */
    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'githubCookiePass',
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        isSecure: process.env.NODE_ENV === 'production'
    })

}

exports.plugin = {
    register,
    name: 'github',
    version: '1.0.0',
    once: true
}