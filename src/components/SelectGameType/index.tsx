import { Card, CardContent, CardMedia, Grid, Typography } from "@material-ui/core";
import starshipsImg from '../../assets/images/starships.webp'
import peopleImg from '../../assets/images/people.jpg'
import { useStyles } from "../../services/styles";
import { GameType } from "../../store/models/GameType";

interface Props {
  handleChooseGame: (gameType: GameType) => void
}

const SelectGameType = ({ handleChooseGame }: Props) => {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={3}>
      <Grid item>
        <Card
          className={classes.gameTypeCard}
          onClick={() => handleChooseGame(GameType.people)}
        >
          <CardMedia
            image={peopleImg}
            className={classes.media}
          />
          <CardContent>
            <Typography variant="h4" align="center">People</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item>
        <Card
          className={classes.gameTypeCard}
          onClick={() => handleChooseGame(GameType.starships)}
        >
          <CardMedia
            image={starshipsImg}
            className={classes.media}
          />
          <CardContent>
            <Typography variant="h4" align="center">Starships</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default SelectGameType;