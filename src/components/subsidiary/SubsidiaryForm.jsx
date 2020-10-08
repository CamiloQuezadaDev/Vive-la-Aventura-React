import React, { useState } from 'react'

import  PlacesAutocomplete  from 'react-places-autocomplete';
import Autocomplete  from '@material-ui/lab/Autocomplete';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { Button, DialogActions } from '@material-ui/core';


import { CREATE_SUBSIDIARY } from '../../data/mutations';

const useStyles = makeStyles((theme) => ({
    icon: {
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(2),
    },
}));

const SubsidiaryForm = ({ openDialog , setOpenDialog }) => {

    const classes = useStyles();
    const [ address, setAddress ] = useState("");
    const [addressLoading] = useState(false);

    const [disabled,setDisabled] = useState(true); 

    const handleSelect = async address => {
        setAddress(address);
        setDisabled(false);
    }; 

    const handleSubmit = e => {
        e.preventDefault(); 
        setDisabled(true);
        handleDialogClose();
    }

    const handleDialogClose = () => {
        setAddress("");
        setOpenDialog(false);

    }
    

    return ( 
        <Dialog fullWidth  open={openDialog} onClose={handleDialogClose}>
            <form onSubmit={handleSubmit}>
                <DialogTitle>Agregar Sucursal</DialogTitle>

                <DialogContent>
                    <PlacesAutocomplete
                        value={address}
                        onChange={setAddress}
                        onSelect={handleSelect}
                        searchOptions={
                            {componentRestrictions: { country: ['chl']}}
                        }
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (

                            <>
                                <Autocomplete
                                    options={suggestions}
                                    getOptionLabel={(suggestion) => suggestion.description}
                                    inputValue={address}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Buscar dirección"
                                            margin="normal"
                                            variant="outlined"
                                            {...getInputProps({
                                                className: 'location-search-input',
                                                disabled: addressLoading,
                                            })}
                                            />
                                    )}
                                    renderOption={(suggestion) => (
                                        <Grid container alignContent="center">
                                            <Grid item>
                                                <LocationOnIcon  className={classes.icon}/>
                                            </Grid>
                                            <Grid item xs>
                                                <div {...getSuggestionItemProps(suggestion)}>
                                                    <span style={{fontWeight: 400 }}>{suggestion.formattedSuggestion.mainText}</span>
                                                    <Typography color="textSecondary">
                                                    {suggestion.formattedSuggestion.secondaryText}
                                                    </Typography>
                                                </div>
                                            </Grid>
                                        </Grid>
                                    )}
                                />
                            </>
                        )}
                        
                    </PlacesAutocomplete>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Cancel</Button>
                    <Button disabled={disabled} variant="contained" type="submit" color="primary">Agregar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default SubsidiaryForm;