async function register (server, options) {
    await server.register({
        plugin: require('bell')
    })


    /**
     * Register 'github' authentication strategy
     */
    server.auth.strategy('github', 'bell', {
        provider: 'github',
        password: 'ThisIsASecretCookiePasswordForGitHub',
        clientId: 'your-client-id',
        clientSecret: 'your-client-secret',
        isSecure: process.env.NODE_ENV === 'production'
    })

    server.log('info', 'Plugin registered: bell authentication with strategy »github«')
}

exports.plugin = {
    register,
    name: 'authentication',
    version: '1.0.0',
    once: true
}