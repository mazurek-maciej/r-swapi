import React from 'react';
import { Button, Container, Grid, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { storePeopleCardsAction } from '../store/peopleCards/actions';

import { RootState } from '../store/state';

import PlayerCard from './PlayerCard';

import playerLeftAvatar from '../assets/images/playerOneAvatar.png';
import playerRightAvatar from '../assets/images/playerTwoAvatar.png';
import CasinoIcon from '@material-ui/icons/Casino';
import { getStarshipAction } from '../store/starships/actions';
import { GameType } from '../store/models/GameType';
import { switchGameType } from '../store/game/actions';

function App() {
  const dispatch = useDispatch();

  const { leftCard, rightCard, error } = useSelector((state: RootState) => state.peopleCards)
  const { leftPlayer, rightPlayer, isDraw, winnerId, gameType } = useSelector((state: RootState) => state.game)

  const dispatchGetPeople = () => dispatch(storePeopleCardsAction());
  const dispatchGetStarship = () => dispatch(getStarshipAction());
  const dispatchSwitchGameType = (type: GameType) => dispatch(switchGameType(type));

  const handleDispatchGameType = () => {
    if (gameType === GameType.people) {
      return dispatchGetPeople()
    }
    return dispatchGetStarship()
  }

  const handleSwitchGameType = () => {
    if (gameType === GameType.people) {
      return dispatchSwitchGameType(GameType.starships)
    }
    return dispatchSwitchGameType(GameType.people)
  }

  const renderSwitchGameTypeButton = () => {
    return gameType === GameType.people ? (
      <Button
        variant={'outlined'}
        onClick={handleSwitchGameType}
      >
        Change cards to starships
      </Button>
    ) : (
      <Button
        variant={'outlined'}
        onClick={handleSwitchGameType}
      >
        Change cards to people
      </Button>
    )
  }

  return (
    <Container>
      <Grid container justify="center" spacing={3}>

        <Grid item>
          <Typography align="center" variant="h3" component="h1">Gwizdek</Typography>
          {renderSwitchGameTypeButton()}
        </Grid>

        <Grid container justify="center" spacing={3}>
          <Grid item xs={3}>
            <PlayerCard
              player={leftPlayer}
              avatar={playerLeftAvatar}
              isWinner={leftPlayer.id === winnerId}
              gameType={gameType}
              people={leftCard} />
          </Grid>

          <Grid item>
            {isDraw ? <Typography variant="h4">DRAW</Typography> : null}
          </Grid>

          <Grid item xs={3}>
            <PlayerCard
              player={rightPlayer}
              avatar={playerRightAvatar}
              isWinner={rightPlayer.id === winnerId}
              gameType={gameType}
              people={rightCard} />
          </Grid>

        </Grid>

        <Grid item xs>
          <Grid container direction="column" alignItems="center">
            <Button
              variant={'outlined'}
              size={'large'}
              onClick={handleDispatchGameType}
              endIcon={<CasinoIcon/>}
            >ROLL</Button>
            {error ? <Typography variant="subtitle1">{error}</Typography> : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
