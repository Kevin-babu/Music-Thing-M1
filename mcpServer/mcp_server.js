import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js"
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js"
import { z } from "zod";
import axios from "axios";


let spotifyAccessToken;

const server = new McpServer(
    {
        name : "SpotifyMCP",
        version :"1.0.0",
    
    },
    {
        capabilities:{
            resources: {},
            tools: {},
            prompts : {}
        }
    }
)

server.registerTool(
  "set_access_token",
  {
    title: "Set Spotify Access Token",
    description: "Stores the Spotify access token for future tool calls.",
    inputSchema: z.object({
      accessToken: z
        .string()
        .describe("The Spotify OAuth access token")
    })
  },
  async ({ accessToken }) => {

    spotifyAccessToken = accessToken;

    console.log("set_access_token called")

    return {
      content: [
        {
          type: "text",
          text: "Spotify access token stored successfully."
        }
      ]
    };
  }
);

server.registerTool(
  "get_track_id",
  {
    title: "Get Track IDs",
    description: "Get Spotify track IDs for an array of songs",

    inputSchema: z.object({
      songs: z.array(
        z.object({
          name: z.string(),
          artist: z.string()
        })
      )
    }),

    outputSchema: z.object({
      tracks: z.array(
        z.object({
          trackId: z.string(),
          trackName: z.string(),
          uri:z.string(),
          albumUrl: z.string(),
          artist:z.string(),
          title:z.string()
        })
      )
    })
  },

  async ({ songs }) => {

    console.log("get_track_id called");

    console.log("Spotify Access Token in get tracks tool:", spotifyAccessToken);

    const trackList = await Promise.all(

      songs.map(async (song) => {

        try {

          const response = await axios.get(
            "https://api.spotify.com/v1/search",
            {
              params: {
                q: `track:${song.name} artist:${song.artist}`,
                type: "track",
                limit: 1
              },
              headers: {
                Authorization: `Bearer ${spotifyAccessToken}`
              }
            }
          );

          if (response.data.tracks.items.length === 0) {
            return null;
          }

          const track = response.data.tracks.items[0];

          console.log(`Fetched track for ${song.name}:`, track.id);

          return {
            trackId: track.id,
            albumid:track.album.id,
            trackName: track.name,
            uri:track.uri,
            albumUrl: track.album.images[0]?.url ?? "",
            artist: track.artists[0]?.name ?? song.artist,
            title: track.name
          };

        } catch (err) {

          console.error(`Error fetching ${song.name}:`, err.message);

          return null;
        }

      })

    );

    return {
      content: [
        {
          type: "text",
          text: `Resolved tracks`
        }
      ],
      structuredContent: {
        tracks: trackList.filter(Boolean)
      }
    };
  }
);

async function Main(params) {
    const transport = new StdioServerTransport()
    await server.connect(transport);
}

Main()