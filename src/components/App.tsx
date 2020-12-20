import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearePeopleCardsAction, storePeopleCardsAction } from '../store/peopleCards/actions';
import { clearStarshipCardsAction, getStarshipAction } from '../store/starships/actions';
import { switchGameType } from '../store/game/actions';

import { RootState } from '../store/state';
import { GameType } from '../store/models/GameType';

import PeopleCard from './PeopleCard';
import StarshipCard from './StarshipCard';
import { Button, Container, Grid, Typography } from '@material-ui/core';

import playerLeftAvatar from '../assets/images/playerOneAvatar.png';
import playerRightAvatar from '../assets/images/playerTwoAvatar.png';
import CasinoIcon from '@material-ui/icons/Casino';

function App() {
  const dispatch = useDispatch();

  const { leftCard: leftPeopleCard, rightCard: rightPeopleCard, error } = useSelector((state: RootState) => state.peopleCards)
  const { leftCard: leftStarshipCard, rightCard: rightStarshipCard, status: starshipStatus } = useSelector((state: RootState) => state.starship)
  const { status: peopleStatus } = useSelector((state: RootState) => state.people)
  const { leftPlayer, rightPlayer, isDraw, winnerId, gameType } = useSelector((state: RootState) => state.game)

  const dispatchGetPeople = () => dispatch(storePeopleCardsAction());
  const dispatchGetStarship = () => dispatch(getStarshipAction());
  const dispatchClearPeopleCards = () => dispatch(clearePeopleCardsAction());
  const dispatchClearStarshipCards = () => dispatch(clearStarshipCardsAction());
  const dispatchSwitchGameType = (type: GameType) => dispatch(switchGameType(type));

  const handleDispatchGameType = () => {
    if (gameType === GameType.people) {
      return dispatchGetPeople()
    }
    return dispatchGetStarship()
  }

  const handleSwitchGameType = () => {
    if (gameType === GameType.people) {
      dispatchSwitchGameType(GameType.starships)
      return dispatchClearStarshipCards()
    }
    dispatchSwitchGameType(GameType.people)
    return dispatchClearPeopleCards()
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

  const renderPeopleCards = () => {
    return gameType === GameType.people ? (
      <>
        <Grid item xs={3}>
          <PeopleCard
            player={leftPlayer}
            avatar={playerLeftAvatar}
            isWinner={leftPlayer.id === winnerId}
            status={peopleStatus}
            people={leftPeopleCard}
          />
        </Grid>

        <Grid item xs={3}>
          <PeopleCard
            player={rightPlayer}
            avatar={playerRightAvatar}
            isWinner={rightPlayer.id === winnerId}
            status={peopleStatus}
            people={rightPeopleCard}
          />
        </Grid>
      </>
    ) : null
  }

  const renderStarshipCards = () => {
    return gameType === GameType.starships ? (
      <>
        <Grid item xs={3}>
          <StarshipCard
            player={leftPlayer}
            avatar={playerLeftAvatar}
            isWinner={leftPlayer.id === winnerId}
            status={starshipStatus}
            starship={leftStarshipCard}
          />
        </Grid>

        <Grid item xs={3}>
          <StarshipCard
            player={rightPlayer}
            avatar={playerRightAvatar}
            isWinner={rightPlayer.id === winnerId}
            status={starshipStatus}
            starship={rightStarshipCard}
          />
        </Grid>
      </>
    ) : null
  }

  return (
    <Container>
      <Grid container justify="center" spacing={3}>

        <Grid item>
          <Typography align="center" variant="h3" component="h1">Gwizdek</Typography>
          {renderSwitchGameTypeButton()}
        </Grid>

        <Grid container justify="center" spacing={3}>
          {renderPeopleCards()}
          {renderStarshipCards()}
        </Grid>

        <Grid item xs>
          <Grid container direction="column" alignItems="center">
            <Button
              variant={'outlined'}
              size={'large'}
              onClick={handleDispatchGameType}
              endIcon={<CasinoIcon/>}
            >ROLL</Button>
            
            <Grid item>
              {isDraw ? <Typography variant="h4">DRAW</Typography> : null}
            </Grid>
            
            {error ? <Typography variant="subtitle1">{error}</Typography> : null}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
