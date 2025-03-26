import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CompetitionDetails(props) {
  const { id, name, numTiles } = props;

  return (
    <Box
      sx={{
        padding: 4,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[100]
            : theme.palette.grey[700],
        borderRadius: 2,
        boxShadow: 3,
        textAlign: 'center',
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
