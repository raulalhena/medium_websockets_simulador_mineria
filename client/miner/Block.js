import SHA256 from 'crypto-js/sha256.js'

class Block {
    constructor(timestamp, transactions, previousHash, difficulty) {
        // Fecha y hora de la transacción
        this.timestamp = timestamp;
        // Datos que irá dentro del bloque, dirección de las wallets y los balances de monedas
        this.transactions = transactions;
        // Hash del bloque anterior
        this.previousHash = previousHash;
        // Hash actual del bloque
        this.hash = this.calculateHash();
        // Añadimos el nonce
        this.nonce = 0;
        //Añadimos difficulty con propositos educativos
        this.difficulty = parseInt(difficulty);
    }

    // Cálculo del hash del bloque
    calculateHash() {
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.transactions) + this.nonce).toString();
    }

    // PoW, difficulty = número de 0 que añadiremos al hash creado
    mineBlock() {
        while(this.hash.substring(0,this.difficulty) !== Array(this.difficulty + 1).join("0")){
            console.log('substring difficulty ', this.hash.substring(0,this.difficulty))
            console.log('array join ', Array(this.difficulty + 1).join("0"))
            this.nonce++;
            // console.log('nonce', this.nonce);
            this.hash = this.calculateHash();
            console.log('hash ', this.hash);
        }
        // console.log(`Block mined ${this.hash}`);
        return this.hash;
    }

    // Validar que la transacción es valida
    hashValidTransactions() {
        for(const tx of this.transactions) {
            if(!tx.isValid()) return false;
        }
        return true;
    }
}

export default Block;