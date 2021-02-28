import React from 'react';
import { useMutation } from '@apollo/client';
import { makeStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { DELETE_SUBSIDIARY } from '../../data/mutations'; 
import { SUBSIDIARIES_OF_CURRENT_COMPANY } from '../../data/queries';

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}));

const SubsidiaryShow = ({ openDialog, setOpenDialog, data: subsidiary }) => {
  const classes = useStyles();

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const [deleteSubsidiary] = useMutation(DELETE_SUBSIDIARY, { 
    update: (cache,  { data: { deleteSubsidiary }}) => {
      if (deleteSubsidiary) {
        let data = cache.readQuery({ query: SUBSIDIARIES_OF_CURRENT_COMPANY });
        const deletedSubsidiary = deleteSubsidiary.subsidiary; 

        data = data.subsidiariesOfCurrentCompany.filter((subsidiary) => subsidiary.id !== deletedSubsidiary.id);

        cache.writeQuery({
          query: SUBSIDIARIES_OF_CURRENT_COMPANY,
          data: {
            subsidiariesOfCurrentCompany: data,
          }
        });
      }
    },
  })

  const handleDelete = async id => {
    if (window.confirm('¿Estas seguro?')) {
      await deleteSubsidiary({
        variables: {
          input: {
            id,
          }
        }
      }).then(async ({ data }) => {
        const { deleted, errors } = data.deleteSubsidiary;
        if (deleted) {
          setOpenDialog(false);
        } else {
          alert(errors);
        }
      }).catch((error) => {
        alert(error);
      })
    }
  }

  return (
    <Dialog fullWidth open={openDialog} onClose={handleDialogClose}>
      <DialogTitle>
        <div className={classes.dialogTitle}>
          Sucursal #{subsidiary && subsidiary.id}
          <div>
            <Tooltip title="Editar">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Eliminar">
              <IconButton
                onClick={ () => handleDelete(subsidiary.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </DialogTitle>
      <DialogContent>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell width={120}>Dirección</TableCell>
              <TableCell>
                <>
                  {subsidiary && subsidiary.address.line1} {' '}
                  {subsidiary && subsidiary.address.city}
                </>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default SubsidiaryShow;
