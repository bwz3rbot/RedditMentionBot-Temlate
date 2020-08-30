const colors = require('colors')
const Snoowrap = require('snoowrap')
const requester = require('../config/snoo-config').actionRequester

// This is where your code will go. It must return a promise!
// This function is called each time a new message is popped from the array.
// It gives you a pre-fetched 'RedditObject' of type mention.
async function doSomething(item) {
    // Checking if the item was saved will keep the bot from processing anything twice.
    if (!item.saved) {
        console.log(`processing item: ${item.id}`)
        console.dir(item)

        //
        // CODE STARTS HERE //




        await printContents(item)
        await replyToComment(item)





        // CODE ENDS HERE //
        //

        // Be sure to finish with saveItem(item) so the item will not be processed again.
        await saveItem(item)
        return console.log(`item  ${item.id} successfully processed!`)
    } else {
        return console.log(`item ${item.id} saved already. Skipping...`)
    }



}


// Write your functions down here and call them inside of doSomething.

const printContents = function (item) {
    console.log(('printing contents of item.body:\n ' + item.body).green)

    return Promise.resolve(item)

}

const replyToComment = function (item) {
    console.log("replying to comment...".grey)
    return requester.getComment(item.id).reply("I just replied!")
}
const saveItem = function (item) {
    console.log("saving the comment...".grey)
    return requester.getComment(item.id).save();
}


module.exports = {
    doSomething: doSomething
}