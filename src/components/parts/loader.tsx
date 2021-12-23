import React from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

const PageLoader: React.FC<{}> = () => {
  return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '80vh' }}
      >
        <Grid item xs={3}>
          <CircularProgress />
        </Grid>
      </Grid>
  );
};

export default PageLoader;
