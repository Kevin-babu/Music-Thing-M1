
const app = express();
const port = 3001;

import axios from "axios"
import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import { GoogleGenAI } from "@google/genai";
// import {connectMCP, setAccessToken, getTrackId} from "./mcp_client.js";



dotenv.config();

await connectMCP();

const clientSecret = process.env.clientSecret;
const redirectURI = process.env.redirectUri;
const clientId = process.env.clientId;

app.listen(3001, () => {
    console.log("Backend running");
});


app.use(cors());
app.use(express.json());


import bodyParser from "body-parser";
app.use(bodyParser.json());

import SpotifyWebApi from "spotify-web-api-node";

app.post('/login', (req, res) => {
    console.log('Authorization request received:', req.body); //req.body
    const code = req.body.code; 
    console.log('Authorization code received:', code); //code
    // Get the authorization code from the request body
    // Exchange the authorization code for an access token using Spotify's API
    // You can use a library like axios or node-fetch to make the request 
    

    console.log("Reached here");
    console.log("Client ID:", clientId)
    console.log("Client Secret:", clientSecret)
    console.log("Redirect URI:", redirectURI)
    


    const SpotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectURI
    });

    console.log("Spotify API created");

    SpotifyApi.authorizationCodeGrant(code).then(data => {
        const accessToken = data.body['access_token'];
        const refreshToken = data.body['refresh_token'];
        const expiresIn = data.body['expires_in'];
        
        console.log('Access Token:', accessToken);

        setAccessToken(accessToken)


        res.json({
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn
        });
    }).catch(err => {
        console.error('Error exchanging code for token:', err);
        res.status(500).send('Error exchanging code for token');
    });

    
    

})

app.post('/refresh', (req, res) => {
    
    const refreshToken = req.body.refreshToken;
    console.log('Refresh token received:', refreshToken);

    const SpotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: redirectURI,
        refreshToken: refreshToken
    });

    SpotifyApi.refreshAccessToken().then(data => {
        const accessToken = data.body['access_token'];
        const expiresIn = data.body['expires_in'];

        console.log('New Access Token:', accessToken);

        res.json({
            access_token: accessToken,
            expires_in: expiresIn
        });
    }).catch(err => {
        console.error('Error refreshing access token:', err);
        res.status(500).send('Error refreshing access token');
    });
});


app.post('/api/profile', async (req, res) => {
    const accessToken = req.body.accessToken

    try {
        const response = await axios.get(
          "https://api.spotify.com/v1/me",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("fetched profile from spotify")
        res.json(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
    
        res.status(err.response?.status || 500).json({
          error: err.response?.data || "Failed to fetch profile",
        });
      }
});



const playlistCache = new Map();


app.post('/api/playlists', async (req, res) => {

    // console.log("inside playlist")

    const accessToken = req.body.accessToken

    // console.log(accessToken)

    const cachedPlaylists = playlistCache.get(accessToken);


    if (cachedPlaylists) {

      console.log("returning from cache")
      return res.json(cachedPlaylists);
    }


    


    try {
        
        const response = await axios.get(
          "https://api.spotify.com/v1/me/playlists",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log("fetched playlist from spotify")
        playlistCache.set(accessToken, response.data);


        res.json(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
    
        res.status(err.response?.status || 500).json({
          error: err.response?.data || "Failed to fetch playlists",
        });


      }
});

const albumCache = new Map();

app.post('/api/album', async (req, res) => {

    const accessToken = req.body.accessToken
    const id = req.body.albumId



    const albumCacheData = albumCache.get(id)

    if (albumCacheData) {
        return res.json(albumCacheData)
    }

    try {
        const response = await axios.get(
          `https://api.spotify.com/v1/albums/${id}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        albumCache.set(id, response.data); // ********************* 

        console.log(
            "returning from spotify"
        )
        res.json(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
    
        res.status(err.response?.status || 500).json({
          error: err.response?.data || "Failed to fetch playlists",
        });
      }
});

app.post('/api/playlist-tracks', async (req, res) => {

    const accessToken = req.body.accessToken
    const id = req.body.playlistID

    console.log("playlist id --", req.body)

    try {
        const response = await axios.get(
          `https://api.spotify.com/v1/playlists/${id}/items `,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        console.log(
            "returning from spotify"
        )
        res.json(response.data);
      } catch (err) {
        console.error(err.response?.data || err.message);
    
        res.status(err.response?.status || 500).json({
          error: err.response?.data || "Failed to fetch playlists",
        });
      }
});



// app.post('/llm', async (req, res)=>{

//     const prompt = req.body.prompt
//     const ConversionPrompt = `Create 10 Spotify songs for: ${prompt}. Format: Here is a playlist for you 1. Song - Artist ... 10. Song - Artist If the request is unclear, reply only: CLARIFY`
//     const ai = new GoogleGenAI({});

//     console.log("llm thinking")

   

//     // const result = getTrackId(name, artist)

//     const interaction = await ai.interactions.create({
//       model: "gemini-3.5-flash",
//       input: ConversionPrompt,
//     });
    

//     console.log(interaction.output_text);

//     const songs = interaction.output_text
//       .split("\n")
//       .filter(line => /^\d+\./.test(line)) // Keep only numbered lines
//       .map(line => {
//         const [, song] = line.match(/^\d+\.\s*(.*)$/);
//         const [name, artist] = song.split(/\s*-\s*/);

//         return {
//           name: name.trim(),
//           artist: artist.trim()
//         };
//     });

//     console.log("after update", songs);

//     const songs = [
//   { name: 'Mere Gully Mein', artist: 'DIVINE, Naezy' },
//   { name: 'Namastute', artist: 'Seedhe Maut' },
//   { name: 'No Cap', artist: 'KR$NA' },
//   { name: 'Machayenge', artist: 'Emiway Bantai' },
//   { name: 'Kaam Bhaari', artist: 'Kaam Bhaari' },
//   { name: 'Kohinoor', artist: 'DIVINE' },
//   { name: 'Saza', artist: 'E' },
//   { name: 'Aafat Waapas', artist: 'Naezy' },
//   { name: '101', artist: 'Seedhe Maut' },
//   { name: 'Jungli Sher', artist: 'DIVINE' }
// ]

//     const result = await getTrackId(songs)
    
//     console.log("Tool final result ", result)

//     try {
//       if (result.content[0].text == "Resolved tracks")
//         {res.status(200).json({
//           "reply" : interaction.output_text,
//           "tracks" : result})
//         }
//       else{
//         res.status(400).json(result)
//       }
        

      
//     }
//     catch (err){
//       res.status(err.response?.status || 500).json({
//           error: err.response?.data || "Failed to fetch playlists",
//         });
//     }
    
// })





app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});