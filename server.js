const express = require('express')

const Trie = require('./Trie')
const {Server} = require("socket.io")

const app = express()
const server = require('http').createServer(app)
const io = new Server(server, {
    cors : {origin:'*'}
});

const tr = new Trie()

let uglyWords = ["shit","stupid","ugly"]

uglyWords.forEach((word)=>{
    tr.insert(word);
})

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("chatMessage", (msg) => {
    const cleaned = tr.maskAbuses(msg);
    io.emit("chatMessage", cleaned);   
  });
});


server.listen(3001, () => {
    console.log("Server running on port 3000");
});

