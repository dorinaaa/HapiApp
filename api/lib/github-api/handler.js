'use strict'

const Wreck = require('@hapi/wreck');

const Handler = {
    /**
     * used to authenticate
     */
    profile: {
        handler: async function (request, reply) {
            // const userCredentials = request.auth.credentials
            // TODO:: this doesnt work and why?
            const username = 'dorinaaa'
            const options = {
                headers: {
                    'Authorization': 'token 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'
                },
            }
            const {res, payload} = await Wreck.get('https://api.github.com/users/dorinaaa/starred', options);
            console.log(payload.toString());
            return 'lala'
        }
    }
}

module.exports = Handler