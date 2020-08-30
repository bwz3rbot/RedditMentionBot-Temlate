// Configuration File for Snoowrap and Snoostorm

// Requiring Snoowrap
const Snoowrap = require('snoowrap');
const auth = {
    userAgent: process.env.USER_AGENT,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
}

const config = {
    requestDelay: 5000,
    warnings: true,
    continueAfterRatelimitError: false,
    retryErrorCodes: [502, 504, 522],
    maxRetryAttempts: 3,
    debug: false
}


// [Stream Requester]
const streamRequester = new Snoowrap(auth);
streamRequester.config(config)

// [Action Requester]
const actionRequester = new Snoowrap(auth);
actionRequester.config(config)

module.exports = {
    streamRequester: streamRequester,
    actionRequester: actionRequester
}