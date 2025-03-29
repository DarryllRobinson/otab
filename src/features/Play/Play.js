import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import { useLocation } from "react-router";
import Board from "../Boards/Board";
import LoadBoard from "./LoadBoard";
import CreateBoard from "./CreateBoard";
import { songsDb, fakeArtistsDb } from "./mockData"; // Import mocked data

export default function Play() {
  const location = useLocation();
  const theme = useTheme();
  const [tiles, setTiles] = useState([]);
  const [state, setState] = useState(() => {
    // Retrieve state from localStorage if it exists
    const savedState = localStorage.getItem("playState");
    return savedState ? JSON.parse(savedState) : location.state;
  });

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    if (state) {
      localStorage.setItem("playState", JSON.stringify(state));
    }
  }, [state]);

  useEffect(() => {
    if (state) {
      const { boardId, compId, create, numTiles } = state;

      if (create) {
        console.log("Creating board with state: ", state);
        CreateBoard(compId, numTiles, songsDb, fakeArtistsDb).then(
          ({ boardId, songs }) => {
            setTiles(songs);
            setState((prevState) => ({ ...prevState, boardId })); // Update state with new boardId
          }
        );
      } else {
        LoadBoard(boardId).then((loadedTiles) => {
          setTiles(loadedTiles);
        });
      }
    }
  }, [state]);

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: theme.palette.background.default,
        padding: 2,
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ marginBottom: 4 }}
      >
        {state?.create
          ? "Welcome to your new board"
          : "Welcome back to your board"}
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Board boardId={state?.boardId} tiles={tiles} />
        </Grid>
      </Grid>
    </Box>
  );
}
