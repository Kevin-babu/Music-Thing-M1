import { Nav } from "react-bootstrap";


const date = new Date()
const year = date.getFullYear();

const sidebarStyle = {
  background: "rgba(1, 1, 1, 0.75)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid rgba(255,255,255,0.08)",
  borderRadius: "20px",
  height: "100%",
  width:"100%"
};

const navItem = {
  color: "#B3B3B3",
  fontSize: "15px",
  fontWeight: "500",
  padding: "12px 16px",
  borderRadius: "12px",
  display: "flex",
  alignItems: "center",
  gap: "12px",
  cursor: "pointer",
  transition: "all .2s ease",
};

export default function Sidebar( { setPage }) {
  return (
    <div style={sidebarStyle}>
      <div className="text-center mb-4 mt-3 mx-2">
        <h4
          style={{
            color: "#0edc9e",
            fontWeight: "700",
            letterSpacing: "2px",
          }}
        >
          LYRA
        </h4>
      </div>

      <Nav className="flex-column mt-5 ms-3 justify-content-center">

        <Nav.Link style={navItem} onClick={() => {
          setPage("music")
        }}>
          <i className="profile-btn bi bi-house-door-fill"></i>
          
        </Nav.Link>

        <Nav.Link style={navItem} onClick={() => {
          setPage("details")
        }}>
          <i className="profile-btn bi bi-stars"></i>
        </Nav.Link>

        <Nav.Link style={navItem} onClick={() => {
          setPage("music")
        }}>
          <i className="profile-btn bi bi-search"></i>
          
        </Nav.Link>

        <Nav.Link style={navItem} onClick={() => {
          setPage("Dashboard")
        }}>
          <i className="profile-btn bi bi-music-note-list"></i>
        </Nav.Link>

        <Nav.Link style={navItem} onClick={() => {
          setPage("Dashboard")
        }}>
          <i className="profile-btn bi bi-heart-fill"></i>
        </Nav.Link>

        <Nav.Link style={navItem} onClick={() => {
          setPage("Dashboard")
        }}>
          {/* <i className="profile-btn bi bi-graph-up-arrow"></i> */}
          <i className="profile-btn bi bi-bar-chart-line"></i>
          
        </Nav.Link>

        {/* <Nav.Link style={navItem} onClick={() => {
          setPage("Dashboard")
        }}>
          <i className="profile-btn bi bi-clock-history"></i>
        </Nav.Link> */}

      </Nav>

      <div className="mt-auto pt-5 ms-3 mb-5">
        <hr style={{ borderColor: "rgba(255,255,255,.08)" }} />

        <Nav.Link style={navItem} onClick={() => {
          setPage("settings")
        }}>
          <i className="profile-btn bi bi-gear-fill"></i>
          
        </Nav.Link>
      </div>

      <Nav.Link className="mt-auto pt-1 ms-2" style={navItem} onClick={() => {
          setPage("settings")
        }}>
          <img src="https://github.com/Kevin-babu/Music-Thing-M1/blob/main/client/public/2026-09-18%2010.42.44.jpg?raw=true" 
          style = {{width:"30px", height:"30px", marginTop:"30px"}}></img>
        </Nav.Link>
        <Nav.Link className="copywrite ps-3 ms-2" style={{...navItem, fontWeight:"300", fontSize:"10px" }} >
          <span>© {year}</span>
        </Nav.Link>
        <Nav.Link className="copywrite" style={{...navItem, fontWeight:"100",}} >
          <span className='' style={{position:"absolute",fontSize:"10px" }}>Kevin Babu</span>
        </Nav.Link>
    </div>
  );
}