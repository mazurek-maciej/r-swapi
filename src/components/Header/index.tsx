import React from "react";
import { useStyles } from "../../services/styles";

import { AppBar, Avatar, Button, Toolbar, Typography } from "@material-ui/core";

import { GameType } from "../../store/models/GameType";

import whistleIcon from '../../assets/images/whistle.png';

interface Props {
  gameType: GameType;
  userSelectedGameType: boolean;
  handleOnClick: () => void;
}

export const Header = ({gameType, userSelectedGameType, handleOnClick}: Props) => {
  const classes = useStyles();

  const renderChooseCardsType = () => {
    const btnText = gameType === GameType.people ? 'Change cards to starships' : 'Change cards to people'

    return userSelectedGameType ? 
      <Button
        variant={'outlined'}
        color="primary"
        onClick={handleOnClick}
        size={'large'}
      >
        {btnText}
      </Button> :
      <Typography variant="h5" align="center">Choose cards type</Typography>
  }

  return (
    <AppBar color="secondary">
      <Toolbar className={classes.toolbar}>
        <Typography align="center" variant="h5" component="h1" className={classes.headerTitle}>
          <Avatar src={whistleIcon} />
          gwizdek
        </Typography>
        {renderChooseCardsType()}
      </Toolbar>
    </AppBar>
  )
};

export default Header
