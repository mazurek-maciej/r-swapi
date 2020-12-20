import React from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import { useStyles } from "../../services/styles";
import { People } from "../../store/people/models/People";

import peopleImg from '../../assets/images/people.jpg'
import { Player } from "../../store/game/models/Player";

interface Props {
  player: Player;
  avatar: string;
  people?: People;
}

const PlayerCard = ({ player, avatar, people }: Props) => {
  const classes = useStyles();

  return (
    <Card>
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
      />
      <CardContent>
        <Typography variant="h5">{people?.name}</Typography>
        {people ? <Typography variant="h4">Mass: {people?.mass}</Typography> : null}
      </CardContent>
    </Card>
  )
}

export default PlayerCard;