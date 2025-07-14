const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(data, previousHash) {
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(this.previousHash + JSON.stringify(this.data)).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  createGenesisBlock() {
    return new Block("Genesis Block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}
let coin = new Blockchain();
coin.addBlock(new Block({ amount: 4 }, "0"));
coin.addBlock(new Block({ amount: 10 }, "0"));
coin.addBlock(new Block({ amount: 100 }, "0"));
coin.addBlock(new Block({ amount: 1000 }, "0"));

console.log(coin.isChainValid());

coin.chain[1].data = { amount: 10000 };

console.log(coin.isChainValid());
console.log(JSON.stringify(coin, null, 4));
