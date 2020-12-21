import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearePeopleCardsAction } from '../store/peopleCards/actions';
import { clearStarshipCardsAction } from '../store/starships/actions';
import { switchGameType } from '../store/game/actions';

import { RootState } from '../store/state';
import { GameType } from '../store/models/GameType';

import { Button, Container, Grid, Typography } from '@material-ui/core';

import SelectGameType from './SelectGameType';
import GameContainer from './GameContainer';

function App() {
  const dispatch = useDispatch();

  const { gameType, userSelectedGameType } = useSelector((state: RootState) => state.game)

  const dispatchSwitchGameType = (type: GameType) => dispatch(switchGameType(type));
  const dispatchClearPeopleCards = () => dispatch(clearePeopleCardsAction());
  const dispatchClearStarshipCards = () => dispatch(clearStarshipCardsAction());

  const handleSwitchGameType = () => {
    if (gameType === GameType.people) {
      dispatchSwitchGameType(GameType.starships)
      return dispatchClearStarshipCards()
    }
    dispatchSwitchGameType(GameType.people)
    return dispatchClearPeopleCards()
  }

  const renderChooseCardsType = () => {
    const btnText = gameType === GameType.people ? 'Change cards to starships' : 'Change cards to people'

    return userSelectedGameType ? 
      <Button
        variant={'outlined'}
        onClick={handleSwitchGameType}
        size={'large'}
      >
        {btnText}
      </Button> :
      <Typography variant="h5" align="center">Choose cards type</Typography>
  }

  return (
    <Container>
      <Grid container justify="center" spacing={3}>
        <Grid item>
          <Typography align="center" variant="h3" component="h1">Gwizdek</Typography>
          {renderChooseCardsType()}
        </Grid>

        {userSelectedGameType ?
        (
          <GameContainer />
        ) :
        (
          <SelectGameType handleChooseGame={dispatchSwitchGameType} />
        )}
      </Grid>
    </Container>
  );
}

export default App;
