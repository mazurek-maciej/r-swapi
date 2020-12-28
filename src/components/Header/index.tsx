import React from 'react';
import { useStyles } from '../../assets/styles/styles';

import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';

import whistleIcon from '../../assets/images/whistle.png';

interface Props {
  userSelectedGameType: boolean;
  handleOnClick: () => void;
}

export const Header = ({ userSelectedGameType, handleOnClick }: Props) => {
  const classes = useStyles();

  const renderChooseCardsType = () => {
    return userSelectedGameType ? (
      <Button
        variant={'outlined'}
        color="primary"
        onClick={handleOnClick}
        size={'large'}>
        Switch cards
      </Button>
    ) : (
      <Typography variant="h5" align="center">
        Choose cards type
      </Typography>
    );
  };

  return (
    <AppBar color="secondary">
      <Toolbar className={classes.toolbar}>
        <Typography
          align="center"
          variant="h5"
          component="h1"
          className={classes.headerTitle}>
          <Avatar src={whistleIcon} />
          gwizdek
        </Typography>
        {renderChooseCardsType()}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
