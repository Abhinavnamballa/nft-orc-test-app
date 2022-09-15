import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {contractAddress} from './ABI2'

function NFTCard(props) {
    useEffect(() => {
        
    })
  return (
    <>

{
    props.owned? 

<>
    {
        props.name? 

    <a className="nft-link" href={`https://testnets.opensea.io/assets/mumbai/${contractAddress}/${props.id}`} target="_new">
    <div className='nft-card' style={{backgroundImage: `url(${props.image})`, backgroundRepeat: "no-repeat", backgroundSize: "200px 300px"}}>
    <h3 style={{background:"rgba(0,0,0,0.6)", position: "relative", top:"-40px"}}>
        {props.name}
    </h3>
    <h3>
    </h3>
    </div>
    </a>
        :
    <div className='nft-card' style={{backgroundImage: `url(${props.image})`, backgroundRepeat: "no-repeat", backgroundSize: "200px 300px"}}>
    <h3>
        Owned Orc
    </h3>
    <h3>
        Loading Image....
    </h3>
    </div>
    }
</>

:
<div className='unknown'>
    <h1>
        ?
    </h1>
</div>
}
    </>

  )
}

export default NFTCard