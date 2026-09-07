import express from "express";
import { randomUUID } from "node:crypto";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { isInitializeRequest } from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import axios from "axios";

let spotifyAccessToken;

function createServer() {
  const server = new McpServer(
    {
      name: "SpotifyMCP",
      version: "1.0.0",
    },
    {
      capabilities: {
        resources: {},
        tools: {},
        prompts: {},
      },
    }
  );

  server.registerTool(
    "set_access_token",
    {
      title: "Set Spotify Access Token",
      description: "Stores the Spotify access token for future tool calls.",
      inputSchema: z.object({
        accessToken: z.string().describe("The Spotify OAuth access token"),
      }),
    },
    async ({ accessToken }) => {
      spotifyAccessToken = accessToken;
      console.log("set_access_token called", spotifyAccessToken);
      return {
        content: [{ type: "text", text: "Spotify access token stored successfully." }],
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
            artist: z.string(),
          })
        ),
        accessToken: z.string().describe("The Spotify OAuth access token"),
      }),
      outputSchema: z.object({
        tracks: z.array(
          z.object({
            trackId: z.string(),
            trackName: z.string(),
            uri: z.string(),
            albumUrl: z.string(),
            artist: z.string(),
            title: z.string(),
          })
        ),
      }),
    },
    async ({ songs, accessToken }) => {
      console.log("get_track_id called");

      const trackList = await Promise.all(
        songs.map(async (song) => {
          try {
            const response = await axios.get("https://api.spotify.com/v1/search", {
              params: {
                q: `track:${song.name} artist:${song.artist}`,
                type: "track",
                limit: 1,
              },
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            if (response.data.tracks.items.length === 0) {
              return null;
            }

            const track = response.data.tracks.items[0];

            return {
              trackId: track.id,
              albumid: track.album.id,
              trackName: track.name,
              uri: track.uri,
              albumUrl: track.album.images[0]?.url ?? "",
              artist: track.artists[0]?.name ?? song.artist,
              title: track.name,
            };
          } catch (err) {
            console.error(`Error fetching ${song.name}:`, err.message);
            return null;
          }
        })
      );

      return {
        content: [{ type: "text", text: `Resolved tracks` }],
        structuredContent: { tracks: trackList.filter(Boolean) },
      };
    }
  );

  return server;
}

const app = express();
app.use(express.json());



app.post("/mcp", async (req, res) => {
  try {
     const server = createServer();
     const transport = new StreamableHTTPServerTransport({
       sessionIdGenerator: undefined,
     });

     res.on("close", () => {
       transport.close();
       server.close();
     });

     await server.connect(transport);
     await transport.handleRequest(req, res, req.body);
   } catch (err) {
     console.error("Error handling MCP request:", err);
     if (!res.headersSent) {
       res.status(500).json({
         jsonrpc: "2.0",
         error: { code: -32603, message: "Internal server error" },
         id: null,
       });
     }
   }
});

// GET is used for server-to-client notifications via SSE
app.get("/mcp", async (req, res) => {
  // res.status(405).json({
  //    jsonrpc: "2.0",
  //    error: { code: -32000, message: "Method Not Allowed: server is stateless" },
  //    id: null,
  //  });
  res.send('Hello World!');
});

// DELETE ends a session
app.delete("/mcp", async (req, res) => {
  res.status(405).json({
     jsonrpc: "2.0",
     error: { code: -32000, message: "Method Not Allowed: server is stateless" },
     id: null,
   });
});

