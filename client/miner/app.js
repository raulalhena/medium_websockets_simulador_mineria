import { initClient } from './client.js';

const app = () => {
    let username;

    if(process.argv.length === 2) {
        console.error('Se esperaba como mínimo 1 argumento: -u [nombre de usuario], debe introducirse');
        process.exit(1);
    }

    const uIndex = process.argv.indexOf('-u');
    if(uIndex) username = process.argv[uIndex + 1];

    initClient({ username: username });
}

app();