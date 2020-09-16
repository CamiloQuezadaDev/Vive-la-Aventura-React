import React from 'react'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';

import { Button, DialogActions } from '@material-ui/core';

const SubsidiaryForm = ({ openDialog , handleDialogClose }) => {
    return ( 
        <Dialog fullWidth  open={openDialog} onClose={handleDialogClose}>
            <form>
                <DialogTitle>Agregar Sucursal</DialogTitle>
                <DialogContent>
                    <TextField 
                        variant="outlined"
                        fullWidth
                        label="Dirección"
                        name="subsidiary"
                    />
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