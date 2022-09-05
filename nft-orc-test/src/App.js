
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
import MetaIcon from './images/MetaMask.png'
import MetaImage from './images/MetamaskDoc.PNG'


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
        <div className='orc-body card' style={{width: "90vw", padding: "150px", overflow:"scroll", marginTop: '20px', height:"100vh"}}>
          <h1 style={{color: "white", margin: '30px'}}>Please Install MetaMask</h1>
          <h2 style={{color: "white"}}>To use the web3 OrcPortal Test Application you will need to install the Metamask Chrome extension</h2>
          <div className='mint-btn' >
          <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en' target={"_blank"}>Click Here To Download MetaMask <img src={MetaIcon} alt="image" width="40px" style={{position: "absolute", marginLeft:"10px"}}/></a>
          </div>

          <div>
            <h4 style={{color: "white"}}>
            The Link above will direct you to the Chrome store.
            </h4>

            <img src={MetaImage} alt="image" width="800px" style={{}}/>
            <h3 style={{color: "white"}}>
              Why Metamask?
            </h3>
            <h5 style={{color: "white"}}>
            MetaMask is a Chrome Extension with 10+ Million Users.
            </h5 >

            <h5 style={{color: "white"}}>
            It is a decentralized Wallet Protocol that will allow you to interact with Web3 Sites and the Blockchain. It is very easy to set up and start using.
            </h5 >


          </div>
         
        </div>
    
    }




    </div>
  );
}

export default App;
