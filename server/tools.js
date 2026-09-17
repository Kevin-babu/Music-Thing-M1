export const generatePlaylistTool = {
  type: "function",
  function: {
    name: "generate_playlist",
    description:
      "Call when the user asks for songs, a playlist, or music recommendations. " +
      "Do not call for questions unrelated to music.",
    parameters: {
      type: "object",
      properties: {
        request: { type: "string", description: "Self-contained restatement of the user's music request."
         },
      },
      required: ["request"],
    },
  },
};

export const setCurrentTrack = {
  type: "function",
  function: {
    name: "set_current_track",
    description:
      "Call when the user asks to play a song, a playlist or play generated music recommendations. " +
      "Do not call for questions unrelated to music.",
    parameters: {
      type: "object",
      properties: {
        query: { type: "string", description: "Track name and optionally artist, e.g. 'Blinding Lights The Weeknd" },
      },
      required: ["query"],
    },
  },
};


export const setPlayback = {
  type: "function",
  function: {
    name: "set_playback",
    description: "Pause or resume the currently loaded track.",
    input_schema: {
      type: "object",
      properties: {
        play: { type: "boolean", description: "true to play, false to pause" }
      },
      required: ["play"]
    }
  }
};