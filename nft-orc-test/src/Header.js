import React, {useEffect} from 'react'
import { ethers } from 'ethers'
import { ABI } from './ABI'
import {Link} from 'react-router-dom';
import gameIcon from './images/game-icon.png'
import monIcon from './images/mon-icon.png'

function Header(props) {



const {orcs, accounts,setError, connectWalletHandler, contractName} = props

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


}, [])


  return (
    <div className='Header'>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
<defs>
<path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
</defs>
<g className="parallax">
<use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(14, 2, 64,0.7" />
<use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(14, 2, 64,0.5)" />
<use xlinkHref="#gentle-wave" x="48" y="5" fill="rgb(14, 2, 64)" />
<use xlinkHref="#gentle-wave" x="48" y="7" fill="rgb(14, 2, 64)" />
</g>
</svg>
            <Link to="/nft-orc-test-app/"><h1 className='title'>Orc Portal</h1></Link>
        <ul className='nav-items'>
            <li className='menu-item'><Link to="/nft-orc-test-app/">Home</Link></li>
            <li className='menu-item'><Link to="/nft-orc-test-app/Games">Games</Link></li>
            <li className='menu-item'><Link to="/nft-orc-test-app/Roadmap">Roadmap</Link></li>
        </ul>
        <ul className='nav-items'>
            <li className='menu-item'>{contractName}</li>
            <li className='menu-item' style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}><img src={monIcon} className="icon-image" alt="image" width="20px" style={{marginRight: "5px"}}/> <h5> : {orcs}</h5></li>
            <li className='menu-item' style={{display: "flex", justifyContent: "center", alignItems: "center", color: "white"}}><img src={gameIcon} className="icon-image" alt="image" width="20px" style={{marginRight: "5px"}}/> <h5> : 0</h5></li>
        </ul>
        {orcs > 0 ? 
          (accounts.length > 0? 
            <div>
               <Link style={{color: "white"}} to={"/nft-orc-test-app/Profile"}><h3 className='sign-in'>{accounts.slice(0,4)}...{accounts.slice(35)}</h3></Link>        
            </div>
            :
            "Something went wrong: Refresh Page and try again.")
         :

         (accounts.length > 0? 
            <div>
               <Link style={{color: "white"}} to={"/nft-orc-test-app/Profile"}><h3 className='sign-in'>{accounts.slice(0,4)}...{accounts.slice(35)}</h3></Link>         
            </div>
            :
            <h3 className='sign-in' onClick={connectWalletHandler}>Connect Wallet</h3>)
         
        } 
    </div>
  )
}

export default Header