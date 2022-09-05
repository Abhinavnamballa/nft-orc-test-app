
import './App.css';
import Body from './Body';
import Header from './Header';
import Games from './Games';
import Roadmap from './Roadmap';
import Gamedisplay from './Gamedisplay';
import Profile from './Profile';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { ethers } from 'ethers';
import { ABI } from './ABI';
import Art from './background/Art';


function App() {

const [isConnected, setConnected] = useState(false)
const [orcs, setOrcs] = useState(0)
const [supply, setSupply] = useState(0)
const [accounts, setAccounts] = useState("")
const [error, setError] = useState("")
const [loading, setLoading] = useState(false)


useEffect(() => {

}, []);


const contractAddress = '0xb62C298B0173E7A0b5EEA9FCAa1f72227AF86bd9'

const connectWalletHandler = () => {
  if (window.ethereum) {
    window.ethereum.request({method: 'eth_requestAccounts'})
    .then(result => {
      accountChangedHandler(result[0])
    })
  }
  else{
    setError("Please Install MetaMask")
  }
}

const getUserBalance = (address) => {
    window.ethereum.request({method: 'eth_getBalance', params: [address, 'latest']})
    .then(balance => {
      console.log(balance)
    })
}

async function checkOrcs(accountInput) {
  console.log(accountInput)
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const numberContract = new ethers.Contract(contractAddress, ABI, provider)
  const hex = await numberContract.balanceOf(accountInput)
  setOrcs(parseInt(hex._hex))
}

const accountChangedHandler = (newAccount) => {
  console.log(newAccount)
  checkOrcs(newAccount)
  setAccounts(newAccount)
}


if (window.ethereum){
  window.ethereum.on("accountsChanged", connectWalletHandler);
}


  return (
    <div className="App">
<Art />
      {typeof window.ethereum !== 'undefined'?
            <Router>
            <Header orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} connectWalletHandler={connectWalletHandler} />
            <Routes>
            <Route path='/nft-orc-test-app/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} connectWalletHandler={connectWalletHandler}/>} ></Route>
            <Route path='/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} connectWalletHandler={connectWalletHandler}/>}></Route>
            <Route path='/nft-orc-test-app/Games' element={<Games orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading}/>} connectWalletHandler={connectWalletHandler}></Route>
            <Route path='/nft-orc-test-app/Profile' element={<Profile orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading}/>} > </Route>
            <Route path='/nft-orc-test-app/Games/GameDisplay' element={<Gamedisplay orcs={orcs} />}></Route>
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
