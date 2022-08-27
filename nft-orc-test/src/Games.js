import React from 'react'
import {Link} from 'react-router-dom';
import './game.scss';

function Games(props) {

const {orcs, setOrcs, isConnected, accounts, setAccounts} = props


  return (
    <div className='Games'>

      {orcs > 0?
<div className="l-container">
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{backgroundImage: "url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_1.jpg)"}}>
        <div className='game-title'>
              <h3>Orc Fight</h3>  
        </div>
    </div>
  </div>
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{backgroundImage: "url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_2.jpg)"}}>
    <div className='game-title'>
              <h3>Orc Metaverse</h3>  
        </div>
    </div>
  </div>
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{backgroundImage: "url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_3.jpg)"}}>
    <div className='game-title'>
              <h3>Orc Board</h3>  
        </div>
    </div>
  </div>
  <div className="b-game-card">
    <div className="b-game-card__cover" style={{backgroundImage: "url(https://andrewhawkes.github.io/codepen-assets/steam-game-cards/game_4.jpg)"}}>
    <div className='game-title'>
              <h3>Orc Racing</h3>  
        </div>
    </div>
  </div>
</div>
    :
    <div> 
  

        <div className='orc-body'>
            <h1>
            You must Own an Orc To access this page. 
            </h1>

            Go To Mint one Now
            <h2 className='go-mint'>
            <Link to="/nft-orc-test-app/">Go Mint</Link>
            </h2>
        </div>
    </div>
    
    }

        
    </div>
  )
}

export default Games