import React, {useState} from 'react'
import { contractAddress } from './ABI';
import { ethers } from 'ethers';
import { TestABI } from './ABI3';
import {Orcsv3} from './ABI2';

function Roadmap() {

  let [result, setResult] = useState()
  let [testInput, setTestInput] = useState('')
  let [input, setInput] = useState('')
  let [address, setAddress] = useState('0x600b5826D18996eACa40c4c872621b0a94993EB7')
  let [loading, setLoading] = useState(false)


  //With Argument Smart Contract Call
  async function FireRequestToSmartContract() {
    let contractAddress = ''
    let NFTcontract = ''
    setLoading(true)
    if (!input) {
      setLoading(false)
      console.log('returned due to no input')
      return
    }
    if (isNaN(input)){
      setLoading(false)
      console.log('returned due to not a Number')
      return
    }
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const numberContract = new ethers.Contract(address, TestABI, provider.getSigner())
        const num = await numberContract.MintOrc(input)
        setResult(`DONE! sent 1000 to: ${input}`)
        console.log(num)
    }
    catch {
        console.log("Failed to Call Contract")
    }
}

//Non Argument Smart Contract Call
async function callContract() {
  console.log("triggered")
  try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const numberContract = new ethers.Contract(address, Orcsv3, provider)
      const num = await numberContract.totalSupply()
      setResult(parseInt(num._hex))
      console.log(parseInt(num._hex))
  }
  catch(e) {
      console.log(e)
      console.log(address)
  }
}

  return (
    <div className='Roadmap' style={{height: '70vh'}}>

      {!loading? 
      <>
      <div>
      <label style={{margin: '10px'}}>Test Input</label>
      <input type="text" style={{padding: '20px', marginTop:'50px'}} placeholder="Enter Test Input" onChange={e => setTestInput(e.target.value)}></input>
      <button style={{width: '70px', height: '60px'}} onClick ={() => {callContract()}} disabled={loading}>Submit</button>
      </div>
      <div>
      <label style={{margin: '10px'}}>Transfer 1000</label>
      <input type="text" style={{padding: '20px', marginTop:'50px'}} placeholder="Enter Receiver Address" onChange={e => setInput(e.target.value)}></input>
      <button style={{width: '70px', height: '60px'}} onClick ={() => {FireRequestToSmartContract()}} disabled={loading}>Submit</button>
      </div>
      </>
        :
        null
    }



      <button className='mint-btn' style={{margin: '40px'}} onClick ={() => {callContract()}}>Call Contract</button>

      <div>
        {result? 
        <h1 style={{color: "white"}}>The Result is: {result}</h1>
        :
        null
      }
        
      </div>
    </div>
  )
}

export default Roadmap