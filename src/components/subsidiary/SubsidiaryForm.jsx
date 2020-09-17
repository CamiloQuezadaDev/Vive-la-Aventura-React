import React, { useState } from 'react'

import  PlacesAutocomplete  from 'react-places-autocomplete';
import Autocomplete  from '@material-ui/lab/Autocomplete';

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import { Button, DialogActions } from '@material-ui/core';


import { CREATE_SUBSIDIARY } from '../../data/mutations';

const SubsidiaryForm = ({ openDialog , handleDialogClose }) => {

    const [ address, setAddress ] = useState("");
    const [addressLoading, setAddressLoading] = useState(false);

    const handleSelect = async value => {}; 

    const handleSubmit = e => {
        e.preventDefault(); 
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
                    >
                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                            <Autocomplete 
                                options={suggestions}
                                renderInput={(params) => (
                                    <TextField 
                                        variant="outlined"
                                        fullWidth
                                        label="Dirección"
                                        name="subsidiary"
                                        {...getInputProps({
                                            className: 'location-search-input',
                                            disabled: addressLoading,
                                        })}
                                    />
                        )}
                        renderOption={(suggestion) => (
                            <div {...getSuggestionItemProps(suggestion)}>
                              <span>{suggestion.description}</span>
                            </div>
                          )}
                    />
                            
                        )}
                    </PlacesAutocomplete>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">Cancel</Button>
                    <Button variant="contained" type="submit" color="primary">Agregar</Button>
                </DialogActions>
            </form>
        </Dialog>
    );
}

export default SubsidiaryForm;