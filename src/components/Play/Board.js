import React, { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';

import Tile from './Tile';

// Check if new board must be created
// If not, retrieve board and tiles from db
// If yes, create new board with stipulated number of tiles
// Retrieve song title and artist from radio db/api

// Mocked data
const numTiles = 20;
const numArtists = 2;

const songsDb = [
  {
    id: 0,
    title: 'First song',
    artist: 'First Actual Artist',
  },
  {
    id: 1,
    title: 'Second song',
    artist: 'Second Actual Artist',
  },
  {
    id: 2,
    title: 'Third song',
    artist: 'Third Actual Artist',
  },
  {
    id: 3,
    title: 'Fourth song',
    artist: 'Fourth Actual Artist',
  },
  {
    id: 4,
    title: 'Fifth song',
    artist: 'Fifth Actual Artist',
  },
  {
    id: 5,
    title: 'Sixth song',
    artist: 'Sixth Actual Artist',
  },
  {
    id: 6,
    title: 'Sixth song',
    artist: 'Sixth Actual Artist',
  },
  {
    id: 7,
    title: '7th song',
    artist: '7th Actual Artist',
  },
  {
    id: 8,
    title: '8th song',
    artist: '8th Actual Artist',
  },
  {
    id: 9,
    title: '9th song',
    artist: '9th Actual Artist',
  },
  {
    id: 10,
    title: '10th song',
    artist: '10th Actual Artist',
  },
  {
    id: 11,
    title: '11th song',
    artist: '11th Actual Artist',
  },
  {
    id: 12,
    title: '12th song',
    artist: '12th Actual Artist',
  },
  {
    id: 13,
    title: '13th song',
    artist: '13th Actual Artist',
  },
  {
    id: 14,
    title: '14th song',
    artist: '14th Actual Artist',
  },
  {
    id: 15,
    title: '15th song',
    artist: '15th Actual Artist',
  },
  {
    id: 16,
    title: '16th song',
    artist: '16th Actual Artist',
  },
  {
    id: 17,
    title: '17th song',
    artist: '17th Actual Artist',
  },
  {
    id: 18,
    title: '18th song',
    artist: '18th Actual Artist',
  },
  {
    id: 19,
    title: '19th song',
    artist: '19th Actual Artist',
  },
  {
    id: 20,
    title: '20th song',
    artist: '20th Actual Artist',
  },
  {
    id: 21,
    title: '21st song',
    artist: '21st Actual Artist',
  },
  {
    id: 22,
    title: '22nd song',
    artist: '22nd Actual Artist',
  },
  {
    id: 23,
    title: '23rd song',
    artist: '23rd Actual Artist',
  },
  {
    id: 24,
    title: '24th song',
    artist: '24th Actual Artist',
  },
];

const fakeArtistsDb = [
  {
    id: 0,
    artist: 'Fake Artist 0',
  },
  {
    id: 1,
    artist: 'Fake Artist 1',
  },
  {
    id: 2,
    artist: 'Fake Artist 2',
  },
  {
    id: 3,
    artist: 'Fake Artist 3',
  },
  {
    id: 4,
    artist: 'Fake Artist 4',
  },
  {
    id: 5,
    artist: 'Fake Artist 5',
  },
  {
    id: 6,
    artist: 'Fake Artist 6',
  },
  {
    id: 7,
    artist: 'Fake Artist 7',
  },
  {
    id: 8,
    artist: 'Fake Artist 8',
  },
  {
    id: 9,
    artist: 'Fake Artist 9',
  },
  {
    id: 10,
    artist: 'Fake Artist 10',
  },
  {
    id: 11,
    artist: 'Fake Artist 11',
  },
  {
    id: 12,
    artist: 'Fake Artist 12',
  },
  {
    id: 13,
    artist: 'Fake Artist 13',
  },
  {
    id: 14,
    artist: 'Fake Artist 14',
  },
  {
    id: 15,
    artist: 'Fake Artist 15',
  },
  {
    id: 16,
    artist: 'Fake Artist 16',
  },
  {
    id: 17,
    artist: 'Fake Artist 17',
  },
  {
    id: 18,
    artist: 'Fake Artist 18',
  },
  {
    id: 19,
    artist: 'Fake Artist 19',
  },
];

export default function Board() {
  // Need to record which songs have been chosen already
  const [songs, setSongs] = useState([]);

  // Check if new board must be created
  // Assume yes for dev purposes
  useEffect(() => {
    const create = true;

    if (create) {
      const createBoard = () => {
        // Call <Tile /> and send title, artists
        // Fetch randon song title and artist per numTiles
        setSongs(selectRandomSongs(numTiles));
      };

      const selectRandomSongs = (numTiles) => {
        let tiles = [];
        let songIds = [];
        for (let tile = 0; songIds.length < numTiles; tile++) {
          const songId = getRandomId(songsDb.length);
          const found = songIds.includes(songId);

          if (!found) {
            // Fetch numArtists fake artists, making sure they're not the same as the artist provided
            const { artist } = findArrayElementById(songsDb, songId);
            //console.log('actual artist: ', artist);
            //setArtists(fetchFakeArtists(artist));
            let artists = fetchFakeArtists(artist);
            artists.push(artist);
            //console.log('artists: ', artists);
            artists = artists.sort(() => Math.random() - 0.5);
            //console.log('artists shuffled: ', artists);

            // Insert song object, songId into arrays
            songIds.push(songId);
            const { title } = findArrayElementById(songsDb, songId);
            //console.log('title: ', title, artist);

            tiles.push({
              title,
              actualArtist: artist,
              artists,
            });
            //console.log('tiles: ', tiles);
          }
        }
        //console.log('tiles: ', tiles);
        return tiles;
      };

      const getRandomId = (max) => {
        return Math.floor(Math.random() * max);
      };

      const findArrayElementById = (array, id) => {
        return array.find((element) => {
          return element.id === id;
        });
      };

      const fetchFakeArtists = (actualArtist) => {
        //console.log('fetchFakeArtists');
        let artistList = [];
        let artistIds = [];
        for (let artistLoop = 0; artistIds.length < numArtists; artistLoop++) {
          const artistId = getRandomId(fakeArtistsDb.length);
          //console.log('artistId: ', artistId);
          //console.log('artistList: ', artistList);

          // Check to make sure the artist hasn't already been chosen for this tile - small chance but definitely non-zero
          const found = artistIds.includes(artistId);
          //console.log('found: ', found);

          if (!found) {
            // Now check to make sure the artist hasn't the same as the actual artist - again, small chance but definitely non-zero
            const { artist } = findArrayElementById(fakeArtistsDb, artistId);
            //console.log('artist: ', artist);
            if (artist !== actualArtist) {
              //console.log('no match');

              // Insert artist object, artistId into arrays
              //artistList.push(findArrayElementById(fakeArtistsDb, artistId));
              artistList.push(artist);
              artistIds.push(artistId);
              //console.log('artistList: ', artistList);
            }
          }
        }
        return artistList;
      };

      const saveBoard = () => {
        console.log('saveBoard');
      };

      createBoard();
      saveBoard();
    } else {
      const retrieveBoard = () => {
        console.log('Retrieve');
      };

      retrieveBoard();
    }
  }, []);

  const renderSongs = songs.map((song, id) => {
    //console.log(song);
    const { title, actualArtist, artists } = song;

    return (
      <Grid key={id} item xs>
        <Tile
          key={id}
          title={title}
          actualArtist={actualArtist}
          artists={artists}
        />
      </Grid>
    );
  });

  return (
    <Container sx={{ backgroundColor: 'red', mt: 5 }}>
      <Box sx={{ border: 'solid yellow 2px', borderRadius: 3, maxWidth: 1000 }}>
        <Grid
          sx={{ borderRadius: 3, boxShadow: 5, p: 2 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          container
          justify="center"
          spacing={{ xs: 2, md: 3 }}
        >
          {renderSongs}
        </Grid>
      </Box>
    </Container>
  );
}
