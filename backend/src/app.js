import express from 'express'
import { createServer } from 'node:http'

import mongoose, { mongo } from 'mongoose'
import cors from 'cors'
import userRoutes from "./routers/usersroute.js"
import { connectToSocket } from "./controllers/socketManager.js"

const app = express()
const server = createServer(app)
const io = connectToSocket(server)



app.set("port", process.env.PORT || 8000)
app.use(cors())
app.use(express.json({ limit: "40kb" }))
app.use(express.urlencoded({ limit: "40kb", extended: true }))

app.use("/api/v1/users", userRoutes)

const start = async () => {
    const connectionDB = await mongoose.connect("mongodb://localhost:27017/meetora")
    console.log(`MONGO Connected DB Host: ${connectionDB.connection.host}`)
    server.listen(app.get("port"), () => {
        console.log("LISTENING ON PORT 8000")
    })
}

start()