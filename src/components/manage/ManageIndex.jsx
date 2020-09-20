import React, { useState , useContext} from 'react'
import { SessionContext } from '../../contexts/SessionContext';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx'; 
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'; 
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

import MenuIcon from '@material-ui/icons/Menu' 
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';

import Fab from '@material-ui/core/Fab';

import { GoogleMap, Marker } from '@react-google-maps/api';
import { MapContext } from '../../contexts/MapContext';

import ManageNavigation from './ManageNavigation';
import SubsidiaryForm from '../subsidiary/SubsidiaryForm'; 




const drawerWidth = 240; 

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#388e3c'
        }
    }
});

const useStyles = makeStyles((theme) =>({
    root: {
        display: 'flex'
    },
    toolbar: {
        paddingRight: 24
    },
    toolbarIcon: {
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar
    }, 
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width','margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }, 

    menuButton: {
        marginRight: 36,
    }, 

    menuButtonHidden: {
        display: 'none',
    }, 
    title: {
        flexGrow: 1
    },

    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth, 
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.duration.enteringScreen,
        }),
    }, 

    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp, 
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },

    appBarSpacer: theme.mixins.toolbar, 
    content: {
        flexGrow: 1,
        height: '100vh', 
        overflow: 'auto'
    }, 
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    }, 
    paper: {
        padding: theme.spacing(2), 
        display: 'flex', 
        overflow: 'auto', 
        flexDirection: 'column',
    }, 

    fixedHeight: {
        height: 240
    },

    fabIcon: {
        position: 'absolute',
        top:100,
        right: 50
    }
})); 

const mapStyles = {
    height: "100vh",
    width: "100%"
}; 


const ManageIndex = () => {

    const classes = useStyles(); 
    const navigate = useNavigate();

    // DRAWER STATE
    const [openDrawer, setOpenDrawer] = useState(false); 

    // DRAWER EVENTS
    const handleDrawerOpen = () => {
        setOpenDrawer(true);
    }

    const handleDrawerClose = () => {
        setOpenDrawer(false);
    }


    // MENU STATE
    const [anchorEl, setAnchorEl] = useState(null);

    const openUserIcon = Boolean(anchorEl);

    // MENU EVENTS
    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };


    const [openDialog, setOpenDialog ] = useState(false);

    const handleDialogOpen = () => {
        setOpenDialog(true);
    }

    const handleDialogClose = () => {
        setOpenDialog(false);
    }

    const { setMap } = useContext(MapContext);
    const [initialRegion  ] = useState({lat: -38.73965, lng: -72.59842})

    const onLoadMap = (map) => {
        setMap(map);
    }


    const { data, refetch  } = useContext(SessionContext); 
    const loggedIn = data.me !== null; 

    return (
        
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="absolute" className={clsx(classes.appBar, openDrawer && classes.appBarShift)}>
                    <Toolbar className={classes.toolbar}>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            Dashboard
                        </Typography>
                        {loggedIn ? data.me.firstName : '' } 
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
                                        onClick={ () => {
                                            navigate('/')
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
                                onClick={ () => { 
                                    localStorage.removeItem('AUTH_TOKEN','');
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
                        paper: clsx(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                    }}
                    open={openDrawer}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton
                            onClick={handleDrawerClose}
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>
                        <ManageNavigation  />
                    </List>
                </Drawer>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={15}
                        center={initialRegion}
                        onLoad={onLoadMap}
                    >
                        <Marker
                            key="1"
                            position={{
                                lat: -38.7415931, lng: -72.5931716
                            }}/>
                    </GoogleMap>
                <Fab color="primary" aria-label="add" className={classes.fabIcon} onClick={handleDialogOpen}>
                    <AddIcon />
                </Fab>
                < SubsidiaryForm  openDialog={openDialog} handleDialogClose={handleDialogClose} />
            </div>
        </ThemeProvider>
    );
}

export default ManageIndex;