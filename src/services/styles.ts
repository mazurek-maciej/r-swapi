import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => createStyles({
  media: {
    height: '300px',
    width: '300px'
  },
  winCard: {
    boxShadow: '0 0 15px hsla(150, 100%, 50%, 0.3)'
  }
}))