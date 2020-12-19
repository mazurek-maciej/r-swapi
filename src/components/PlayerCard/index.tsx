import React from "react";
import { Avatar, Card, CardContent, CardHeader, CardMedia, Typography } from "@material-ui/core";
import { useStyles } from "../../services/styles";
import { People } from "../../store/people/models/People";

import peopleImg from '../../assets/images/people.jpg'

interface Props {
  name: string;
  avatar: string;
  people?: People;
}

const PlayerCard = ({ name, avatar, people }: Props) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar src={avatar} />
        }
        title={name}
        subheader="Score: 0"
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