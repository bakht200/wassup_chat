const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.use(express.static(__dirname+'/public'))


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

http.listen(3000,()=>{
    console.log('server created');
} )

//socket

const io = require('socket.io')(http);

io.on('connection',(socket)=>{
    console.log("connected successfully")

    socket.on('message',(msg)=>{
        console.log(msg);
        socket.broadcast.emit('message',msg)
    })
})

