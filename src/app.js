const dotenv = require('dotenv').config({
    path: "./pw.env"
})
const inbox = require('./util/inboxStreamGenerator')
inbox.streamUnreads();