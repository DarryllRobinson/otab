import React, { useState, useEffect, useRef } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Board from "../Boards/Board";
import LoadBoard from "./LoadBoard";
import CreateBoard from "./CreateBoard";
import { boardService } from "../Boards/board.service"; // Import boardService
import { userService } from "features/Users/user.service";
import { useLoaderData, useLocation } from "react-router";

export async function playLoader() {
  const user = await userService.refreshToken();
  const boards = await boardService.getAllByUserId({ userId: user.id });
  return { boards };
}

export default function Play() {
  let { state } = useLocation();
  console.log("state: ", state);
  const { boards } = useLoaderData();
  const theme = useTheme();
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const hasCreatedBoard = useRef(false); // Track if CreateBoard has already been called

  useEffect(() => {
    // Check if user already has a board for the competition compId from state
    const existingBoard = boards?.find(
      (board) => board?.competitionId === state?.compId
    );
    console.log("existingBoard: ", existingBoard);

    // If no board exists, create a new one
    if (!existingBoard && !hasCreatedBoard.current) {
      console.log("Creating a new board");
      async function makeBoard() {
        const createdBoard = await CreateBoard(state);
        console.log("createdBoard: ", createdBoard);
        setTiles(createdBoard.tiles);
        setLoading(false);
      }

      makeBoard();
    } else if (existingBoard) {
      console.log("Loading existing board");
      async function loadBoard() {
        const loadedTiles = await LoadBoard(existingBoard.id); // LoadBoard returns an array
        console.log("loadedTiles: ", loadedTiles);
        setTiles(loadedTiles); // Directly set the tiles array
        setLoading(false);
      }

      loadBoard();
    }
  }, [state, boards]);

  if (loading) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Loading...</Typography>
      </Box>
    );
  }

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
        Header can go here
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Board boardId={state?.boardId} tiles={tiles} />
        </Grid>
      </Grid>
    </Box>
  );
}
