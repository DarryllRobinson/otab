import { Box, Button, Grid, Typography } from "@mui/material";
import { Link as RouterLink, useLoaderData } from "react-router";
import { competitionService } from "./competition.service";

export async function competitionDetailsLoader({ params }) {
  const { id } = params;
  const competition = await competitionService.getById(id);
  return { competition };
}

export default function CompetitionDetails() {
  const { competition } = useLoaderData();
  const { id, name, numTiles, numArtists } = competition;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.grey[100]
            : theme.palette.grey[700],
        borderRadius: 2,
        boxShadow: 3,
        textAlign: "center",
      }}
    >
      <Typography variant="h6" gutterBottom>
        Competition: {name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Number of Tiles: {numTiles}
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: 2, maxWidth: 600, marginX: "auto" }}
      >
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            component={RouterLink}
            to="/play"
            state={{
              compId: id,
              numTiles,
              numArtists,
            }}
          >
            Enter the Competition
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            component={RouterLink}
            to="/competitions"
          >
            Back to the Competitions
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ mt: 2 }}>Competition details will come here</Box>
        </Grid>
      </Grid>
    </Box>
  );
}
