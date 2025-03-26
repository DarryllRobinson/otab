import React from 'react';
import { Box, Grid } from '@mui/material';

const renderBoxes = () => {
  const boxes = [];
  for (let i = 0; i < 25; i++) {
    boxes.push(
      <Grid item sx={{ border: 1 }} xs={1} key={i}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {i + 1}
        </Box>
      </Grid>
    );
  }
  return boxes;
};

export default function Side(props) {
  const { box } = props;

  return (
    <div>
      <Grid
        container
        columns={{ xs: 5 }}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        {box && renderBoxes()}
      </Grid>
    </div>
  );
}
