require('dotenv').config()

const express = require('express')
const router = express.Router()
const logsDB = require('../data/logs.js')
const verifiedDB = require('../data/verified.js')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))


// FOR DISCORD BOT

router.post("/createlogs", async (req, res) => {
    try {
        const APIKEYS = req.headers['x-api-key']
        const INFO = req.body

        if (APIKEYS !== process.env.api) {
            return res.status(400).json({ success: false })
        }

        if (!INFO.DiscordID || !INFO.RobloxID) {
            return res.status(401).json({ success: false })
        }


        const isVerified = await verifiedDB.findOne({ DiscordID: `${INFO.DiscordID}` })

        if (isVerified) {
            return res.status(300).json({ success: false })
        }

        const isRobloxUsed = await verifiedDB.findOne({ RobloxID: `${INFO.RobloxID}` })

        if (isRobloxUsed) {
            return res.status(402).json({ success: false })
        }

        const checkLOGS = await logsDB.findOne({ DiscordID: `${INFO.DiscordID}` })
        
        if (checkLOGS) {
            return res.status(201).json({ success: true  })
        }

        const newData = new logsDB({ DiscordID: `${INFO.DiscordID}`, RobloxID: `${INFO.RobloxID}` })
        await newData.save()
        res.status(200).json({ success: true })
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false })
    }
})

router.post("/getI", async (req,res) => {
    try {
        const APIKEYS = req.headers['x-api-key']
        const INFO = req.body

        if (APIKEYS !== process.env.api) {
            return res.status(400).json({ success: false })
        }

        if (!INFO.DiscordID) {
            return res.status(401).json({ success: false })
        }

        const check = await verifiedDB.findOne({ DiscordID: `${INFO.DiscordID}` })

        if (check) {
            res.status(200)
            res.send(`${check.RobloxID}`)
        } else {
            res.status(202).json({ sucess: false })
        } 
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false })
    }
})












// PART OF ROBLOX STUDIO

router.post("/getinfo", async (req, res) => {
    try {
        const APIKEYS = req.headers['x-api-key']
        const INFO = req.body

        if (APIKEYS !== process.env.api) {
            return res.status(400).json({ success: false })
        }

        if (!INFO.RobloxID) {
            return res.status(401).json({ success: false })
        }

        const check = await logsDB.findOne({ RobloxID: `${INFO.RobloxID}` })

        if (check) {
            res.status(200).json({ success: true, RobloxID: check.RobloxID, DiscordID: check.DiscordID})
        } else {
            res.status(202).json({ success: false })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false })
    }
})


router.post("/postDelete", async (req, res) => {
    try {
        const APIKEYS = req.headers['x-api-key']
        const INFO = req.body

        if (APIKEYS !== process.env.api) {
            return res.status(400).json({ success: false })
        }

        if (!INFO.RobloxID) {
            return res.status(401).json({ success: false })
        }

        const check = await logsDB.findOneAndDelete({ RobloxID: `${INFO.RobloxID}` })

        if (check) {
            res.status(200).json({ success: true })
        } else {
            res.status(202).json({ success: false })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false })
    }
})

router.post("/postVerify", async (req, res) => {
    try {
        const APIKEYS = req.headers['x-api-key']
        const INFO = req.body

        if (APIKEYS !== process.env.api) {
            return res.status(400).json({ success: false, message: 'INVALID API-KEYS'})
        }

        if (!INFO.RobloxID) {
            return res.status(401).json({ success: false })
        }

        const check = await logsDB.findOne({ RobloxID: `${INFO.RobloxID}` })

        if (check) {
            const newData = new verifiedDB({ DiscordID: `${check.DiscordID}`, RobloxID: `${INFO.RobloxID}` })
            await newData.save()

            await logsDB.deleteOne({ RobloxID: `${INFO.RobloxID}` })
            webhooksend(`${check.DiscordID}`)
            res.status(200).json({ success: true })
        } else {
            res.status(202).json({ success: false })
        }
    } catch (err) {
        console.log(err)
        res.status(404).json({ success: false, message: 'ERROR has occured' })
    }
})

module.exports = router



async function webhooksend(message) {
    const messageData = {
        content: `${message}`
    }

    await fetch(process.env.WEBHOOK, {
        method: 'post',
        body: JSON.stringify(messageData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}