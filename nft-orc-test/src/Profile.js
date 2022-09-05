import React, { useState, useEffect } from "react"
import './profile.css'
import NFTCard from "./NFTCard"





function Profile(props) {

 const [localLoading, setLocalLoading] = useState(false)

 const {orcs, setOrcs, isConnected, accounts, error, setError, loading, setLoading} = props


 useEffect(() => {

 }, [])



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
            <div><h3>Orcs Owned: {orcs}</h3><h3>Games Owned: 0</h3></div>
        </div>

        <div className="nft-display">
            <div>
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
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
                    <NFTCard></NFTCard>
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