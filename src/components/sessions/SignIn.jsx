import React, { useState, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { CssBaseline, Typography, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Button from '@material-ui/core/Button';
import { makeStyles, Avatar} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { useMutation } from '@apollo/react-hooks';
import { USER_SIGN_IN } from '../../data/mutations';

import { useNavigate } from 'react-router-dom';

import { SessionContext } from '../../contexts/SessionContext'; 


const SignIn = () => {

    const [login, updateLogin] = useState({
        email:'',
        password: ''
    }); 

    const [userSignIn] = useMutation(USER_SIGN_IN);

    const navigate = useNavigate();

    const { refetch } = useContext(SessionContext); 

    const handleChange = e => {
        const {name, value} = e.target; 
        updateLogin({
            ...login,
            [name] : value 
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        await userSignIn({
            variables: {
                input: login
            }
        }).then(async({data}) => {
            const { token,errors } = data.userSignIn;
            if( errors.length > 0 ){
                alert(errors);
            } else {
                localStorage.setItem('AUTH_TOKEN',token);
                await refetch();
                navigate('/');
            }
        }).catch(errors => {
            alert(errors);
        });
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main
        },
        form: {
            width: '100%',
            marginTop: theme.spacing(1),
        },
        submit: {
            margin: theme.spacing(3,0,2)
        }
    })); 

    const classes = useStyles();

    const { email, password} = login;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <form className={classes.form} onSubmit={handleSubmit} noValidate>
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required 
                            fullWidth 
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus 
                            onChange={ handleChange }
                            value={email}
                        />
                        <TextField 
                            variant="outlined"
                            margin="normal"
                            required 
                            fullWidth 
                            name="password"
                            label="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={ handleChange }
                        />

                        <Button
                            type="submit"
                            fullWidth 
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In 
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signUp">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
        </Container>
    );
}

export default SignIn;