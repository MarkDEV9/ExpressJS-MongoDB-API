const mongoose = require('mongoose')

const verifiedSchema = new mongoose.Schema({
    DiscordID: {
        type: String,
        required: true
    },
    RobloxID: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Verified", verifiedSchema)