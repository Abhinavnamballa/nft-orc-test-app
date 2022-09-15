import React, { useState, useEffect, useMemo } from 'react'
import {BigNumber, ethers, utils} from 'ethers';


const Body = (props) => {

    const [minted, setMinted] = useState([])
    const [localError, setLocalError] = useState("")
    const {error, setError, loading, setLoading, NFTcontract, setNFTContract, contractNum, setContractNum, contractAddress, contractName, orcs} = props


    useEffect(() => {
        setLocalError("")
        if (contractAddress) {
            callContract()
        }
    }, [NFTcontract, orcs])

    async function callContract() {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const numberContract = new ethers.Contract(contractAddress, NFTcontract, provider)
            const num = await numberContract.totalSupply()
            setMinted(parseInt(num._hex))
        }
        catch(e) {
            setLocalError("Loading Contract Failed.")
            console.log(e)
            console.log(contractAddress)
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

    async function MintOrcNFT() {
        try{
            const provider = new ethers.providers.Web3Provider(window.ethereum)
            const accounts = await provider.send("eth_requestAccounts", []);
            const numberContract = new ethers.Contract(contractAddress, NFTcontract, provider.getSigner())
            const num = await numberContract.MintOrc(accounts[0])
            console.log(num)
        }
        catch {
            setLocalError("Failed to initiate Mint")
        }
    }


    function switchContract() {
       if (contractNum === 1){
          console.log(contractNum)
          setContractNum(0)

       }
       else {
        console.log(contractNum)
        setContractNum(1)

       }
    }


  
    return (
    <div>
     <div className='orc-body-2' ></div>
     <div className='orc-body-3'></div>
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
        <div className='contract-selector'><div className='left-arrow' onClick={switchContract}></div><h1>{contractName}</h1><div className='right-arrow' onClick={switchContract}></div></div>
        {localError?
        <h2>{localError}</h2>
        :
        <h1 style={{fontFamily: "Anton, sans-serif"}}>{minted}/10000 Minted</h1>
        }

        </div>
    
    <button className="mint-btn-main card" onClick={MintOrcNFT}>
        <div className='text'>
        <p>M</p>
        <p>I</p>
        <p>N</p>
        <p>T O</p>
        <p>R</p>
        <p>C</p>
        </div>     
        </button>
    </>

    
    }

     </div>
     </div>
    )
}

export default Body