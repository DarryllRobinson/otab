import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, useTheme } from '@mui/material';

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
    title: 'First song with a very long title',
    artist: 'First Actual Artist',
    fake: false,
  },
  {
    id: 1,
    title: 'Second song with a very long title',
    artist: 'Second Actual Artist',
    fake: false,
  },
  {
    id: 2,
    title: 'Third song with a very long title',
    artist: 'Third Actual Artist',
    fake: false,
  },
  {
    id: 3,
    title: 'Fourth song with a very long title',
    artist: 'Fourth Actual Artist',
    fake: false,
  },
  {
    id: 4,
    title: 'Fifth song',
    artist: 'Fifth Actual Artist',
    fake: false,
  },
  {
    id: 5,
    title: 'Sixth song',
    artist: 'Sixth Actual Artist',
    fake: false,
  },
  {
    id: 6,
    title: '7th song',
    artist: '7th Actual Artist',
    fake: false,
  },
  {
    id: 7,
    title: '8th song',
    artist: '8th Actual Artist',
    fake: false,
  },
  {
    id: 8,
    title: '9th song',
    artist: '9th Actual Artist',
    fake: false,
  },
  {
    id: 9,
    title: '10th song',
    artist: '10th Actual Artist',
    fake: false,
  },
  {
    id: 10,
    title: '11th song',
    artist: '11th Actual Artist',
    fake: false,
  },
  {
    id: 11,
    title: '12th song',
    artist: '12th Actual Artist',
    fake: false,
  },
  {
    id: 12,
    title: '13th song',
    artist: '13th Actual Artist',
    fake: false,
  },
  {
    id: 13,
    title: '14th song',
    artist: '14th Actual Artist',
    fake: false,
  },
  {
    id: 14,
    title: '15th song',
    artist: '15th Actual Artist',
    fake: false,
  },
  {
    id: 15,
    title: '16th song',
    artist: '16th Actual Artist',
    fake: false,
  },
  {
    id: 16,
    title: '17th song',
    artist: '17th Actual Artist',
    fake: false,
  },
  {
    id: 17,
    title: '18th song',
    artist: '18th Actual Artist',
    fake: false,
  },
  {
    id: 18,
    title: '19th song',
    artist: '19th Actual Artist',
    fake: false,
  },
  {
    id: 19,
    title: '20th song',
    artist: '20th Actual Artist',
    fake: false,
  },
  {
    id: 20,
    title: '21st song',
    artist: '21st Actual Artist',
    fake: false,
  },
  {
    id: 21,
    title: '22nd song',
    artist: '22nd Actual Artist',
    fake: false,
  },
  {
    id: 22,
    title: '23rd song',
    artist: '23rd Actual Artist',
    fake: false,
  },
  {
    id: 23,
    title: '24th song',
    artist: '24th Actual Artist',
    fake: false,
  },
  {
    id: 24,
    title: '25th song',
    artist: '25th Actual Artist',
    fake: false,
  },
];

const fakeArtistsDb = [
  {
    id: 0,
    artist: 'Fake Artist 0',
    fake: true,
  },
  {
    id: 1,
    artist: 'Fake Artist 1',
    fake: true,
  },
  {
    id: 2,
    artist: 'Fake Artist 2',
    fake: true,
  },
  {
    id: 3,
    artist: 'Fake Artist 3',
    fake: true,
  },
  {
    id: 4,
    artist: 'Fake Artist 4',
    fake: true,
  },
  {
    id: 5,
    artist: 'Fake Artist 5',
    fake: true,
  },
  {
    id: 6,
    artist: 'Fake Artist 6',
    fake: true,
  },
  {
    id: 7,
    artist: 'Fake Artist 7',
    fake: true,
  },
  {
    id: 8,
    artist: 'Fake Artist 8',
    fake: true,
  },
  {
    id: 9,
    artist: 'Fake Artist 9',
    fake: true,
  },
  {
    id: 10,
    artist: 'Fake Artist 10',
    fake: true,
  },
  {
    id: 11,
    artist: 'Fake Artist 11',
    fake: true,
  },
  {
    id: 12,
    artist: 'Fake Artist 12',
    fake: true,
  },
  {
    id: 13,
    artist: 'Fake Artist 13',
    fake: true,
  },
  {
    id: 14,
    artist: 'Fake Artist 14',
    fake: true,
  },
  {
    id: 15,
    artist: 'Fake Artist 15',
    fake: true,
  },
  {
    id: 16,
    artist: 'Fake Artist 16',
    fake: true,
  },
  {
    id: 17,
    artist: 'Fake Artist 17',
    fake: true,
  },
  {
    id: 18,
    artist: 'Fake Artist 18',
    fake: true,
  },
  {
    id: 19,
    artist: 'Fake Artist 19',
    fake: true,
  },
];

export default function Board(props) {
  const theme = useTheme();
  const { boardBorder, boardBackgroundColor } = theme.palette;
  const { setBox } = props;
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
            // Now check to make sure the artist isn't the same as the actual artist - again, small chance but definitely non-zero
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
      <Grid key={id} item>
        <Tile
          key={id}
          title={title}
          actualArtist={actualArtist}
          artists={artists}
          setBox={setBox}
        />
      </Grid>
    );
  });

  return (
    <Container>
      <Box
        className="thisistheone"
        sx={{
          backgroundColor: boardBackgroundColor,
          border: boardBorder,
          borderRadius: 5,
          my: 8,
          p: 3,
        }}
      >
        <Grid
          container
          columns={{ xs: 4, sm: 8, md: 12 }}
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          alignItems="center"
        >
          {/*console.log(theme.palette)*/}
          {renderSongs}
        </Grid>
      </Box>
    </Container>
  );
}
