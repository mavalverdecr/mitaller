import React from 'react';
import { useAppl } from '../../../context/ApplContext';

//Material-UI
import { makeStyles } from '@material-ui/core/styles';
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import InputIcon from '@material-ui/icons/Input';

import Autocomplete from './components/Autocomplete'

const drawerWidth = 240;
const useStyles = makeStyles(theme => ({
  appBarLogged: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  appBarNotLogged: {
    [theme.breakpoints.up('sm')]: {
      width: '100%',
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },  
  signOutButton: {
    marginLeft: theme.spacing(1)
  },
  flexGrow: {
    flexGrow: 1
  },   
}))

const Topbar = () => {
  const classes = useStyles();

  const { logout, 
          mobileSidebarOpen, 
          setMobileSidebarOpen, 
          isLogged, 
          usuario,
  } = useAppl();
  
  const handleOnClick = async () => {
        
    try {
        await logout();
    } catch {}

  }
  
  const handleDrawerToggle = () => {
    setMobileSidebarOpen(!mobileSidebarOpen)
  }

  return (
    <AppBar position="fixed" className={ isLogged ? classes.appBarLogged : classes.appBarNotLogged}>
      <Toolbar>
        {
          isLogged ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            null
          )
        }
        <Typography variant="h6" noWrap>
          mITaller
        </Typography>
        {
          isLogged ? <Autocomplete /> : null
        }
        <div className={classes.flexGrow} />
        {
          isLogged ? (
            <div>
              {usuario.nombre ? 'Bienvenido, ' + usuario.nombre : null}
              <IconButton
                className={classes.signOutButton}
                color="inherit"
                onClick={handleOnClick}
              > 
                <InputIcon />
              </IconButton>
            </div>
          ) : (
            null
          )
        }
      </Toolbar>
    </AppBar>
  )
}

export default Topbar;