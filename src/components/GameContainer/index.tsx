import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { storePeopleCardsAction } from '../../store/peopleCards/actions';
import { storeStarshipsCardsAction } from '../../store/starshipsCards/actions';

import { GameType } from '../../store/models/GameType';
import { RootState } from '../../store/state';
import { StatusOfAPICall } from '../../store/game/models/StatusOfApiCall';

import PlayerCard from '../PlayerCard';
import { Button, CircularProgress, Grid, Typography } from '@material-ui/core';
import CasinoIcon from '@material-ui/icons/Casino';

import playerLeftAvatar from '../../assets/images/playerOneAvatar.png';
import playerRightAvatar from '../../assets/images/playerTwoAvatar.png';

const GameContainer = () => {
  const [hasStartedGame, setHasStartedGame] = useState<boolean>(false);
  const dispatch = useDispatch();

  const {
    leftCard: leftPeopleCard,
    rightCard: rightPeopleCard,
    error: peopleError,
  } = useSelector((state: RootState) => state.peopleCards);
  const {
    leftCard: leftStarshipCard,
    rightCard: rightStarshipCard,
    error: starshipsError,
  } = useSelector((state: RootState) => state.starshipsCards);
  const { leftPlayer, rightPlayer, isDraw, winnerId, gameType } = useSelector(
    (state: RootState) => state.game,
  );
  const { peopleStatus, starshipsStatus } = useSelector((state: RootState) => ({
    peopleStatus: state.people.status,
    starshipsStatus: state.starships.status,
  }));

  const isDataFetching =
    peopleStatus === StatusOfAPICall.FETCHING ||
    starshipsStatus === StatusOfAPICall.FETCHING;

  const dispatchGetPeople = () => dispatch(storePeopleCardsAction());
  const dispatchGetStarship = () => dispatch(storeStarshipsCardsAction());

  const handleDispatchGameType = () => {
    !hasStartedGame && setHasStartedGame(true);

    if (gameType === GameType.people) {
      return dispatchGetPeople();
    }
    return dispatchGetStarship();
  };

  const renderPlayerCards = () => (
    <>
      <Grid item md={3} xs={9}>
        <PlayerCard
          player={leftPlayer}
          avatar={playerLeftAvatar}
          isWinner={leftPlayer.id === winnerId}
          gameType={gameType}
          status={gameType === GameType.people ? peopleStatus : starshipsStatus}
          cards={gameType === GameType.people ? leftPeopleCard : leftStarshipCard}
        />
      </Grid>

      <Grid item md={3} xs={9}>
        <PlayerCard
          player={rightPlayer}
          avatar={playerRightAvatar}
          isWinner={rightPlayer.id === winnerId}
          gameType={gameType}
          status={gameType === GameType.people ? peopleStatus : starshipsStatus}
          cards={gameType === GameType.people ? rightPeopleCard : rightStarshipCard}
        />
      </Grid>
    </>
  )

  const renderStartGameInfo = () =>
    hasStartedGame ? null : (
      <Typography variant="subtitle1">
        To start the game press roll button
      </Typography>
    );

  return (
    <>
      <Grid container justify="center" spacing={3}>
        {renderPlayerCards()}
      </Grid>

      <Grid item xs>
        <Grid container direction="column" alignItems="center" spacing={3}>
          <Grid item>
            <Button
              variant={'outlined'}
              size={'large'}
              onClick={handleDispatchGameType}
              endIcon={
                isDataFetching ? <CircularProgress size={'small'} /> : <CasinoIcon />
              }
              disabled={isDataFetching}>
              ROLL {gameType}
            </Button>
          </Grid>

          <Grid item>{renderStartGameInfo()}</Grid>

          <Grid item>
            {isDraw ? <Typography variant="h4">DRAW</Typography> : null}
          </Grid>

          {peopleError || starshipsError ? (
            <Typography variant="subtitle1">
              {peopleError || starshipsError}
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </>
  );
};

export default GameContainer;
