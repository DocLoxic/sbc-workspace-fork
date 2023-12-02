import * as web3 from '@solana/web3.js'
import Dotenv from 'dotenv'
import base58 from 'bs58'
Dotenv.config();

async function main() {
    const secretKey = process.env.PRIVATE_KEY;
    const decodedKey = base58.decode(secretKey as any);
    const userKeypair = web3.Keypair.fromSecretKey(decodedKey);

    const url = web3.clusterApiUrl('devnet');
    const conn = new web3.Connection(url);

    const publicKeyTo = new web3.PublicKey('8c37TTwMig3Z8mCJzARdmAeeqkGiN358nCtvrrbVExVs');

    const instruction = web3.SystemProgram.transfer({
        fromPubkey: userKeypair.publicKey,
        toPubkey: publicKeyTo,
        lamports: web3.LAMPORTS_PER_SOL * 1,
    });

    const transaction = new web3.Transaction();
    transaction.add(instruction);

    const signature = await web3.sendAndConfirmTransaction(
        conn,
        transaction,
        [userKeypair]
    );

    console.log('txSig: ', signature);
}

main();