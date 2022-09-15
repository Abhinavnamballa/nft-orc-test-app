
import './App.css';
import Body from './Body';
import Header from './Header';
import Games from './Games';
import Roadmap from './Roadmap';
import Gamedisplay from './Gamedisplay';
import Profile from './Profile';
import MintedModal from './MintedModal';
import {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import { ethers } from 'ethers';
import { Orcsv2 } from './ABI';
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
const [NFTcontract, setNFTContract] = useState("")
const [contractAddress, setContractAddress] = useState("")
const [contractNum, setContractNum] = useState(0)
const [contractName, setContractName] = useState("")
const [mintedName, setMintedName] = useState("")
const [mintedURL, setMintedURL] = useState("")

var ABI = Orcsv2


useEffect(() => {
if(window.ethereum) {
  pickContract()
}
}, [contractNum]);

useEffect(() => {
  if (window.ethereum && accounts){
    checkOrcs(accounts)
  }
}, [contractAddress]);




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

async function pickContract(){
  switch(contractNum){
    case 0:
       await import("./ABI").then(contract => {
            setNFTContract(contract.Orcsv2)
            setContractAddress(contract.contractAddress)
            setContractName(contract.contractName)
        })
        break;
    case 1:
        await import("./ABI2").then(contract => {
          setNFTContract(contract.Orcsv3)
          setContractAddress(contract.contractAddress)
          setContractName(contract.contractName)
          console.log(contract.contractAddress)
        })
        break;
    default:
        await import("./ABI").then(contract => {
            setNFTContract(contract.Orcsv2)
            setContractAddress(contract.contractAddress)
            setContractName(contract.contractName)
        })
        break;
}

}

async function checkOrcs(accountInput) {
  try {
    console.log(accountInput)
    console.log(contractAddress)
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const numberContract = new ethers.Contract(contractAddress, NFTcontract, provider)
    const hex = await numberContract.balanceOf(accountInput)
    setOrcs(parseInt(hex._hex))
  }
  catch {
    console.log("Error checking Orcs")
    console.log(contractAddress)
    setOrcs(0)
  }

}

const accountChangedHandler = (newAccount) => {
  console.log(newAccount)
  checkOrcs(newAccount)
  setAccounts(newAccount)
}

const listenToMint = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum)
  let contract = new ethers.Contract(contractAddress, NFTcontract, provider)
  contract.on("mintFinished", async (holder_address, ID) => {
    let info = {
      holder_address: holder_address,
      ID: ID
    }
    if (accounts && mintedName === ""){
      if (accounts.toLowerCase() == info.holder_address.toLowerCase()){
        let tokenMetadataURI = await contract.tokenURI(ID)
        if (tokenMetadataURI.startsWith("ipfs://")){
          tokenMetadataURI = `https://ipfs.io/ipfs/${tokenMetadataURI.split("ipfs://")[1]}`
      }
      let tokenMetadata = await fetch(tokenMetadataURI).then((response) => {
        return response.json()
      })
      let imageURL
      if (tokenMetadata["image"].startsWith("ipfs://")){
          imageURL = `https://ipfs.io/ipfs/${tokenMetadata["image"].split("ipfs://")[1]}`
      }
      else {
          imageURL = ""
      }
      setMintedName(tokenMetadata["name"])
      setMintedURL(imageURL)
      checkOrcs(accounts)
      }
    }
    console.log(JSON.stringify(info, null, 4))
    console.log(accounts, info.holder_address)
  })
}

const closeModal = () => {
  setMintedName("")
  setMintedURL("")
}


if (window.ethereum){
  window.ethereum.on("accountsChanged", connectWalletHandler);
}


if (window.ethereum && mintedName === ""){
  try {
    listenToMint()
  }
  catch(e) {
    console.log(e)
  }

}

  return (
    <div className="App">
      {/*<MintedModal name={"Blue Orc"} image={"https://ipfs.io/ipfs/QmRPPuN31QLZ8PgxEauENd5KQwibbEauNP3FeiPyiwCneH/OrcBlue.png"} close={closeModal}/> */}
      {
        mintedName? 
        <MintedModal name={mintedName} image={mintedURL} close={closeModal}/>
        :
        null
      }

<Art />
      {typeof window.ethereum !== 'undefined'?
            <Router>
            <Header orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} connectWalletHandler={connectWalletHandler} NFTcontract={NFTcontract} setNFTContract={setNFTContract} contractNum={contractNum} setContractNum={setContractNum} contractName={contractName} />
            <Routes>
            <Route path='/nft-orc-test-app/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} connectWalletHandler={connectWalletHandler} NFTcontract={NFTcontract} setNFTContract={setNFTContract} contractNum={contractNum} setContractNum={setContractNum} contractAddress={contractAddress} contractName={contractName} /> } ></Route>
            <Route path='/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} connectWalletHandler={connectWalletHandler} NFTcontract={NFTcontract} setNFTContract={setNFTContract} contractNum={contractNum} setContractNum={setContractNum} contractAddress={contractAddress} contractName={contractName} /> }></Route>
            <Route path='/nft-orc-test-app/Games' element={<Games orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading}/>} connectWalletHandler={connectWalletHandler}></Route>
            <Route path='/nft-orc-test-app/Profile' element={<Profile orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} error={error} setError={setError} loading={loading} setLoading={setLoading} NFTcontract={NFTcontract} contractAddress={contractAddress} contractName={contractName} />} > </Route>
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
