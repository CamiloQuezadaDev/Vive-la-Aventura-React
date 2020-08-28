import React, { useState }from 'react'
import { AppBar, IconButton, Typography, Toolbar,  } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import AccountCircle from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import DashboardIcon from '@material-ui/icons/Dashboard';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import {AUTH_TOKEN} from '../../constants';

import { useNavigate } from 'react-router-dom';

const IndexPage = () => {

    const authToken = localStorage.getItem(AUTH_TOKEN);

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

    const classes = useStyles();

    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);

    const openUserIcon = Boolean(anchorEl);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap>
                        VIVE LA AVENTURA    
                    </Typography>
                    { authToken ? (
                        <>
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
                                <MenuItem>
                                    <DashboardIcon /> DashBoard
                                </MenuItem>
                            </Menu>

                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={ () => { 
                                    localStorage.removeItem(AUTH_TOKEN);
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
                            Sign In
                        </Button>
                        <Button href="/signUp" color="inherit">
                            Sign Up
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
        </div>
        
    );
}

export default IndexPage;