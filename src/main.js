const {Blockchain, Transaction} = require('./blockchain')
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const myKey = ec.keyFromPrivate('0df861bb2463dda00e429f549d6c6f891a8a8bba1ffff6f371aa7fb03c16f3db')
const myWalletAddress = myKey.getPublic('hex')

const otherKey = ec.genKeyPair()
const otherWalletAddress = otherKey.getPublic('hex')


let duCoin = new Blockchain(4);

const tx1 = new Transaction(myWalletAddress, otherWalletAddress, 10)
tx1.signTransaction(myKey)
duCoin.addTransaction(tx1)

console.log("\n Starting the miner...");
duCoin.minePendingTransactions(myWalletAddress);

duCoin.chain[1].transactions[0].amount = 1

console.log("\n Blance of me is: ", duCoin.getBalanceOfAddress(myWalletAddress));
console.log("\n Blance of other is: ", duCoin.getBalanceOfAddress(otherWalletAddress));

console.log("\n Chain is valid??? ", duCoin.isChainValid())
console.log("\n This is chain ", JSON.stringify(duCoin.chain, null, 2))
