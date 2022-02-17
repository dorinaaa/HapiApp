'use strict'

const Handler = {
    index: {
        auth: 'jwt',
        plugins: {
            'hapi-auth-cookie': {
                redirectTo: false
            }
        },
        handler: function(request, h) {
            const response = h.response({text: 'You used a Token!'});
            response.header("Authorization", request.headers.authorization);
            return response;
        }
    }
}

module.exports = Handler