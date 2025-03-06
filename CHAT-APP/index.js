const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a new client connected', socket.id);
})


app.use(express.static(path.resolve('./public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
})

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})