import React from 'react'

function NFTCard(props) {
  return (
    <>

{
    props.owned? 

<div className='nft-card'>
    <h3>
        Owned Orc
    </h3>
    <h3>
        Loading Image....
    </h3>
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