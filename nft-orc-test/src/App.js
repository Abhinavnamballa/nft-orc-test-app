
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
      <Router>
      <Header orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts} />
      <Routes>
      <Route path='/' element={<Body orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts}/>}></Route>
      <Route path='/Games' element={<Games orcs={orcs} setOrcs={setOrcs} isConnected={isConnected} setConnected={setConnected} accounts={accounts} setAccounts={setAccounts}/>}></Route>
      <Route path='/Roadmap' element={<Roadmap/>}></Route>
      </Routes>
      </Router>
    </div>
  );
}

export default App;
