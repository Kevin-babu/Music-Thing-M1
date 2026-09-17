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
        request: { type: "string", description: "Self-contained restatement of the user's music request." },
      },
      required: ["request"],
    },
  },
};

