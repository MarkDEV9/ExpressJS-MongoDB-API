require('dotenv').config()
require('./dataHandler.js')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.mongodb)
const db = mongoose.connection

db.on("error", (err) => {
    console.error(err)
})

db.once("open", () => {
    console.log("Connected to DB")
})


app.use(express.json())

const apirouter = require('./routes/api.js')
app.use("/api", apirouter)

app.get("/", (req, res) => {
    res.send("Hello World")
})

app.listen(3000, () => {
    console.log("Connected to the Server")
})