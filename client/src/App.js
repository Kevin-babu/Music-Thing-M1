import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './components/Login';
import Music from './components/Music';
import "./components/styles/background.css"

const code = new URLSearchParams(window.location.search).get("code");

function App() {
  console.log("rendering App --")
  return (
    
    code ?  
    <div style={{height:"100vh", width:"100%", overflow:"hidden", position:""}}>
      <div className="background-animation" style={{color:"white"}}>
        <div className="blob blob1"></div>
        <div className="blob blob2"></div>
        <div className="blob blob3"></div> 
      </div>
    
     <Music code = {code}/>
    </div>: <Login/>
  )
};

export default App;
