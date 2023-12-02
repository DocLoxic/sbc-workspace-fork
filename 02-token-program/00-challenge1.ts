import * as token from "@solana/spl-token";
import * as web3 from "@solana/web3.js";
import bs58 from "bs58";
import dotenv from "dotenv";
dotenv.config();
import { clusterApiUrl, Connection } from "@solana/web3.js";

// Get my keypair
const secretKey = process.env.PRIVATE_KEY;
const decodedKey = bs58.decode(secretKey as any);
export const keypair = web3.Keypair.fromSecretKey(decodedKey);

export const conn = new Connection(clusterApiUrl("devnet"), "confirmed");

async function main() {
  // createMint() creates the indetity of the "money" that you are creating
  const mint = await token.createMint(
    conn,
    keypair,
    keypair.publicKey,
    null,
    9,
  );

  console.log("Mint ID: ", mint.toString());

  // Creates or gets associated accounts or "ATA"
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
    conn,
    keypair,
    mint,
    keypair.publicKey
  );

  console.log("Token Account ID: ", tokenAccount.address.toString());


  // mintTo() sends token to ATA (sending to ATA means sending toke to another wallet)
  const tx = await token.mintTo(
    conn,
    keypair,
    mint,
    tokenAccount.address,
    keypair,
    100000000000
  );

  console.log("Mint To Transaction: ", tx.toString());


  // Get the mint info
  const mintInfo = await token.getMint(
    conn,
    mint
  );

  const tokenAccountInfo = await token.getAccount(
    conn,
    tokenAccount.address
  );

  console.log("Token Circulation Supply: ", mintInfo.supply);
  console.log("Token Account Supply: ", tokenAccountInfo.amount);
}

main();