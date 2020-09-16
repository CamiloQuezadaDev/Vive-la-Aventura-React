import React from 'react'

import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { Button } from '@material-ui/core';

const SubsidiaryForm = ({ openDialog , handleDialogClose }) => {
    return ( 
        <Dialog open={openDialog}>
            <DialogTitle>I Lose myself</DialogTitle>
            <Button onClick={handleDialogClose}>Cerrar</Button>
        </Dialog>
    );
}

export default SubsidiaryForm;