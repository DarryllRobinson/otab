import React, { useState } from "react";
import { Link as RouterLink, useLoaderData } from "react-router";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  useTheme,
  Skeleton,
} from "@mui/material";
import { competitionService } from "./competition.service";

export async function competitionsLoader() {
  const competitions = await competitionService.getAll();
  return { competitions };
}

export default function CompetitionList() {
  const { competitions } = useLoaderData();
  const theme = useTheme();

  if (!competitions) {
    return (
      <Box sx={{ marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Loading competitions...
        </Typography>
        {/* Add skeleton loader */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Skeleton variant="rectangular" width={300} height={200} />
        </Box>
      </Box>
    );
  }

  const renderCompetitions = () => {
    return competitions?.map((competition) => {
      const { id, name, numTiles } = competition;

      return (
        <Grid item xs={12} sm={6} md={4} key={id}>
          <Card
            sx={{
              backgroundColor:
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[700],
              boxShadow: 3,
              "&:hover": { boxShadow: 6 },
            }}
          >
            <CardActionArea
              component={RouterLink} // Use RouterLink directly
              to={`/competitions/${id}`} // Navigate to the competition details page
              state={{ id, name, numTiles }}
              sx={{ padding: 2 }}
            >
              <CardContent>
                <Typography variant="h6" align="center">
                  {name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      );
    });
  };

  return (
    <Box
      sx={{
        marginTop: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Choose an exciting competition to join!
      </Typography>
      <Grid container spacing={4} justifyContent="center">
        {renderCompetitions()}
      </Grid>
    </Box>
  );
}
