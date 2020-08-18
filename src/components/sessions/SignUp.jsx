import React, { useState } from 'react'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';      
import { makeStyles, Avatar} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';

import { useMutation } from '@apollo/react-hooks';
import { USER_SIGN_UP } from '../../data/mutations';

const SignUp = () => {

    const useStyles = makeStyles((theme)=> ({
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
            marginTop: theme.spacing(3)
        },
        submit: {
            margin: theme.spacing(3,0,2),
        }
    }));

    const classes = useStyles();

    const [user, updateUser] = useState({
        companyName:'',
        firstName:'',
        lastName: '',
        email:'',
        password:''
    })

    const [userSignUp] = useMutation(USER_SIGN_UP);

    const handleChange = e => {

        const { name, value } = e.target;

        updateUser({
            ...user,
            [name] : value 
        });
    }

    const handleSubmit = async e => {
        e.preventDefault();

        await userSignUp({
            variables: {
                input: user,
            },
        }).then(async({data}) => {
            const {errors,success} = data.userSignUp
            if(!success){
                alert(errors);
            } 
        }).catch(error => {
            alert(error);
        });
    }

    const { companyName, firstName,lastName,email,password} = user;

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign Up
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit} noValidate>
                    <br />
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField 
                                autoComplete="Cname"
                                name="companyName"
                                variant="outlined"
                                required 
                                fullWidth
                                label="Company Name"
                                autoFocus
                                onChange={ handleChange }
                                value={companyName}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField 
                                name="firstName"
                                variant="outlined"
                                required 
                                fullWidth
                                label="First Name"
                                onChange={ handleChange }
                                value={firstName}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                name="lastName"
                                variant="outlined"
                                required 
                                fullWidth
                                label="Last Name"
                                autoFocus
                                onChange={ handleChange }
                                value={lastName}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={ handleChange }
                                value={email}
                            />
                        </Grid>


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                                onChange={ handleChange }
                                value={password}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/signIn" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;