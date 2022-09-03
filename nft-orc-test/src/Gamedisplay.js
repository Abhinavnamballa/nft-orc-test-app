import React from 'react'
import {Link} from 'react-router-dom'

function Gamedisplay(props) {

    const {orcs} = props

  return (
    <>

    {orcs > 0?      
    <div className='game-body'>
    <iframe src='http://localhost:8000//src/games/game1/MyProject.html' className="gameIFrame"  scrolling ="no" style={{position: "relative", left: "0px", top: "110px", width: "100%", height: "100%"}}></iframe>
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
    
    </>
    
  )
}

export default Gamedisplay