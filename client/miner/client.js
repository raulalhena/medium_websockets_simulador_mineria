import { io } from 'socket.io-client';

const socket = io('ws://localhost:3000', {
  autoConnect: false
});

socket.connect();

socket.on('welcome', (arg) => {
  console.log(arg);
  setTimeout(() => {
    console.log('waiting...');
  }, 500);
});

console.log('Joining...');

socket.emit('joinToMine', {id: socket.id, name: 'user2', rewards: 0 }, (response) => {
  console.log('joining')
  console.log(response.status);
});