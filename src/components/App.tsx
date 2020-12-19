import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { storePeopleCardsAction } from '../store/peopleCards/actions';

function App() {
  const dispatch = useDispatch();

  const dispatchGetPeople = () => dispatch(storePeopleCardsAction());

  return (
    <Container>
      <Grid container direction="column" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h3" component="h1">Gwizdek</Typography>
        </Grid>
      </Grid>
      <Button onClick={dispatchGetPeople}>FETCH</Button>
    </Container>
  );
}

export default App;
