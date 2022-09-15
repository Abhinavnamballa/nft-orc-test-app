import React, { useState, useEffect } from "react"
import './profile.css'
import NFTCard from "./NFTCard"
import {Orcsv2, contractAddress as contractAddressv2, contractName as contractNamev2} from './ABI'
import {Orcsv3, contractAddress, contractName} from './ABI2'
import {BigNumber, ethers, utils} from 'ethers';





function Profile(props) {

 const [localLoading, setLocalLoading] = useState(false)
 const [ownedv3, setOwnedv3] = useState(0)
 const [v3Array, setv3Array] = useState([])

 const {orcs, setOrcs, isConnected, accounts, error, setError, loading, setLoading} = props


 useEffect(() => {
    callContract()
 }, [accounts])

 async function callContract() {
    try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const numberContract = new ethers.Contract(contractAddress, Orcsv3, provider)
        const num = await numberContract.balanceOf(accounts)
        let metaArray = []
        for (let i = 0; i < num; i++){
            let tokenID = await numberContract.tokenOfOwnerByIndex(accounts, i)
            let tokenMetadataURI = await numberContract.tokenURI(parseInt(tokenID._hex))
            if (tokenMetadataURI.startsWith("ipfs://")){
                tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
            }
            let tokenMetadata = await fetch(tokenMetadataURI).then((response) => {
              return response.json()
            })
            let imageURL
            if (tokenMetadata["image"].startsWith("ipfs://")){
                imageURL = `https://ipfs.io/ipfs/${tokenMetadata["image"].split("ipfs://")[1]}`
            }
            else {
                imageURL = ""
            }
            let output = {
                name: tokenMetadata["name"],
                image: imageURL,
                id: tokenID,
                address: contractAddress
            }
            metaArray.push(output)

        }
        setv3Array(metaArray)
    }
    catch(e) {
        console.log(e)
        console.log(contractAddress)
    }
}


  return (
<div>
    {accounts.length > 0?
    <div>
    {localLoading?
        <div>
            <h1>Loading...</h1>
        </div>
    :
        <div className="profile-container">
        <div className="profile" id="profile">
            <div className="profile-header">
             <div className="profile-frame card"></div>

            </div>
            <h1>{accounts}</h1>
            <div><h3>Orcs v2 Owned: {orcs}</h3><h3>Games Owned: 0</h3></div>
        </div>
        

        <div className="nft-display">
            <div>
            <div style={{fontSize: "24px"}}>
                    <h2>Orcs v3</h2>
                </div>
            <ul className="nft-container">

                {
                    v3Array.map((nft, i) => {
                        return(
                            <NFTCard key={i} owned="owned" name={nft.name} image={nft.image} id={nft.id} contract={nft.address}></NFTCard>
                        )
                    })
                }
                {/*IIFE - Immediately Invoked Function Expression*/}
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                </ul>
                <div style={{marginTop: "12em", fontSize: "24px"}}>
                    <h2>Orcs v2</h2>
                </div>
                <ul className="nft-container">
                
                {
                    (() => {
                        let orcArrayCopy = [];

                        for (let i = 0; i < orcs; i++){
                            orcArrayCopy.push(<NFTCard key={i} owned="owned"></NFTCard>)
                        }
                        return orcArrayCopy
                    })()
                }
                {/*IIFE - Immediately Invoked Function Expression*/}
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                <NFTCard></NFTCard>
                </ul>
            </div>
        </div>

        </div>
    }
    </div>

    :
    <div>
        
        <div className='orc-body'>
            <h1>
            You must be Signed In access this page. 
            </h1>
        </div>

    </div>

}



</div>
  )
}

export default Profile