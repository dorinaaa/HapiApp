'use strict'

const Wreck = require('@hapi/wreck');

const githubAPI = async function () {

    const {res, payload} = await Wreck.get('https://api.github.com/users/dorinaaa/starred', {
        headers: {
            Authorization: 'token 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',
            'User-Agent': 'request'
        }
    });
    return payload.toString();
};

const Handler = {
    /**
     * used to authenticate
     */
    profile: {
        handler: async function (request, reply) {
            try {
                return await githubAPI();
            } catch (ex) {
                console.error(ex);
            }
            return {}
        }
    }
}

module.exports = Handler