import * as web3 from '@solana/web3.js'

async function main() {
    //console.log("Hello, world!")
    const publicKey = new web3.PublicKey('AJzFthE49i814wUkmZeLb5AnCfpRnR8Eu6ZJ1SWqpp7Z');
    const url = web3.clusterApiUrl('devnet');
    const conn = new web3.Connection(url);

    const bal = await conn.getBalance(publicKey);
    console.log('balance: ', bal);
}

main();