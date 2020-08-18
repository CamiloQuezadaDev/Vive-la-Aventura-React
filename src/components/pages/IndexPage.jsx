import React from 'react'
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const IndexPage = () => {
    return ( 
        <AppBar position="static" color="primary">
            <Toolbar>
                <IconButton edge="start"  color="inherit" aria-label="menu">
                </IconButton>
                <Typography variant="h6">
                    Vive La Aventura
                </Typography>
                <Link href="/signIn" color="inherit">{"Sign In"}</Link> | <Link href="/signUp" color="inherit">Sign Up</Link>
            </Toolbar>
        </AppBar>
    );
}

export default IndexPage;