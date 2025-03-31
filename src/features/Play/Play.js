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
  const { boards } = useLoaderData();
  const theme = useTheme();
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const hasCreatedBoard = useRef(false); // Track if CreateBoard has already been called

  const handleBoard = useCallback(async () => {
    try {
      const existingBoard = boards?.find(
        (board) => board?.competitionId === state?.compId
      );

      if (!existingBoard && !hasCreatedBoard.current) {
        const createdBoard = await CreateBoard(state);
        setTiles(createdBoard.tiles);
      } else if (existingBoard) {
        const loadedTiles = await LoadBoard(existingBoard.id);
        setTiles(loadedTiles);
      }
    } catch (error) {
      console.error("Error handling board:", error);
    } finally {
      setLoading(false);
    }
  }, [boards, state]);

  useEffect(() => {
    handleBoard();
  }, [handleBoard]);

  if (loading) {
    return <LoadingState />;
  }

  if (!boards || boards.length === 0) {
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
