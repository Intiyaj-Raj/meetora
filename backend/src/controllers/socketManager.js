import { Server } from 'socket.io'

let connections = {}
let messages = {}
let timeOnline = {}

export const connectToSocket = (server) => {
    const io = new Server(server);

    io.on("connection", (socket) => {
        socket.on("join-call", (path) => {
            if (connections[path] === undefined) {
                connections[path] = []
            }
            connections[path].push(socket.io)
            timeOnline[socket.io] = new Date()


            for (let a = 0; a < connections[path].length; a++) {
                io.to(connections[path][a])
            }
        })
    })


    return io;
}
