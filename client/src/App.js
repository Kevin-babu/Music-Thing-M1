import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login';
import Music from './components/Music';
import "./components/styles/background.css"
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';

const code = new URLSearchParams(window.location.search).get("code");




function App() {

  const [page, setPage] = useState("Dashboard")

  // const [accessToken, setAccessToken] = useState(null);
  // useEffect(() => {
  //   if (code) {
  //     const token = Auth(code);
  //     setAccessToken(token);
  //   }
  // }, [code]);

  const accessToken = Auth(code);

  console.log("rendering App --")
  return (
    
    code ?  
    <div style={{height:"100vh", width:"100%", overflow:"hidden", position:""}}>
      <div className="background-animation" style={{color:"white"}}>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div> 
      </div>
    
     {page === "music"? <Music code = {code} setPage={setPage} accessToken={accessToken}/> : <Dashboard setPage={setPage}/>}
    </div>: <Login/>
  )
};

export default App;
