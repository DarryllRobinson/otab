import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Grid,
  Typography,
  useTheme,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router";

import Board from "../Boards/Board";
import BoardCreate from "../Boards/BoardCreate";
import { tileService } from "../Tiles/tile.service";

export default function Play() {
  const { state } = useLocation();
  const theme = useTheme();
  const { boardId, compId, create, numTiles } = state || {};
  const [tiles, setTiles] = useState([]);
  const [status, setStatus] = useState("idle");

  const fetchTiles = useCallback(async (boardId) => {
    setStatus("fetching");
    const records = await tileService.getTiles(boardId);
    setStatus("succeeded");
    setTiles(records);
  }, []);

  useEffect(() => {
    if (!create && boardId && status === "idle") {
      fetchTiles(boardId);
    }
  }, [boardId, create, fetchTiles, status]);

  if (status === "fetching") {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress color="inherit" />
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
        Heading can go here
      </Typography>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          {create ? (
            <BoardCreate compId={compId} numTiles={numTiles} />
          ) : (
            <Board boardId={boardId} tiles={tiles} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
