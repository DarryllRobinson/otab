import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Container,
  Grid,
  useTheme,
} from '@mui/material';
import { boardService } from './board.service';
import { userService } from '../users/user.service';
import { tileService } from '../Tiles/tile.service';
import { songService } from '../Song/song.service';
import Tile from '../Tiles/Tile';

// Mocked data
const numTiles = 25;
const numArtists = 2;

const fakeArtistsDb = [
  //   {
  //     id: 0,
  //     artist: 'Fake Artist 0',
  //     fake: true,
  //   },
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
  {
    id: 20,
    artist: 'Fake Artist 20',
    fake: true,
  },
];

export default function BoardCreate(props) {
  console.log('Board props: ', props);
  const { compId, numTiles } = props;
  const user = userService.userValue;
  //   console.log('user: ', user);
  const [status, setStatus] = useState('idle');
  const [statusSongDb, setStatusSongDb] = useState('idle');
  const [boardId, setBoardId] = useState(null);
  const [songsDb, setSongsDb] = useState([]);
  const [songs, setSongs] = useState([]);
  const [chosenTheme, setChosenTheme] = useState('Babyblue');
  const [tiles, setTiles] = useState(null);

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

  const fetchFakeArtists = (actualArtist) => {
    // console.log('fetchFakeArtists');
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
        console.log('artistId: ', artistId);
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

  const selectRandomSongs = (numTiles) => {
    console.log('selectRandomSongs numTiles: ', numTiles);
    let tiles = [];
    let songIds = [];
    for (let tile = 0; songIds.length < numTiles; tile++) {
      const songId = getRandomId(songsDb.length);
      const found = songIds.includes(songId);

      if (!found) {
        // Fetch numArtists fake artists, making sure they're not the same as the artist provided
        console.log('songsDb: ', songId);
        const { artist } = findArrayElementById(songsDb, songId);
        console.log('actual artist: ', artist);
        //setArtists(fetchFakeArtists(artist));
        let artists = fetchFakeArtists(artist);
        artists.push(artist);
        //console.log('artists: ', artists);
        artists = artists.sort(() => Math.random() - 0.5);
        //console.log('artists shuffled: ', artists);

        // Insert song object, songId into arrays
        songIds.push(songId);
        const { title } = findArrayElementById(songsDb, songId);
        console.log('title: ', title, artist);

        // Save tile to database
        tileService.create({ title, artists, boardId });

        tiles.push({
          title,
          actualArtist: artist,
          artists,
        });
        // console.log('title, artists, boardId: ', title, artists, boardId);
      }
      console.log('Tile counter: ', tile);
    }
    console.log('tiles: ', tiles);
    return tiles;
  };

  const createSongDb = useCallback(async (compId) => {
    // Fetch songs from database
    setStatusSongDb('fetching');
    const songsDb = await songService.getAllByCompId(compId);
    //   console.log('fetched songs', songs);

    setStatusSongDb('succeeded');
    setSongsDb(songsDb);
  }, []);

  const createBoard = useCallback(async (compId, userId) => {
    setStatus('fetching');
    //   console.log('creating board', compId, userId);
    const board = await boardService.create({
      competitionId: compId,
      userId,
    });

    setStatus('succeeded');
    setBoardId(board.id);
  }, []);

  useEffect(() => {
    if (status === 'idle') {
      createBoard(compId, user.id, numTiles);
    }
  }, [compId, createBoard, status, user.id, numTiles]);

  useEffect(() => {
    if (statusSongDb === 'idle') {
      createSongDb(compId);
    }
  }, [statusSongDb, compId, createSongDb]);

  const getRandomId = (max) => {
    return Math.floor(Math.random() * max) + 1;
  };

  const findArrayElementById = (array, id) => {
    return array.find((element) => {
      return element.id === id;
    });
  };

  const renderTiles = () => {
    return songs.map((song, id) => {
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
            // setBox={setBox}
            tileBgColour={tileBgColour[picker]}
            tileBgColourHover={tileBgColourHover[picker]}
            tileBorderColour={tileBorderColour[picker]}
            tileTextColour={tileTextColour[picker]}
            tileBorderRadius={tileBorderRadius}
          />
        </Grid>
      );
    });
  };

  let content;
  if (status === 'fetching') {
    // console.log('status: ', status);
    content = (
      <div>
        <CircularProgress color="inherit" />
      </div>
    );
  } else if (status === 'error') {
    // console.log('status: ', status);
    content = 'Error';
  } else if (statusSongDb === 'succeeded' && songsDb.length > 0) {
    console.log('statusSongDb: ', statusSongDb);
    setSongs(selectRandomSongs(numTiles));
    console.log('done');
    content = renderTiles();
  } else {
    // console.log('status: ', status);
    content = <div>No tiles found</div>;
  }

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
          {content}
        </Grid>
      </Box>
    </Container>
  );
}
