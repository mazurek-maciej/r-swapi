import React from "react";
import { useStyles } from "../../services/styles";

import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography, CircularProgress } from "@material-ui/core";

import { People } from "../../store/people/models/People";
import { Player } from "../../store/game/models/Player";

import peopleImg from '../../assets/images/people.jpg'
import { StatusOfAPICall } from "../../services/StatusOfApiCall";


interface Props {
  player: Player;
  avatar: string;
  isWinner: boolean;
  status: StatusOfAPICall;
  people?: People;
}

const PeopleCard = ({ player, avatar, isWinner, status, people }: Props) => {
  const classes = useStyles();

  const renderPeopleContent = () => (
    people ? (
      <>
        <Typography variant="h5">{people.name}</Typography>
        <Typography variant="h4">Mass: {people.mass}</Typography>
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
        image={peopleImg}
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
        {status === StatusOfAPICall.FETCHING ? <CircularProgress/> : renderPeopleContent()}
      </CardContent>
    </Card>
  )
}

export default PeopleCard;