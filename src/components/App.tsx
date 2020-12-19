import React from 'react';
import { Container, Grid, Typography } from '@material-ui/core';

function App() {
  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12} justify="center">
          <Typography variant="h3" component="h1">Gwizdek</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
