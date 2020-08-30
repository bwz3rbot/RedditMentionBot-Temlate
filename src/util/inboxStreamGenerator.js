const
    colors = require('colors'),
    EventEmitter = require('events'),
    dateFormat = require('dateformat'),
    snoowrap = require('../config/snoo-config').streamRequester,
    actionRequester = require('../config/snoo-config').actionRequester,
    BotService = require('../service/BotService'),
    timeout = 20000,
    logging = false
    limit = 5;

// [Mention Emitter Class (extends EventEmitter)]
class MentionEmitter extends EventEmitter {
    constructor(supply) {
        super();
    }
    mention(mention) {
        this.emit("mention", mention)
        if (listing.length = 0) {
            throw Error(`no mentions received!`)
        }
    }
}
const mentionEmitter = new MentionEmitter()

// 1. [Get Inbox]
let previousMentionUTC;
const getInbox = function () {
    if (logging) {
        console.log('initializing the stream...'.magenta)
    }

    return snoowrap.getInbox({
        filter: 'unread' | 'mention',
        limit: limit
    })
}

// 2. [Assign First UTC]
const assignFirstUTC = function (inbox) {
    previousMentionUTC = parseInt(inbox[0].created_utc)
    inbox.forEach(item => {
        mentionEmitter.emit('mention', item)
    })
}

// 3. [Stream In Mentions]]
const streamInMentions = function () {

    // 3.a) Checks inbox at an interval of 20 seconds
    setInterval(() => {
        if(logging){
            console.log("checking again...")
        }
        
        snoowrap.getInbox({
            filter: 'unread',
            limit: 10
        }).then((listing) => {

            // 3.b) If a new item exists in the listing,
            listing.forEach(mention => {
                let created = parseInt(mention.created_utc)
                if (created > previousMentionUTC) {
                    mentionEmitter.emit('mention', mention)
                }
            })
            previousMentionUTC = parseInt(listing[0].created_utc)

        })
    }, timeout)
}

// [Run Once Indefinately] Checks the Messaging Queue For new items, processes them.
const newItems = [] // Messaging queue items are pushed into this array
const runOnceIndefinately = function () {
    if (logging) {
        console.log('NUMBER OF ITEMS IN THE QUEUE: ' + newItems.length)
    }

    if (newItems[0] != undefined) {
        // If item exists, it is popped out of the array and handled by the BotService
        newItem = newItems.pop()
        return actionRequester.getComment(newItem.id).fetch()
            .then((item) => {

                // BOT SERVICE CODE RUNS HERE!!
                BotService.doSomething(item)
                    .then(runOnceIndefinately)

            })
    } else {
        if (logging) {
            formattedDate = dateFormat(Date.now())
            console.log(formattedDate + '|  there are no items left in the queue! checking again in 20 seconds...'.red)
        }

        setTimeout(() => {
            runOnceIndefinately()
        }, timeout)
    }

}


// Main Loop of the stream.
const streamUnreads = function () {
    getInbox()
        .then(assignFirstUTC)
        .then(streamInMentions)
}

// 4. On Item Being Emitted, push the item into an array.
mentionEmitter.on("mention", (item) => {
    newItems.push(item)
    if (logging) {
        console.log(`New Item received!: ${dateFormat(Date.now())}`.yellow)
    }
})

// Startup Message
mentionEmitter.once("mention", () => {
    console.log(`Initializing.... Please wait while I check the ${limit} most recent requests.`.bgBlack.yellow)
})

// Messaging Queue Popper
mentionEmitter.once("mention", () => {
    runOnceIndefinately();
})

module.exports = {
    streamUnreads: streamUnreads
}