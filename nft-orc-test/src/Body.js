import React, { useState, useEffect, useMemo } from 'react'
import {BigNumber, ethers} from 'ethers';
import {ABI} from './ABI'

const Body = (props) => {

    const [minted, setMinted] = useState([])
    const [Error, setError] = useState("")
    const {orcs, setOrcs, isConnected, accounts, setAccounts} = props

    
    const contractAddress = '0xb62C298B0173E7A0b5EEA9FCAa1f72227AF86bd9'

    useEffect(() => {

        callContract()

        if (accounts.length === 0){
            checkOrcs()
        }
    }, [])

    async function callContract() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const numberContract = new ethers.Contract(contractAddress, ABI, provider)
            const num = await numberContract.totalSupply()
            setMinted(parseInt(num._hex))
        }
        catch {
            window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x13881",
                    rpcUrls: ["https://rpc-mumbai.matic.today"],
                    chainName: "Mumbai",
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18
                    },
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                }]
            });
            setError("Please connect to the Polygon Mumbai Testnet and Try again.")
        }
    }

    async function checkOrcs() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const numberContract = new ethers.Contract(contractAddress, ABI, provider)
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccounts(accounts)
        const hex = await numberContract.balanceOf(accounts[0])
        setOrcs(parseInt(hex._hex))
    }

    async function MintOrcNFT() {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const accounts = await provider.send("eth_requestAccounts", []);
        const numberContract = new ethers.Contract(contractAddress, ABI, provider.getSigner())
        const num = await numberContract.MintOrc(accounts[0])
        console.log(num)
        checkOrcs()
    }


  
    return ( 
     <div className='orc-body'>
        {Error? 
        Error
        : 
    <>
    <div>
        <h1>{minted}/10000 Minted</h1>
        </div>
    <button className="mint-btn" onClick={MintOrcNFT}>MINT ORC</button>
    </>

    
    }

     </div>
    )
}

export default Body