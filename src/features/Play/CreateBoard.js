import { useState } from "react";
import { tileService } from "../Tiles/tile.service";
import { boardService } from "features/Boards/board.service";
import { userService } from "features/Users/user.service";
import { songsDb, fakeArtistsDb } from "./mockData"; // Import mocked data

// Mocked data
const numArtists = 2;

export default async function CreateBoard(
  compId,
  numTiles,
  songsDb,
  fakeArtistsDb
) {
  const [status, setStatus] = useState("fetching");
  const [boardId, setBoardId] = useState(null);
  const [songs, setSongs] = useState([]);

  const user = await userService.refreshToken();
  const id = await boardService.createBoard({
    competitionId: compId,
    userId: user.id,
  });
  console.log("id: ", id);
  setStatus("succeeded");
  setBoardId(id);
  setSongs(selectRandomSongs(numTiles, songsDb, fakeArtistsDb, boardId));

  return { boardId, songs };

  function selectRandomSongs(numTiles, songsDb, fakeArtistsDb, boardId) {
    let tiles = [];
    let songIds = [];
    for (let tile = 0; songIds.length < numTiles; tile++) {
      const songId = getRandomId(songsDb.length);
      const found = songIds.includes(songId);

      if (!found) {
        const { artist } = findArrayElementById(songsDb, songId);
        let artists = fetchFakeArtists(artist, fakeArtistsDb);
        artists.push(artist);
        artists = artists.sort(() => Math.random() - 0.5);

        songIds.push(songId);
        const { title } = findArrayElementById(songsDb, songId);

        tileService.create({ title, artists, boardId });

        tiles.push({
          title,
          actualArtist: artist,
          artists,
        });
      }
    }
    console.log("tiles: ", tiles);
    return tiles;
  }

  function getRandomId(max) {
    return Math.floor(Math.random() * max);
  }

  function findArrayElementById(array, id) {
    return array.find((element) => element.id === id);
  }

  function fetchFakeArtists(actualArtist, fakeArtistsDb) {
    let artistList = [];
    let artistIds = [];
    for (let artistLoop = 0; artistIds.length < numArtists; artistLoop++) {
      const artistId = getRandomId(fakeArtistsDb.length);
      const found = artistIds.includes(artistId);

      if (!found) {
        const { artist } = findArrayElementById(fakeArtistsDb, artistId);
        if (artist !== actualArtist) {
          artistList.push(artist);
          artistIds.push(artistId);
        }
      }
    }
    return artistList;
  }
}
