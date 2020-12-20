import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((props) => createStyles({
  media: {
    height: '300px',
    width: '300px',
  },
  gameTypeCard: {
    '&:hover': {
      boxShadow: '0 0 15px hsla(150, 100%, 50%, 0.3)',
      cursor: 'pointer'
    }
  },
  winCard: {
    boxShadow: '0 0 15px hsla(150, 100%, 50%, 0.3)'
  },
  winnerTextContainer: {
    height: '100%',
    backgroundColor: 'hsla(150, 100%, 0%, 0.7)'
  },
  winnerText: {
    color: props.palette.success.main
  }
}))