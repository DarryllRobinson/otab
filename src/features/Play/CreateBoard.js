import { tileService } from "../Tiles/tile.service";
import { boardService } from "features/Boards/board.service";
import { userService } from "features/Users/user.service";

export default async function CreateBoard(
  compId,
  numTiles,
  songsDb,
  fakeArtistsDb
) {
  try {
    // Fetch the current user
    const user = await userService.refreshToken();

    // Create a new board in the database
    const board = await boardService.createBoard({
      competitionId: compId,
      userId: user.id,
    });

    console.log("Created board with ID: ", board.id);

    // Generate tiles for the board
    const tiles = generateTiles(numTiles, songsDb, fakeArtistsDb, board.id);

    // Save tiles to the database
    for (const tile of tiles) {
      await tileService.create(tile);
    }

    return { boardId: board.id, songs: tiles };
  } catch (error) {
    console.error("Error creating board: ", error);
    return { boardId: null, songs: [] };
  }
}

function generateTiles(numTiles, songsDb, fakeArtistsDb, boardId) {
  const tiles = [];
  const songIds = new Set();

  while (songIds.size < numTiles) {
    const songId = getRandomId(songsDb.length);
    if (!songIds.has(songId)) {
      songIds.add(songId);

      const { title, artist: actualArtist } = songsDb[songId];
      const fakeArtists = fetchFakeArtists(actualArtist, fakeArtistsDb);
      const artists = shuffleArray([...fakeArtists, actualArtist]);

      tiles.push({
        title,
        actualArtist,
        artists,
        boardId,
      });
    }
  }

  return tiles;
}

function getRandomId(max) {
  return Math.floor(Math.random() * max);
}

function fetchFakeArtists(actualArtist, fakeArtistsDb) {
  const fakeArtists = [];
  const usedIds = new Set();

  while (fakeArtists.length < 2) {
    const fakeArtistId = getRandomId(fakeArtistsDb.length);
    if (!usedIds.has(fakeArtistId)) {
      const { artist } = fakeArtistsDb[fakeArtistId];
      if (artist !== actualArtist) {
        fakeArtists.push(artist);
        usedIds.add(fakeArtistId);
      }
    }
  }

  return fakeArtists;
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}
