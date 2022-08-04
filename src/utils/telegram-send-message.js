module.exports = {
    recipient: null,
    message: null,
    token: null,
    endpoint: 'https://api.telegram.org/bot%token/sendMessage?chat_id=%chatId&text=%message',

    setToken: function(token) {
        this.token = token;
    },

    setRecipient: function(chatId) {
        this.recipient = chatId;
    },

    setMessage: function(message) {
        this.message = message;
    },

    send: function() {


        let endpointUrl = this.endpoint
            .replace('%token', this.token)
            .replace('%chatId', this.recipient)
            .replace('%message', this.message);


        var request = require('request');
        const notification = request({
            uri: endpointUrl,

        });
    }
};