const mongoose = require('mongoose')

const logsSchema = new mongoose.Schema({
    DiscordID: {
        type: String,
        required: true
    },
    RobloxID: {
        type: String,
        required: true
    },
    When: {
        type: String,
        required: true,
        default: Date.now
    }
})

module.exports = mongoose.model("Logs", logsSchema)
