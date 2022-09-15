import React, { useEffect } from 'react'

function NFTCard(props) {
    useEffect(() => {
        
    })
  return (
    <>

{
    props.owned? 

<div className='nft-card' style={{backgroundImage: `url(${props.image})`, backgroundRepeat: "no-repeat", backgroundSize: "200px 300px"}}>
    {
        props.name? 

        <>
    <h3 style={{background:"rgba(0,0,0,0.6)", position: "relative", top:"-40px"}}>
        {props.name}
    </h3>
    <h3>
    </h3>
        </>
        :
        <>
    <h3>
        Owned Orc
    </h3>
    <h3>
        Loading Image....
    </h3>
        </>
    }
</div>

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