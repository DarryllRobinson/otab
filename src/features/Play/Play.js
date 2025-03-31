import React, { useState, useEffect, useRef, useCallback } from "react";
import { Box, Grid, Typography, useTheme } from "@mui/material";
import Board from "../Boards/Board";
import LoadBoard from "./LoadBoard";
import CreateBoard from "./CreateBoard";
import { boardService } from "../Boards/board.service"; // Import boardService
import { userService } from "features/Users/user.service";
import { useLoaderData, useLocation } from "react-router";
import LoadingState from "../common/LoadingState"; // Import reusable component
import EmptyState from "../common/EmptyState"; // Import reusable component

export async function playLoader() {
  const user = await userService.refreshToken();
  const boards = await boardService.getAllByUserId({ userId: user.id });
  return { boards };
}

export default function Play() {
  let { state } = useLocation();
  const { boards: initialBoards } = useLoaderData(); // Rename to initialBoards
  const theme = useTheme();
  const [boards, setBoards] = useState(initialBoards); // Use state for boards
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const hasCreatedBoard = useRef(false); // Track if CreateBoard has already been called

  const handleBoard = useCallback(async () => {
    try {
      // console.log("State passed to /play:", state); // Debugging log for state

      // Check if a board already exists in the current state
      const existingBoard = boards?.find(
        (board) => board?.competitionId === state?.compId
      );

      // console.log("Existing board found:", existingBoard); // Debugging log for existing board

      if (existingBoard) {
        // console.log("Loading tiles for existing board...");
        const loadedTiles = await LoadBoard(existingBoard.id);
        // console.log("Loaded tiles:", loadedTiles); // Debugging log for loaded tiles
        setTiles(loadedTiles);
      } else if (!hasCreatedBoard.current) {
        // console.log("No existing board found. Creating a new board...");
        const createdBoard = await CreateBoard(state);
        // console.log("Created board:", createdBoard); // Debugging log for created board
        setBoards((prevBoards) => [
          ...prevBoards,
          { id: createdBoard.boardId, competitionId: state.compId },
        ]); // Add new board to boards state
        setTiles(createdBoard.tiles);
        hasCreatedBoard.current = true; // Mark as created to prevent duplicate calls
      }
    } catch (error) {
      console.error("Error handling board:", error);
    } finally {
      setLoading(false);
    }
  }, [state, boards]);

  useEffect(() => {
    handleBoard();
  }, [handleBoard]);

  if (loading) {
    return <LoadingState />;
  }

  if (!boards || boards.length === 0) {
    // console.log("No boards available.", boards); // Debugging log for no boards
    return <EmptyState message="No boards available." />;
  }

  return (
    <Box
      sx={{
        display: "flex", // Ensure the container uses flexbox
        flexDirection: "column", // Arrange children in a column
        minHeight: "100vh", // Ensure it takes up the full viewport height
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
      <Grid container justifyContent="center" flexGrow={1}>
        <Grid item xs={12}>
          <Board boardId={state?.boardId} tiles={tiles} />
        </Grid>
      </Grid>
    </Box>
  );
}
