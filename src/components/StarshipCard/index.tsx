import React from "react";
import { useStyles } from "../../services/styles";

import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography, CircularProgress } from "@material-ui/core";

import { Player } from "../../store/game/models/Player";
import { Starship } from "../../store/starships/models/Starship";

import starshipsImg from '../../assets/images/starships.webp'
import { StatusOfAPICall } from "../../services/StatusOfApiCall";

interface Props {
  player: Player;
  avatar: string;
  isWinner: boolean;
  status: StatusOfAPICall;
  starship?: Starship;
}

const StarshipCard = ({ player, avatar, isWinner, status, starship }: Props) => {
  const classes = useStyles();

  const renderStarshipContent = () => (
    starship ? (
      <>
        <Typography variant="h5">{starship.name}</Typography>
        <Typography variant="h4">Crew: {starship.crew}</Typography>
      </>
    ) : <Typography>No data from subspace transceiver</Typography>
  )
    
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
        image={starshipsImg}
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
        {status === StatusOfAPICall.FETCHING ? <CircularProgress/> : renderStarshipContent()}
      </CardContent>
    </Card>
  )
};

export default StarshipCard;