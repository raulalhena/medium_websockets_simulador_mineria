import { io } from "socket.io-client";
import Block from "./Block.js";

export const initClient = (args) => {

    const socket = io('http://localhost:3000');

    socket.connect();

    socket.on('connect', () => {
        socket.emit('joinToMine', {id: socket.id, name: args.username, rewards: 0 });
        console.log(`Connected:`);
        console.log(`Username: ${args.username} => Socket Id: ${socket.id}`);
        console.log('Esperando para encontrar el próximo hash...');
    });

    socket.on('startMining', async (data) => {
        const block = new Block(data.timestamp, data.transactions, data.previousHash, data.difficulty);
        const hash = await block.mineBlock();
        if(hash) {
            console.log('Hash encontrado: ', hash);
            socket.emit('hashFound', hash);
            console.log('Esperando para encontrar el próximo hash...')
        } else {
            console.log('Hash undefined, something went wrong..');
        }
    });
}