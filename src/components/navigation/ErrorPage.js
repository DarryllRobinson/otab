import { Link as RouterLink, useRouteError } from 'react-router-dom';
import { Box, Link, Typography, Button } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: 4,
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800], // Not working, theme is unavailable
        color: 'white',
      }}
    >
      <Typography variant="h2" gutterBottom>
        Oops!
      </Typography>
      <Typography variant="h5" gutterBottom>
        Sorry, an unexpected error has occurred.
      </Typography>
      <Typography variant="body1" sx={{ fontStyle: 'italic', marginBottom: 4 }}>
        {error.statusText || error.message}
      </Typography>
      <Button
        component={RouterLink}
        to="/"
        variant="contained"
        color="primary"
        sx={{
          px: 4,
          py: 2,
          fontSize: '1.2rem',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            backgroundColor: '#ff5722',
            transform: 'scale(1.05)',
            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)',
          },
        }}
      >
        Take me home
      </Button>
    </Box>
  );
}
