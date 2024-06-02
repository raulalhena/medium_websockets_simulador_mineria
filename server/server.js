import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const miners = [];
const hashPool = [];

io.on("connection", (socket) => {
  
  console.log('connection stablished', socket.id);
  io.emit('welcome', miners);
  console.log('>>>> CONNECTED <<<<<<')
  console.log('Miners connected ==>> ', miners);

  socket.on('disconnect', (socket) => {
    console.log('>>>> DISCONNECTED <<<<<<')
    console.log(miners);
  });
  
  socket.on('joinToMine', (data) => {
    console.log('==>> Join To Mine <<==');
    for(const miner of miners) {
      if(miner.id === data.id) return;
    }
    miners.push(data);
    console.log(miners);
  });

  socket.on('minerOut', () => {
    console.log('==>> Miner Out <<==');
    miners.map((miner, index, miners) => {
      if(miner.id === socket.id) {
        miners.splice(index, 1);
      }
    });
    io.emit('minerOut', {updatedMiners: miners, id: socket.id});
    console.log('Miners still connected', miners);
  });

  socket.on('getMiners', () => {
    console.log('==>> Get Miners <<==');
    io.emit('getMiners', miners);
  });

  socket.on('sendHash', (data) => {
    console.log('==>> Send Hash <<==');
    socket.broadcast.emit('startMining', (data));
  });

  socket.on('hashFound', (hash) => {
    console.log('==>> Hash Found <<==');
    if(!hashPool.includes(hash)){
      hashPool.push(hash);
      let winner;
      miners.map((miner) => {
        if(miner.id === socket.id){
          miner.rewards++;
          winner = miner.name;
        }
      });
      io.emit('hashFound', winner);
    }
  });

});

httpServer.listen(3000, () => {
  console.log('Server listenting on port 3000...');
});