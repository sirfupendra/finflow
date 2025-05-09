const express=require('express');
const app=express();
const http=require('http');
const cors=require('cors');
const server=http.createServer(app);
const {Server} = require('socket.io');

const mongoose=require('mongoose');
 main = async () => {
    await mongoose.connect('mongodb://localhost:27017/merchantdatabase');
    console.log('Database Connected');
}
main().catch(err => console.log(err));
const io = new Server(server, {
    cors: {
        origin: '*', // Allow all origins (adjust for security in production)
        methods: ['GET', 'POST'], // Allowed HTTP methods
    },
});
io.on('connection',(socket)=>{
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        socket.emit('message', 'Hello from server');
    }
    );
});
app.use(cors());

app.get('/',(req,res)=>{
    res.send('hello from merchant server');
});

server.listen(3015,()=>{
    console.log(' app Server is running on port 3015');
});