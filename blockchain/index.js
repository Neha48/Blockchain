"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = exports.Chain = exports.Block = exports.Transaction = void 0;
const crypto = __importStar(require("crypto"));
// const crypto = require('crypto');
// Transfer of funds between two wallets
class Transaction {
    constructor(amount, payer, // public key
    payee // public key
    ) {
        this.amount = amount;
        this.payer = payer;
        this.payee = payee;
    }
    toString() {
        return JSON.stringify(this);
    }
}
exports.Transaction = Transaction;
// Individual block on the chain
class Block {
    constructor(prevHash, transaction, ts = Date.now()) {
        this.prevHash = prevHash;
        this.transaction = transaction;
        this.ts = ts;
        this.nonce = Math.round(Math.random() * 999999999);
    }
    get hash() {
        const str = JSON.stringify(this);
        const hash = crypto.createHash('SHA256');
        hash.update(str).end();
        return hash.digest('hex');
    }
}
exports.Block = Block;
// The blockchain
class Chain {
    constructor() {
        this.chain = [
            // Genesis block
            new Block('', new Transaction(100, 'genesis', 'satoshi'))
        ];
        this.mining = [0];
    }
    // Most recent block
    get lastBlock() {
        return this.chain[this.chain.length - 1];
    }
    // Proof of work system
    mine(nonce) {
        let solution = 1;
        console.log('⛏️  mining...');
        while (true) {
            const hash = crypto.createHash('MD5');
            hash.update((nonce + solution).toString()).end();
            const attempt = hash.digest('hex');
            if (attempt.substr(0, 4) === '0000') {
                console.log(`Solved: ${solution}`);
                return solution;
            }
            solution += 1;
        }
    }
    // Add a new block to the chain if valid signature & proof of work is complete
    addBlock(transaction, senderPublicKey, signature) {
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());
        const isValid = verify.verify(senderPublicKey, signature);
        let mined = 0;
        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            mined = this.mine(newBlock.nonce);
            this.chain.push(newBlock);
            this.mining.push(mined);
            console.log('verified');
        }
        return mined;
    }
    mineBlock(amount, payerPublicKey, payerPrivateKey, payeePublicKey) {
        const transaction = new Transaction(amount, payerPublicKey, payeePublicKey);
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        const signature = sign.sign(payerPrivateKey);
        const verify = crypto.createVerify('SHA256');
        verify.update(transaction.toString());
        const isValid = verify.verify(payerPublicKey, signature);
        if (isValid) {
            const newBlock = new Block(this.lastBlock.hash, transaction);
            const m = this.mine(newBlock.nonce);
            return m;
        }
        return 0;
    }
}
exports.Chain = Chain;
// Singleton instance
Chain.instance = new Chain();
// Wallet gives a user a public/private keypair
class Wallet {
    constructor(w) {
        console.log(w);
        const keypair = crypto.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            publicKeyEncoding: { type: 'spki', format: 'pem' },
            privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
        });
        this.privateKey = w.privateKey === undefined ? keypair.privateKey : w.privateKey;
        this.publicKey = w.publicKey === undefined ? keypair.publicKey : w.publicKey;
    }
    sendMoney(amount, payeePublicKey) {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);
        const sign = crypto.createSign('SHA256');
        sign.update(transaction.toString()).end();
        // console.log(this.privateKey);
        const signature = sign.sign(this.privateKey);
        const mined = Chain.instance.addBlock(transaction, this.publicKey, signature);
        const publicK = this.publicKey.split('-----');
        console.log(publicK);
        transaction.payer = publicK[2];
        const res = { Mined: mined, Transaction: transaction };
        return res;
    }
}
exports.Wallet = Wallet;
// Example usage
// const satoshi = new Wallet();
// const bob = new Wallet();
// const alice = new Wallet();
// satoshi.sendMoney(50, bob.publicKey);
// bob.sendMoney(23, alice.publicKey);
// alice.sendMoney(5, bob.publicKey);
// console.log(Chain.instance.chain)
