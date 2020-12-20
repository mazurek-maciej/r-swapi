import React from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Grid, Typography } from "@material-ui/core";
import { useStyles } from "../../services/styles";
import { People } from "../../store/people/models/People";

import peopleImg from '../../assets/images/people.jpg'
import { Player } from "../../store/game/models/Player";

interface Props {
  player: Player;
  avatar: string;
  isWinner: boolean;
  people?: People;
}

const PlayerCard = ({ player, avatar, isWinner, people }: Props) => {
  const classes = useStyles();

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
        <Typography variant="h5">{people?.name}</Typography>
        {people ? <Typography variant="h4">Mass: {people?.mass}</Typography> : null}
      </CardContent>
    </Card>
  )
}

export default PlayerCard;