import React, {useEffect} from 'react'
import { ethers } from 'ethers'
import { ABI } from './ABI'
import {Link} from 'react-router-dom';
import gameIcon from './images/game-icon.png'
import monIcon from './images/mon-icon.png'

function Header(props) {



const {orcs, setOrcs, accounts, setAccounts, setError} = props

const contractAddress = '0xb62C298B0173E7A0b5EEA9FCAa1f72227AF86bd9'


useEffect(() => {
    {
        // The "any" network will allow spontaneous network changes
        const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
        provider.on("network", (newNetwork, oldNetwork) => {
            // When a Provider makes its initial connection, it emits a "network"
            // event with a null oldNetwork along with the newNetwork. So, if the
            // oldNetwork exists, it represents a changing network
            if (oldNetwork) {
                window.location.reload();
            }
        });
    }
    try {
        checkOrcs()
    }
    catch {
       setError("Please connect to the Polygon Mumbai Testnet and Try again.")
    }

}, [])


async function checkOrcs() {
  try{
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const numberContract = new ethers.Contract(contractAddress, ABI, provider)
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccounts(accounts)
    const hex = await numberContract.balanceOf(accounts[0])
    setOrcs(parseInt(hex._hex))
  }
  catch {
    setError("Please connect to the Polygon Mumbai Testnet and Try again.")
  }

}

  return (
    <div className='Header'>
        <h1 className='title'><Link to="/">Orc Portal</Link></h1>
        <ul className='nav-items'>
            <li className='menu-item'><Link to="/nft-orc-test-app/">Home</Link></li>
            <li className='menu-item'><Link to="/nft-orc-test-app/Games">Games</Link></li>
            <li className='menu-item'><Link to="/nft-orc-test-app/Roadmap">Roadmap</Link></li>
        </ul>
        <ul className='nav-items'>
            <li className='menu-item' style={{display: "flex", justifyContent: "center", alignItems: "center"}}><img src={monIcon} alt="image" width="20px" style={{marginRight: "5px"}}/> <h5> : {orcs}</h5></li>
            <li className='menu-item' style={{display: "flex", justifyContent: "center", alignItems: "center"}}><img src={gameIcon} alt="image" width="20px" style={{marginRight: "5px"}}/> <h5> : 0</h5></li>
        </ul>
        {orcs > 0 ? 
          (accounts.length > 0? 
            <div>
               <h3 className='sign-in'>{accounts[0].slice(0,4)}...{accounts[0].slice(35)}</h3>           
            </div>
            :
            "Something went wrong: Refresh Page and try again.")
         :

         (accounts.length > 0? 
            <div>
               <h3 className='sign-in'>{accounts[0].slice(0,4)}...{accounts[0].slice(35)}</h3>           
            </div>
            :
            <h3 className='sign-in' onClick={checkOrcs}>Connect Wallet</h3>)
         
        } 
    </div>
  )
}

export default Header