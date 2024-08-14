import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Grid,
  useTheme,
} from '@mui/material';

import { boardService } from './board.service';
import Tile from '../Tiles/Tile';
import { tileService } from '../Tiles/tile.service';

// Check if new board must be created
// If not, retrieve board and tiles from db
// If yes, create new board with stipulated number of tiles
// Retrieve song title and artist from radio db/api

// Mocked data
const numTiles = 25;
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
  console.log('Board props: ', props);
  const { boardId } = props;
  const [chosenTheme, setChosenTheme] = useState('Babyblue');

  boardService.getById(boardId).then((board) => {
    console.log('Retrieved board: ', board);
  });

  // Setting the theme for the board
  const theme = useTheme();
  const { themes } = theme.palette;
  const boardTheme = themes.find((x) => x.theming === chosenTheme);
  const {
    boardBgColour,
    boardBorderColour,
    tileBgColour,
    tileBgColourHover,
    tileBorderColour,
    tileTextColour,
    tileBorderRadius,
    tileSpacing,
  } = boardTheme;

  // Display part of the theme buttons
  const renderThemeButtons = themes.map((theme, id) => {
    // console.log('theme: ', theme);
    const { theming } = theme;

    return (
      <Button
        key={id}
        onClick={() => {
          setChosenTheme(theming);
        }}
      >
        {theming}
      </Button>
    );
  });

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

            // Save tile to database
            tileService.create({ title, artists, boardId });

            tiles.push({
              title,
              actualArtist: artist,
              artists,
            });
            // console.log('title, artists, boardId: ', title, artists, boardId);
          }
        }
        console.log('tiles: ', tiles);
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

  const renderTiles = songs.map((song, id) => {
    // Working out the colours
    const picker = id % tileBgColour.length;
    //console.log(song);
    const { title, actualArtist, artists } = song;
    return (
      <Grid className="tile grid" key={id} item xs={12 / 5}>
        <Tile
          key={id}
          id={id}
          title={title}
          actualArtist={actualArtist}
          artists={artists}
          setBox={setBox}
          tileBgColour={tileBgColour[picker]}
          tileBgColourHover={tileBgColourHover[picker]}
          tileBorderColour={tileBorderColour[picker]}
          tileTextColour={tileTextColour[picker]}
          tileBorderRadius={tileBorderRadius}
        />
      </Grid>
    );
  });

  return (
    <Container>
      <ButtonGroup variant="outlined" aria-label="Theming button group">
        {renderThemeButtons}
      </ButtonGroup>
      <Box
        className="board"
        aria-label="board"
        sx={{
          backgroundColor: boardBgColour,
          borderColor: boardBorderColour,
          // borderRadius: 5,
          my: 2,
          p: 2,
        }}
      >
        <Grid
          className="board grid"
          container
          spacing={tileSpacing}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          {/*console.log(theme.palette)*/}
          {renderTiles}
        </Grid>
      </Box>
    </Container>
  );
}
