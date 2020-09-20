import React , { useState } from 'react'
import { CircularProgress, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';

import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import { makeStyles } from '@material-ui/core/styles';

import Background from '../../img/sign_up.jpeg';

import { useMutation,useQuery } from '@apollo/react-hooks';
import { USER_SIGN_UP } from '../../data/mutations';
import { SERVICES } from '../../data/queries'; 

import { useNavigate } from 'react-router-dom';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="/">
            Vive La Aventura
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#388e3c'
        }
    }
});

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: `url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#43a047',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignUp = () => {
    const classes = useStyles();

    const [userSignUp] = useMutation(USER_SIGN_UP);

    const { data, loading } = useQuery(SERVICES);
    

    const [user, updateUser] = useState({
        companyName:'',
        firstName:'',
        lastName: '',
        email:'',
        password:'',
        serviceId: ''
    })

    const { companyName, firstName,lastName,email,password,serviceId} = user; 

    const navigate = useNavigate();
    //EVENTS 

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
            if(success){
                navigate('/');
            } else {
                alert(errors);
            }
        }).catch(error => {
            alert(error);
        });
    }

    return (
        <ThemeProvider theme={theme}>
            { loading ? <CircularProgress /> : (
                <Grid container component="main" className={classes.root}>
                    <CssBaseline />
                    <Grid item xs={false} sm={4} md={7} className={classes.image} />
                    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Sign Up
                            </Typography>
                            <form className={classes.form}  onSubmit={handleSubmit} noValidate>
                                
                                <TextField 
                                    autoComplete="Cname"
                                    name="companyName"
                                    variant="outlined" 
                                    fullWidth
                                    margin="normal"
                                    label="Company Name"
                                    autoFocus
                                    onChange={ handleChange }
                                    value={companyName}
                                />
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            name="firstName"
                                            variant="outlined" 
                                            fullWidth
                                            margin="normal"
                                            label="First Name"
                                            onChange={ handleChange }
                                            value={firstName}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={6}>
                                        <TextField 
                                            name="lastName"
                                            variant="outlined"
                                            margin="normal"
                                            fullWidth
                                            label="Last Name"
                                            onChange={ handleChange }
                                            value={lastName}
                                        />
                                    </Grid>
                                </Grid>
                                

                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={ handleChange }
                                    value={email}
                                />

                                <FormControl variant="outlined" fullWidth margin="normal" className={classes.formControl}>
                                    <InputLabel id="service-label">Service</InputLabel>
                                        <Select
                                            labelId="service-label"
                                            label="Service"
                                            fullWidth
                                            value={serviceId}
                                            onChange={handleChange}
                                            name="serviceId"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>

                                            {data.services.map(service => (
                                                <MenuItem key={service.id} value={service.id}>{service.name}</MenuItem>
                                            ))}
                                        </Select>
                                </FormControl>

                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    autoComplete="current-password"
                                    onChange={ handleChange }
                                    value={password}
                                />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign Up 
                            </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/signIn">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
            </Grid>
            )}
        </ThemeProvider>
    );
}

export default SignUp;