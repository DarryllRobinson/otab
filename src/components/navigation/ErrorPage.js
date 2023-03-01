import { Link as RouterLink } from 'react-router-dom';
import { Box, Link } from '@mui/material';

export default function ErrorPage() {
  return (
    <Box id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <Link component={RouterLink} to="/">
        Take me home
      </Link>
    </Box>
  );
}
