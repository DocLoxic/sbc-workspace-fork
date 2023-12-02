"use client"
import { AnchorProvider, Program, web3 } from '@coral-xyz/anchor';
import { Connection, PublicKey, clusterApiUrl } from '@solana/web3.js';
import Image from 'next/image'
import { useState } from 'react';
import idl from "./idl.json"

export default function Home() {
    const [walletKey, setwalletKey] = useState<any>(null)
    const [posts, setposts] = useState<any[]>([])

    const connectWallet = async () => {
      const {solana} = window as any;
      setwalletKey((await solana.connect()).publicKey)
    }
    const initialize =  async () => {
      const {solana} = window as any;
      const CONNECTIOn  = new Connection(clusterApiUrl("devnet"))
      const ANCHOR_PROVIDER  = new AnchorProvider(CONNECTIOn, solana, {commitment: "processed"})
      const PROGRAM = new Program(JSON.parse(JSON.stringify(idl)) , new PublicKey("As1Qtyj6fMX3u5f9FAMXvkfYeGSiMHMQf4HsQXvjCVDT"),ANCHOR_PROVIDER)
      const keyPair = web3.Keypair.generate();
      const tx = await PROGRAM.methods.initialize("manong", "2.5k games").accounts({
        post: keyPair.publicKey,
        user: ANCHOR_PROVIDER.publicKey,
        systemProgram: web3.SystemProgram.programId,
      }).signers([keyPair]).rpc();
      
    }

    const refresh =  async () => {
      const {solana} = window as any;
      const CONNECTIOn  = new Connection(clusterApiUrl("devnet"))
      const ANCHOR_PROVIDER  = new AnchorProvider(CONNECTIOn, solana, {commitment: "processed"})
      const PROGRAM = new Program(JSON.parse(JSON.stringify(idl)) , new PublicKey("As1Qtyj6fMX3u5f9FAMXvkfYeGSiMHMQf4HsQXvjCVDT"),ANCHOR_PROVIDER)
      const data = await PROGRAM.account.post.all();
      setposts(data)
    }

  return (
    <main className="">
      <div>
      <button onClick={() => {
      connectWallet()
        }}>{walletKey ? walletKey.toString(): "Connect Wallet" }</button><br/><br/>
   
        <button onClick={() => {
          initialize()
        }}>Initialize</button><br/><br/>

        <button onClick={() => {
          refresh()
        }}>Refresh</button>
      </div>
      <div>
        {
          posts.map((e: any) => {
            return <><p>Title: {e.account.title}</p><p>Content: {e.account.content}</p></>
          })
        }
      </div>
   </main>
  )
}