import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchGameType } from '../store/game/actions';
import { useStyles } from '../services/styles';

import { RootState } from '../store/state';
import { GameType } from '../store/models/GameType';

import { Container, Grid } from '@material-ui/core';

import SelectGameType from './SelectGameType';
import GameContainer from './GameContainer';
import Header from './Header';

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { gameType, userSelectedGameType } = useSelector((state: RootState) => state.game)

  const dispatchSwitchGameType = (type: GameType) => dispatch(switchGameType(type));

  const handleSwitchGameType = () => {
    if (gameType === GameType.people) {
      return dispatchSwitchGameType(GameType.starships)
    }
    return dispatchSwitchGameType(GameType.people)
  }

  return (
    <>
      <Header gameType={gameType} userSelectedGameType={userSelectedGameType} handleOnClick={handleSwitchGameType} />
      <Container maxWidth="lg" component="main" className={classes.mainContainer}>
        <Grid container justify="center" spacing={3}>
          {userSelectedGameType ?
          (
            <GameContainer />
          ) :
          (
            <SelectGameType handleChooseGame={dispatchSwitchGameType} />
          )}
        </Grid>
      </Container>
    </>
  );
}

export default App;
