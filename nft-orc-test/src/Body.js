import React, { useState, useEffect, useMemo } from 'react'
import {BigNumber, ethers, utils} from 'ethers';
import {ABI} from './ABI'

const Body = (props) => {

    const [minted, setMinted] = useState([])
    const {orcs, setOrcs, isConnected, accounts, setAccounts, error, setError, loading, setLoading} = props

    
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
            setError("Please connect to the Polygon Mumbai Testnet and Try again.")
        }
    }

    async function switchNetwork() {
        try {
            setLoading(true)
            await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: utils.hexValue(80001)}],
            });
            setLoading(false)
          } catch {
            // This error code indicates that the chain has not been added to MetaMask.
            console.log("Catch Happening")
            setLoading(true)
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: utils.hexValue(80001),
                        chainName: "Matic(Polygon) Mumbai Testnet",
                        nativeCurrency: { name: "tMATIC", symbol: "tMATIC", decimals: 18 },
                        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
                        blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
                    }],
                });
                setLoading(false)

            // handle other "switch" errors
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
        {error?
        <>
        {error}
        {loading?
         <h3>Loading...</h3>
         :
         <button className='mint-btn' onClick={switchNetwork} disabled={loading}>Switch Network</button>
        }
        </> 
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