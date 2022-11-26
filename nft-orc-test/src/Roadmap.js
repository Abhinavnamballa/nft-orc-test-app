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
        <h1>Future Improvements</h1>

        <ul>
            <li> - Random number via Chainlink</li>
            <li> - Redux for better State Management</li>
            <li> - Backend powered my Moralis</li>
            <li> - Event Emitter on Smart Contract</li>
            <li> - Test Cases/Performance Logging</li>
        </ul>
    </div>
  )
}

export default Roadmap