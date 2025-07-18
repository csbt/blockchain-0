const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

const key = ec.genKeyPair()
const publicKey = key.getPublic('hex')
const private = key.getPrivate('hex')

console.log('\n publicKey: ', publicKey)
console.log('\n private: ', private)

// publicKey:  0450aaf9d11061827a37cd2fb798c87f899f3226986b58b8ac70b65de27613e891d319e811f4d2353c1c79a1bace4acc877e8eb57a378c88b60023f602dfc89d75

//  private:  0df861bb2463dda00e429f549d6c6f891a8a8bba1ffff6f371aa7fb03c16f3db
