import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline'; 

import AppBar from '@material-ui/core/AppBar'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import IconButton from '@material-ui/core/IconButton'; 
import Typography from '@material-ui/core/Typography'; 
import Drawer from '@material-ui/core/Drawer'; 
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import ManageNavigation from '../manage/ManageNavigation';
import { SessionContext } from '../../contexts/SessionContext';
import manageStyles from '../../styles/manageStyles';


const ManageLayout = ({ children }) => {
  const classes = manageStyles();
  const navigate = useNavigate();

  //STATES
  const [openDrawer, setOpenDrawer] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserIcon = Boolean(anchorEl);

  //EVENTS
  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleMenu = event => {
      setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
  };

  //Context 
  const { data, refetch  } = useContext(SessionContext);

  const loggedIn = data.me !== null; 

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, openDrawer && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              openDrawer && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          {loggedIn ? data.me.firstName : ''}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={handleMenu}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={openUserIcon}
            onClose={handleMenuClose}
          >
            <MenuItem
              onClick={() => {
                navigate('/');
              }}
            >
              <HomeIcon /> Vive la Aventura
            </MenuItem>
          </Menu>
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
            onClick={() => {
              localStorage.removeItem('AUTH_TOKEN', '');
              refetch();
              navigate('/');
            }}
          >
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(
            classes.drawerPaper,
            !openDrawer && classes.drawerPaperClose
          ),
        }}
        open={openDrawer}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ManageNavigation />
        </List>
      </Drawer>
      {children}
    </div>
  );
};

export default ManageLayout;
