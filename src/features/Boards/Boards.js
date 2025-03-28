import React from "react";
import { Link as RouterLink, useLoaderData } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import { boardService } from "./board.service";
import { userService } from "features/Users/user.service";

export async function boardsLoader() {
  const user = await userService.refreshToken();
  const boards = await boardService.getAllByUserId({ userId: user.id });
  return { boards };
}

export default function Boards() {
  const { boards } = useLoaderData();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Choose an existing board to capture songs
      </Typography>
      <Box
        sx={{
          marginTop: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        {boards?.map((board) => (
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
                create: false,
              }}
            >
              Competition ID: {board?.competitionId}
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
