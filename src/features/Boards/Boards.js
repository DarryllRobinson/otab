import React from "react";
import { Link as RouterLink, useLoaderData } from "react-router";
import { Box, Button, Typography, useTheme } from "@mui/material"; // Import useTheme
import { boardService } from "./board.service";
import { userService } from "features/Users/user.service";

export async function boardsLoader() {
  const user = await userService.refreshToken();
  const boards = await boardService.getAllByUserId({ userId: user.id });
  return { boards };
}

export default function Boards() {
  const { boards } = useLoaderData();
  const theme = useTheme(); // Use the theme hook

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: theme.palette.background.default, // Use default background color
        padding: 4,
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" gutterBottom>
        {boards?.length > 0
          ? "Choose an existing board to capture songs"
          : "You don't have any boards yet. Start by joining a competition!"}
      </Typography>
      {boards?.length > 0 ? (
        <Box
          sx={{
            marginTop: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          {boards.map((board) => (
            <Box key={board?.id} sx={{ width: "100%" }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                component={RouterLink}
                to="/play"
                state={{
                  boardId: board?.id,
                  compId: board?.competitionId,
                }}
              >
                Competition ID: {board?.competitionId}
              </Button>
            </Box>
          ))}
        </Box>
      ) : (
        <Button
          variant="contained"
          color="primary"
          component={RouterLink}
          to="/competitions"
          sx={{ mt: 4 }}
        >
          Join a Competition
        </Button>
      )}
    </Box>
  );
}
