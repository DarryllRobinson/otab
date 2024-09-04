import { Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function CompetitionDetails(props) {
  const { id, name, numTiles } = props;

  return (
    <Box>
      <Box>CompetitionDetails name: {name}</Box>
      <Button
        key={id}
        component={RouterLink}
        to="/play"
        state={{ compId: id, create: true, numTiles }}
      >
        Enter the competition!
      </Button>
    </Box>
  );
}
