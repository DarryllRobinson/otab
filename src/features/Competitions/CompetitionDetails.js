import { Box, Button, Typography } from "@mui/material";
import { Link as RouterLink, useLoaderData } from "react-router";
import { competitionService } from "./competition.service";

export async function competitionDetailsLoader({ params }) {
  const { id } = params;
  const competition = await competitionService.getById(id);
  console.log("competitionDetailsLoader competition:", competition);
  return { competition };
}

export default function CompetitionDetails(props) {
  console.log("CompetitionDetails props:", props);
  const { competition } = useLoaderData();
  console.log("CompetitionDetails competition:", competition);
  const { id, name, numTiles } = props;

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
      <Button
        key={id}
        component={RouterLink}
        to="/play"
        state={{ compId: id, create: true, numTiles }}
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Enter the Competition!
      </Button>
    </Box>
  );
}
