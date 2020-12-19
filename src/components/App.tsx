import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { storePeopleCardsAction } from '../store/peopleCards/actions';

import { RootState } from '../store/state';

import PlayerCard from './PlayerCard';

import playerLeftAvatar from '../assets/images/playerOneAvatar.png';
import playerRightAvatar from '../assets/images/playerTwoAvatar.png';
import CasinoIcon from '@material-ui/icons/Casino';

function App() {
  const dispatch = useDispatch();

  const { leftCard, rightCard } = useSelector((state: RootState) => state.peopleCards)

  const dispatchGetPeople = () => dispatch(storePeopleCardsAction());

  return (
    <Container>
      <Grid container justify="center" spacing={3}>

        <Grid item>
          <Typography align="center" variant="h3" component="h1">Gwizdek</Typography>
        </Grid>

        <Grid container justify="center" spacing={3}>
          <Grid item xs={3}>
            <PlayerCard name={'Dathomirian'} avatar={playerLeftAvatar} people={leftCard} />
          </Grid>

          <Grid item xs={3}>
            <PlayerCard name={'Wookie'} avatar={playerRightAvatar} people={rightCard} />
          </Grid>
        </Grid>
        
        <Grid item>
          <Button
            variant={'outlined'}
            size={'large'}
            onClick={dispatchGetPeople}
            endIcon={<CasinoIcon/>}
          >ROLL</Button>
        </Grid>

      </Grid>
    </Container>
  );
}

export default App;
