import Groq from "groq-sdk";
import dotenv from "dotenv";
import { generatePlaylistTool } from "./tools.js";
import { playlistGenerationPrompt } from "./prompts/playlistGenerationPrompt.js";
import { getTrackId } from "./mcp_client.js";
dotenv.config();


// console.log("Groq import:", Groq);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// console.log("groq instance:", groq);
// console.log("groq.chat:", groq.chat);

export async function getGroqChatCompletion(messages, accessToken) {
    console.log("getGroqChatCompletion called with messages:", messages, accessToken);

    const chatCompletion = await groq.chat.completions.create({
    messages,
    model: "openai/gpt-oss-20b",
    tools: [generatePlaylistTool],
    tool_choice: "auto",
    })
    // console.log("from groq.jsCompletion received:", chatCompletion.choices[0]?.message?.content || "");
    const routeMsg = chatCompletion.choices[0].message;
    const call = routeMsg.tool_calls?.find((c) => c.function.name === "generate_playlist");

    if (!call) {
    // clarifying question or off-topic decline, straight from the model
    console.log("No tool call", chatCompletion)
    return {completion: chatCompletion, tracks: null}
    }

    console.log("generatePlaylistTool call", call)

    const { request } = JSON.parse(call.function.arguments);

    const genMessages = [{ role: "user", content: playlistGenerationPrompt(request) }];
    
    let genRes = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        messages: genMessages,
        // tool_choice: "auto",
    });

    console.log(genRes)

    const songs = genRes.choices[0]?.message?.content
      .split("\n")
      .filter(line => /^\d+\./.test(line)) // Keep only numbered lines
      .map(line => {
        const [, song] = line.match(/^\d+\.\s*(.*)$/);
        const [name, artist] = song.split(/\s*-\s*/);

        return {
          name: name.trim(),
          artist: artist.trim()
        };
    });

    console.log("after update", songs);

    const result = await getTrackId(songs, accessToken);
        
    console.log("Tool final result ", result)

    // try {
        if (result.content[0].text == "Resolved tracks")
            {console.log("returning.... ", genRes, result)
            return {completion: genRes, tracks :result}}
        else{
            return
        }
        

        
    // }
    // catch (err){
    //     res.status(err.response?.status || 500).json({
    //         error: err.response?.data || "Failed to fetch playlists",
    //     });
    // }

    
}

export async function getGroqSummarizeMessages(messages) {

    const conversationText = messages
    .map((m) => `${m.role}: ${m.content}`)
    .join("\n");

    console.log("getGroqSummarizeMessages called with messages:", conversationText);

    const summarizeCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content:
          `Summarize the following conversation between "the user" and "the assistant".
            Rules:
            - Preserve any concrete facts stated by the user VERBATIM — names, numbers, preferences, decisions. Do not paraphrase these away.
            - Refer to the participants only as "the user" and "the assistant" — never invent or reuse a persona name for the user.
            - If the user stated their name, explicitly write: "The user's name is X."
            - Keep it as a short factual list or paragraph, not a narrative story.`,
    },
      { role: "user", content: conversationText },
    ],
    model: "openai/gpt-oss-20b",
    })
    // console.log("from groq.jsSummary received:", summarizeCompletion.choices[0]?.message?.content || "");
  
    return summarizeCompletion;
}