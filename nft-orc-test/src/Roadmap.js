import React from 'react'
import { contractAddress } from './ABI';
import { ethers } from 'ethers';

function Roadmap() {

  async function FireRequestToSmartContract() {
    let contractAddress = ''
    let NFTcontract = ''
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const numberContract = new ethers.Contract(contractAddress, NFTcontract, provider.getSigner())
        const num = await numberContract.MintOrc("Args")
        console.log(num)
    }
    catch {
        console.log("Failed to Call Contract")
    }
}

  return (
    <div className='Roadmap'>
      <input type="text" style={{padding: '20px', marginTop:'50px'}} placeholder="Enter Your Input"></input>
      <button className='mint-btn'>Test Contract</button>
    </div>
  )
}

export default Roadmap