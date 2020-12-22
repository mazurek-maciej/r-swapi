import React from "react";
import { useStyles } from "../../services/styles";

import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography, CircularProgress } from "@material-ui/core";

import { Player } from "../../store/game/models/Player";
import { Starship } from "../../store/starships/models/Starship";

import { StatusOfAPICall } from "../../store/game/models/StatusOfApiCall";
import { GameType } from "../../store/models/GameType";
import { People } from "../../store/people/models/People";

import starshipsImg from '../../assets/images/starships.webp'
import peopleImg from '../../assets/images/people.jpg'

interface Props {
  player: Player;
  avatar: string;
  isWinner: boolean;
  status: StatusOfAPICall;
  gameType: GameType;
  people?: People;
  starship?: Starship;
}

const PlayerCard = ({ player, avatar, isWinner, status, gameType, people, starship }: Props) => {
  const classes = useStyles();
  const cardImage = gameType === GameType.people ? peopleImg : starshipsImg

  const renderCardContent = () => {
    return gameType === GameType.people ? (
      people ? (
        <>
          <Typography variant="h5">{people.name}</Typography>
          <Typography variant="h4">Mass: {people.mass}</Typography>
        </>
      ) : <Typography>Cannot recieve information from space command</Typography>
    ) : (
      starship ? ( 
        <>
          <Typography variant="h5">{starship?.name}</Typography>
          <Typography variant="h4">Crew: {starship?.crew}</Typography>
        </>
      ) : <Typography>Cannot recieve information from space command</Typography>
    )
  }
    
  return (
    <Card className={isWinner ? classes.winCard : ''}>
      <CardHeader
        avatar={
          <Avatar src={avatar} />
        }
        title={player.name}
        subheader={`Score: ${player.score}`}
      />
      <CardMedia
        image={cardImage}
        className={classes.media}
      > 
        {isWinner ? (
          <Grid
            container
            className={classes.winnerTextContainer}
            justify="center"
            alignItems="center"
          >
            <Grid item>
              <Typography variant="h4" className={classes.winnerText}>WINNER</Typography>
            </Grid>
          </Grid>
        ) : null}
      </CardMedia>
      <CardContent>
        {status === StatusOfAPICall.FETCHING ? <CircularProgress/> : renderCardContent()}
      </CardContent>
    </Card>
  )
};

export default PlayerCard;