import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'
import routes from './routes/salon.js';
import http from 'http';
import { Server } from 'socket.io'
dotenv.config()
const app = express();
const PORT = 8000 || process.env.PORT
app.use(cors())
app.use(express.json())
app.use(express.static('public'))
app.use(routes)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'PUT'],
        credentials: true
    }
})

io.on('connection', (socket) => {
    console.log(socket.id);
    console.log('User Connection');

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID ${socket.id} joined room : ${data}`);
    })

    socket.on("send_message", (data) => {
        // console.log(`Message from ${data.auther}: ${data.message} to room ${data.room}`);
        // socket.to(data.room).emit("receive_message", data)
        socket.to(data.room).emit('receive_message', data)
    })

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);

    })
})

try {
    mongoose.connect(process.env.MONGODB_URL)
    console.log('Connected mongoDB');
} catch (error) {
    console.log('Mongo Error');
}

server.listen(8000, (console.log('Server listening on port ' + PORT)))