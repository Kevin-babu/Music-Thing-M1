import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

let client;

export async function connectMCP() {

    console.log("Connecting to MCP Server...");

    if (client) return client;

     const transport = new StreamableHTTPClientTransport(
      new URL(process.env.mcpServerUri)
    );

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

export async function getTrackId(songs, accessToken) {
  const client = await connectMCP();

  console.log("here at getTrackId with ", songs, " and accessToken ", accessToken)

   const toolresult =  await client.callTool({
    name: "get_track_id",
    arguments: {
      songs,
      accessToken,
    },
  });

  console.log("result", toolresult)
  return toolresult;
}