const colors = require('colors')
const Snoowrap = require('snoowrap')
const requester = require('../config/snoo-config').actionRequester

// This is where your code will go. It must return a promise!
async function doSomething(item) {
    if (!item.saved) {
        console.log(`processing item: ${item.id}`)
        console.dir(item)


        await printContents(item)
        await replyToComment(item)
        await saveItem(item)

        return console.log(`item  ${item.id} successfully processed!`)
    } else {
        return console.log(`item ${item.id} saved already. Skipping...`)
    }



}




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