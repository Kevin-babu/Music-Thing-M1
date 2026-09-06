import React from "react";
import { Nav } from "react-bootstrap";

const sidebarStyle = {
  background: "rgba(18, 18, 18, 0.75)",
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

export default function Sidebar() {
  return (
    <div style={sidebarStyle}>
      <div className="text-center mb-4 mt-3 mx-2">
        <h4
          style={{
            color: "#1ef240",
            fontWeight: "700",
            letterSpacing: "2px",
          }}
        >
          LYRA
        </h4>
      </div>

      <Nav className="flex-column mt-5 ms-3 justify-content-center">

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-house-door-fill"></i>
          
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-stars"></i>
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-search"></i>
          
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-music-note-list"></i>
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-heart-fill"></i>
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-collection-play"></i>
          
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-bar-chart-line"></i>
          
        </Nav.Link>

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-clock-history"></i>
        </Nav.Link>

      </Nav>

      <div className="mt-auto pt-4 ms-3">
        <hr style={{ borderColor: "rgba(255,255,255,.08)" }} />

        <Nav.Link style={navItem}>
          <i className="profile-btn bi bi-gear-fill"></i>
          
        </Nav.Link>
      </div>
    </div>
  );
}