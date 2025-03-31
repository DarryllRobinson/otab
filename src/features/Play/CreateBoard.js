import { tileService } from "../Tiles/tile.service";
import { boardService } from "features/Boards/board.service";
import { userService } from "features/Users/user.service";
import { songsDb, fakeArtistsDb } from "./mockData"; // Import mocked data

export default async function CreateBoard(state) {
  //   console.log("Creating board with state: ", state);
  const { numTiles, numArtists, compId } = state;
  try {
    // Fetch the current user
    const user = await userService.refreshToken();
    // console.log("Going to create a board with: ", compId, user);

    // Create a new board in the database
    const board = await boardService.createBoard({
      competitionId: compId,
      userId: user.id,
    });

    // console.log("Created board with ID: ", board.id);

    // Generate tiles for the board
    const tiles = await generateTiles(
      numTiles,
      songsDb,
      fakeArtistsDb,
      board.id,
      numArtists
    );

    // console.log("Tiles created: ", tiles);
    return { boardId: board.id, tiles };
  } catch (error) {
    console.error("Error creating board: ", error);
    return { boardId: null, tiles: [] };
  }
}

async function generateTiles(
  numTiles,
  songsDb,
  fakeArtistsDb,
  boardId,
  numArtists
) {
  const tiles = [];
  const songIds = new Set();

  while (songIds.size < numTiles) {
    const songId = getRandomId(songsDb.length);
    if (!songIds.has(songId)) {
      songIds.add(songId);

      const { title, artist: actualArtist } = songsDb[songId];
      const fakeArtists = fetchFakeArtists(
        actualArtist,
        fakeArtistsDb,
        numArtists
      );
      const artists = shuffleArray([...fakeArtists, actualArtist]);

      // Save tile to the database and get the unique ID
      const tile = {
        title,
        actualArtist,
        artists,
        boardId,
      };
      //   console.log("Tile to create: ", tile);
      const createdTile = await tileService.create(tile);
      //   console.log("Created tile: ", createdTile);

      // Add the unique ID to the tile object
      tiles.push({
        ...tile,
        id: createdTile.id,
      });
    }
  }

  return tiles;
}

function getRandomId(max) {
  return Math.floor(Math.random() * max);
}

function fetchFakeArtists(actualArtist, fakeArtistsDb, numArtists) {
  const fakeArtists = [];
  const usedIds = new Set();

  while (fakeArtists.length < numArtists) {
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
