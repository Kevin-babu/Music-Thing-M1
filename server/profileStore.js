// profileStore.js
import fs from "fs/promises";
import path from "path";

const STORE_PATH = path.join(process.cwd(), "data", "profiles.json");

async function readAll() {
  try {
    const raw = await fs.readFile(STORE_PATH, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeAll(data) {
  await fs.mkdir(path.dirname(STORE_PATH), { recursive: true });
  await fs.writeFile(STORE_PATH, JSON.stringify(data, null, 2));
}

export async function getProfile(userId) {
  const all = await readAll();
  return (
    all[userId] || {
      favoriteGenres: [],
      favoriteArtists: [],
      dislikedArtists: [],
      dislikedGenres: [],
      moodNotes: [],
      recentRequests: [],
    }
  );
}

export async function saveProfile(userId, profile) {
  const all = await readAll();
  all[userId] = profile;
  await writeAll(all);
}