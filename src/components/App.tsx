import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { switchGameType } from '../store/game/actions';
import { clearPeopleCardsAction } from '../store/peopleCards/actions';
import { clearStarshipsCardsAction } from '../store/starshipsCards/actions';
import { useStyles } from '../assets/styles/styles';

import { RootState } from '../store/state';
import { GameType } from '../store/models/GameType';

import { Container, Grid } from '@material-ui/core';

import SelectGameTypeCard from './SelectGameTypeCard';
import GameContainer from './GameContainer';
import Header from './Header';

function App() {
  const dispatch = useDispatch();
  const classes = useStyles();

  const { gameType, userSelectedGameType } = useSelector(
    (state: RootState) => state.game,
  );

  const dispatchSwitchGameType = (type: GameType) => dispatch(switchGameType(type));

  const handleSwitchGameType = () => {
    if (gameType === GameType.people) {
      dispatch(clearStarshipsCardsAction());
      return dispatchSwitchGameType(GameType.starships);
    }
    dispatch(clearPeopleCardsAction());
    return dispatchSwitchGameType(GameType.people);
  };

  return (
    <>
      <Header
        userSelectedGameType={userSelectedGameType}
        handleOnClick={handleSwitchGameType}
      />
      <Container maxWidth="lg" component="main" className={classes.mainContainer}>
        <Grid container justify="center" spacing={3}>
          {userSelectedGameType ? (
            <GameContainer />
          ) : (
            <Grid container justify="center" spacing={3}>
              <Grid item>
                <SelectGameTypeCard
                  handleChooseGame={dispatchSwitchGameType}
                  gameType={GameType.people}
                />
              </Grid>

              <Grid item>
                <SelectGameTypeCard
                  handleChooseGame={dispatchSwitchGameType}
                  gameType={GameType.starships}
                />
              </Grid>
            </Grid>
          )}
        </Grid>
      </Container>
    </>
  );
}

export default App;
