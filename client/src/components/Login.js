
import { Container, Col, Row, Button } from 'react-bootstrap';
import '../App.css'

export default function Login() {

    console.log("here at login")

    const client_id = process.env.REACT_APP_SPOTIFY_CLIENT_ID
    const redirect_uri = process.env.REACT_APP_SPOTIFY_FRONTEND_URI  // Your redirect uri
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
                className="vh-100 align-items-center justify-content-center p-0"
                style={{
                  background:
                    "radial-gradient(circle at 50% 40%, #182b24 0%, #0d1117 45%, #080b0f 100%)",
                  color: "white",
                  overflow: "hidden",
                }}
              >
        <Row className='vh-100 align-items-center ms-4'>
          <Col>
            
                {/* Background glow */}
                <div
                  style={{
                    position: "absolute",
                    background: "rgba(30, 242, 64, 0.08)",
                    filter: "blur(120px)",
                    borderRadius: "50%",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-10%, -2  0%)",
                    pointerEvents: "none",
                  }}
                />  

                <Row className="justify-content-center w-100 m-3 ps-5 position-relative align-items-center">
                  <Col >
                    <div
                      className='p-3'
                      style={{
                        background: "rgba(18, 22, 27, 0.88)",
                        border: "1px solid rgb(61, 65, 61)",
                        borderRadius: "20px",
                        textAlign: "center",
                        color: "white",
                        width:"80%",
                        boxShadow: "0 20px 60px rgba(0,0,0,0.45)",
                      }}
                    >
                      {/* Logo */}
                      <img src="https://github.com/Kevin-babu/Music-Thing-M1/blob/main/client/public/2026-09-18%2010.42.44.jpg?raw=true" 
          style = {{width:"60px", height:"60px", marginTop:"30px", marginBottom:"20px", borderRadius:"10px"  }}></img>
                      {/* <div
                        className="d-flex justify-content-center align-items-center my-4 "
                        style={{
                          margin: "0 auto",
                          borderRadius: "18px",
                          background: "rgba(30, 242, 64, 0.1)",
                          border: "1px solid rgba(30, 242, 64, 0.2)",
                          width:"50%"
                        }}
                      >
                        <i
                          className="bi bi-stars"
                          style={{
                            fontSize: "2rem",
                            color: "#1ef240",
                          }}
                        />
                      </div> */}

                      {/* Title */}
                      <h1
                        style={{
                          fontSize: "2.2rem",
                          fontWeight: "700",
                          marginBottom: "0.8rem",
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
                        All in one place.<br/>

                        If you have a premium account please send a request to <span style={{color:"green"}}>musicmana1747@gmail.com</span>
                      </p>

                      {/* Login button */}
                      <a href={AUTHURL}
                      style={{textDecoration : "none"}}>
                        <button
                        className="w-100 d-flex align-items-center justify-content-center demo-button"
                        style={{height: "52px", textDecoration : "none"}}
                          >
                        <i
                          className="bi bi-spotify me-2"
                          style={{ fontSize: "1.2rem" }}
                        />
                        Continue with your Spotify account
                      </button>
                      </a>
                      
                      <button
                        as="a"
                        href={AUTHURL}
                        className="w-100 d-flex align-items-center justify-content-center demo-button mt-3"
                        style={{
                          height: "52px", 
                        }}
                      >
                        <i
                          className="bi bi-spotify me-2"
                          style={{ fontSize: "1.2rem" }}
                        />
                        Get Credential with restricted access
                      </button>

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
              
          </Col>
          <Col>
              <Row className='me-5 mb-3  p-3 bor'
              style={{height:"50%"}}>
                <div className='vh-50 me-2' style={{position:"relative"}}>
                  <img src='https://i.pinimg.com/736x/14/c9/ba/14c9ba29f5d27da98cdcd12edba318cb.jpg'
                  style={{borderRadius:"50px", height:"450px"}}></img>
                  <div style={{position:"absolute", display:"flex", top:"80%", left:"10%", }}>
                        <button style={{width:"200px", }}
                  className='demo-button' >
                    watch demo</button>
                    <button style={{width:"280px"}}
                    className='demo-button ms-3' >
                   Read Spotify API restrictions</button>
                  </div>
                  
                </div>

              </Row>
              {/* <Row className='my-3 p-3'
              style={{height:"50%"}}>
                <div style={{fontWeight:"500"}}>Features are limited to Premium accounts</div>
                <span>Please use the following credemtials</span>
                <div>UserName: </div>
                <div>Password: </div>
                
                
              </Row>          */}
          </Col>
        </Row>
    </Container>                    
);
}
