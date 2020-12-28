import { createStyles, makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) =>
  createStyles({
    media: {
      height: '300px',
      width: '300px',
    },
    toolbar: {
      justifyContent: 'space-between',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
    },
    mainContainer: {
      padding: theme.spacing(12, 0, 0),
    },
    gameTypeCard: {
      '&:hover': {
        boxShadow: '0 0 15px #ffb74d',
        cursor: 'pointer',
      },
    },
    winCard: {
      boxShadow: '0 0 15px #ffb74d',
    },
    winnerTextContainer: {
      height: '100%',
      backgroundColor: 'hsla(150, 100%, 0%, 0.7)',
    },
    winnerText: {
      color: theme.palette.secondary.main,
    },
  }),
);
