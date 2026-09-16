// prompts/playlistGeneration.js
export function playlistGenerationPrompt(prompt) {
    
  return `Create 10 Spotify songs for: ${prompt}.

Output ONLY plain text, no markdown formatting (no **, no _, no #).
Use a plain hyphen "-" between song and artist, not an em dash or en dash.

Format exactly like this, with no extra commentary:
Here is a playlist for you
1. Song Title - Artist Name
2. Song Title - Artist Name
...
10. Song Title - Artist Name`;
}


// If you learn anything about the user's taste (a genre/artist they like or dislike, a mood pattern), call update_taste_profile with that information before finishing.