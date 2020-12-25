import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import starshipsImg from '../../assets/images/starships.webp'
import peopleImg from '../../assets/images/people.jpg'
import { useStyles } from "../../services/styles";
import { GameType } from "../../store/models/GameType";

interface Props {
  handleChooseGame: (gameType: GameType) => void;
  gameType: GameType;
}

const SelectGameTypeCard = ({ handleChooseGame, gameType }: Props) => {
  const classes = useStyles();
  const cardImage = gameType === GameType.people ? peopleImg : starshipsImg;
  const cardTitle = gameType === GameType.people ? 'People' : 'Starships';
  return (
    <Card
      className={classes.gameTypeCard}
      onClick={() => handleChooseGame(gameType)}
    >
      <CardMedia
        image={cardImage}
        className={classes.media}
      />
      <CardContent>
        <Typography variant="h4" align="center">{cardTitle}</Typography>
      </CardContent>
    </Card>
  )
}

export default SelectGameTypeCard;