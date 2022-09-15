import React from 'react'
import Confetti from 'react-confetti';

function MintedModal(props) {
  return (
    <>
    <Confetti width={1000} height={1000}/>
    <div className='minted-modal'>
        <button className='close-modal-btn' onClick={() => {props.close()}}>X</button>
        <div className='modal-title-container'>
            <h2>Hooray! You Minted:</h2>
            <h3>{props.name}</h3>
        </div>
        <div className='modal-image-container'>
            <img src={props.image} alt={props.name} width="70%"></img>
        </div>

    </div>
    </>
  )
}

export default MintedModal