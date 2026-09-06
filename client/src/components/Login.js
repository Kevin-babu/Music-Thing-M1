import React from 'react'
import { Container, Col, Row, Button } from 'react-bootstrap';
// import "dotenv/config";

export default function Login() {

    console.log("here at login")

    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirect_uri = "http://127.0.0.1:3000"
    const response_type = "code"
    const scope = [
        "streaming",
        "user-read-private",
        "user-read-playback-state",
        "user-read-email",
        "playlist-read-private",
        "user-library-read",
        "playlist-read-private",
        "playlist-read-collaborative",
        "playlist-modify-private",
        "playlist-modify-public",
      ].join(" ");


    const AUTHURL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=${response_type}&redirect_uri=${redirect_uri}&scope=${encodeURIComponent(scope)}`

    console.log("URL",AUTHURL)

  
      //   return (
      //     <Container
      //       fluid
      //       className="vh-100 d-flex align-items-center justify-content-center"
      //       style={{
      //         background:
      //           "linear-gradient(135deg, #0f172a 0%, #111827 35%, #1e293b 100%)",
      //       }}
      //     >
      //       <Row className="justify-content-center w-100">
      //         <Col md={6} lg={5}>
      //           <div
      //             style={{
      //               background:
      //                 "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.05))",
      //               backdropFilter: "blur(24px)",
      //               WebkitBackdropFilter: "blur(24px)",
      //               border: "1px solid rgba(255,255,255,0.1)",
      //               borderRadius: "24px",
      //               padding: "3rem",
      //               textAlign: "center",
      //               color: "white",
      //               boxShadow:
      //                 "0 8px 32px rgba(0,0,0,0.35), inset 0 1px 1px rgba(255,255,255,0.12)",
      //             }}
      //           >
      //             <h1
      //               style={{
      //                 fontWeight: "700",
      //                 fontSize: "3rem",
      //                 marginBottom: "1rem",
      //               }}
      //             >
      //               Welcome
      //             </h1>
      
      //             <p
      //               style={{
      //                 color: "#cbd5e1",
      //                 fontSize: "1.1rem",
      //                 marginBottom: "2.5rem",
      //               }}
      //             >
      //               Connect your Spotify account and explore your music with a
      //               beautiful interface.
      //             </p>
      
      //             <Button
      //               variant="success"
      //               size="lg"
      //               style={{
      //                 borderRadius: "50px",
      //                 padding: "12px 40px",
      //                 fontWeight: "600",
      //                 fontSize: "1.1rem",
      //               }}
      //             >
      //               <a href={AUTHURL} > Login with Spotify</a>
      //             </Button>
      //           </div>
      //         </Col>
      //       </Row>
      //     </Container>
      //   );
      // }

      return (
  <Container
    fluid
    className="vh-100 d-flex align-items-center justify-content-center p-0"
    style={{
      background:
        "radial-gradient(circle at 50% 40%, #182b24 0%, #0d1117 45%, #080b0f 100%)",
      color: "white",
      overflow: "hidden",
    }}
  >
    {/* Background glow */}
    <div
      style={{
        position: "absolute",
        width: "500px",
        height: "500px",
        background: "rgba(30, 242, 64, 0.08)",
        filter: "blur(120px)",
        borderRadius: "50%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />

    <Row className="justify-content-center w-100 m-0 position-relative">
      <Col xs={11} sm={8} md={6} lg={4} xl={4}>
        <div
          style={{
            background: "rgba(18, 22, 27, 0.88)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "20px",
            padding: "3rem 2.5rem",
            textAlign: "center",
            color: "white",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
          }}
        >
          {/* Logo */}
          <div
            className="d-flex justify-content-center align-items-center mb-4"
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto",
              borderRadius: "18px",
              background: "rgba(30, 242, 64, 0.1)",
              border: "1px solid rgba(30, 242, 64, 0.2)",
            }}
          >
            <i
              className="bi bi-stars"
              style={{
                fontSize: "2rem",
                color: "#1ef240",
              }}
            />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "2.2rem",
              fontWeight: "700",
              marginBottom: "0.5rem",
              letterSpacing: "-0.5px",
            }}
          >
            Welcome to Lyra
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "#8f98a3",
              fontSize: "0.95rem",
              lineHeight: "1.6",
              marginBottom: "2rem",
            }}
          >
            Your music. Your playlists.
            <br />
            All in one place.
          </p>

          {/* Login button */}
          <Button
            as="a"
            href={AUTHURL}
            className="w-100 d-flex align-items-center justify-content-center"
            style={{
              height: "52px",
              borderRadius: "12px",
              background: "#1ef240",
              border: "none",
              color: "#07100a",
              fontWeight: "700",
              fontSize: "1rem",
              boxShadow: "0 8px 24px rgba(30, 242, 64, 0.15)",
            }}
          >
            <i
              className="bi bi-spotify me-2"
              style={{ fontSize: "1.2rem" }}
            />
            Continue with Spotify
          </Button>

          <p
            style={{
              marginTop: "1.5rem",
              marginBottom: 0,
              fontSize: "0.75rem",
              color: "#5f6873",
            }}
          >
            Connect your Spotify account to get started
          </p>
        </div>
      </Col>
    </Row>
  </Container>
);
}
