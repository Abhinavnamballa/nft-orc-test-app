
import './App.css';
import Body from './Body';
import Header from './Header';
import Games from './Games';
import Roadmap from './Roadmap';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {

const [isConnected, setConnected] = useState(false)
const [orcs, setOrcs] = useState(0)
const [supply, setSupply] = useState(0)
const [accounts, setAccounts] = useState([])



  return (
    <div className="App">

      {typeof window.ethereum !== 'undefined'?
            <Router>
            <Header orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} />
            <Routes>
            <Route path='/nft-orc-test-app/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts}/>}></Route>
            <Route path='/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts}/>}></Route>
            <Route path='/nft-orc-test-app/Games' element={<Games orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts}/>}></Route>
            <Route path='/nft-orc-test-app/Roadmap' element={<Roadmap/>}></Route>
            </Routes>
            </Router>

        :
        <div>
          <h1>Please Install MetaMask</h1>
          <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en' target={"_blank"}>Click Here To Download MetaMask</a>
        </div>
    
    }

    </div>
  );
}

export default App;
