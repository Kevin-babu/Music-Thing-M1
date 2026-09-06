import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

let client;

export async function connectMCP() {

    if (client) return client;

    const transport = new StdioClientTransport({
        command: "node",
        args: ["../mcpServer/mcp_server.js"],
    });

    client = new Client({
        name: "spotify-backend",
        version: "1.0.0",
    });

    await client.connect(transport);

    console.log("Connected to Spotify MCP Server");

    return client;
}

export async function setAccessToken(accessToken) {
  const client = await connectMCP();

  console.log("here at setaccess")

   const toolresult =  await client.callTool({
    name: "set_access_token",
    arguments: {
      accessToken,
    },
  });

  console.log(toolresult)
}

export async function getTrackId(songs) {
  const client = await connectMCP();

  console.log("here at getTrackId with ", songs)

   const toolresult =  await client.callTool({
    name: "get_track_id",
    arguments: {
      songs
    },
  });

  console.log("result", toolresult)
  return toolresult;
}