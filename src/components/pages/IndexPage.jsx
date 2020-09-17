import React, { useState, useContext }from 'react'
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';


import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import { useNavigate } from 'react-router-dom';

import { GoogleMap, LoadScript } from '@react-google-maps/api';

import { SessionContext} from '../../contexts/SessionContext'; 


const IndexPage = () => {
    const navigate = useNavigate();

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        }, 
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1
        }
    }));

    const theme = createMuiTheme({
        palette: {
            primary: {
                main: '#388e3c'
            }
        }
    });

    const classes = useStyles();


    const [anchorEl, setAnchorEl] = useState(null);

    const openUserIcon = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const mapStyles = {
        height: "100vh",
        width: "100%"
    }; 

    const defaultCenter = {
        lat: -38.73965, lng: -72.59842
    }

    const { data, refetch } = useContext(SessionContext); 
    const loggedIn = data.me !== null; 
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography className={classes.title} variant="h6" noWrap>
                            VIVE LA AVENTURA    
                        </Typography>
                        { loggedIn ? (
                            <>
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
                                    onClose={handleClose}
                                >
                                    <MenuItem
                                        onClick={ () => {
                                            navigate('/dashboard')
                                        }}
                                    >
                                        <DashboardIcon />DashBoard
                                    </MenuItem>
                                </Menu>

                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={ () => { 
                                        localStorage.removeItem('AUTH_TOKEN','');
                                        refetch();
                                        navigate('/');
                                    }}
                                color="inherit"
                                >   
                                    <ExitToAppIcon />
                                </IconButton>
                            </>
                        ) : (
                        <>
                                <Button href="/signIn" color="inherit">
                                    Ingresar
                                </Button>
                                <Button href="/signUp" color="inherit">
                                    Registrarse
                                </Button>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
                    <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={15}
                        center={defaultCenter}
                    />
            </div>
        </ThemeProvider>
        
    );
}

export default IndexPage;