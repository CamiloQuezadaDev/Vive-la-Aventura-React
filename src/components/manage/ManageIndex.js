import React, { useState, useContext, useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { CircularProgress } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import { GoogleMap, Marker } from '@react-google-maps/api';
import SubsidiaryForm from '../subsidiary/SubsidiaryForm';
import SubsidiaryShow from '../subsidiary/SubsidiaryShow';
import { MapContext } from '../../contexts/MapContext';
import { HeadContext } from '../../contexts/HeadContext';
import { SUBSIDIARIES_OF_CURRENT_COMPANY } from '../../data/queries';
import { useQuery } from '@apollo/react-hooks';

const mapStyles = {
  height: '100vh',
  width: '100%',
};

const ManageIndex = () => {
  const { setMap } = useContext(MapContext);
  const [initialRegion] = useState({ lat: -38.73965, lng: -72.59842 });
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openShowDialog, setOpenShowDialog] = useState(false);
  const [infoSubsidiary, setInfoSubsidiary] = useState(null);
  const { data, loading } = useQuery(SUBSIDIARIES_OF_CURRENT_COMPANY);

  const handleFormDialogOpen = () => {
    setOpenFormDialog(true);
  };

  const handleShowDiagolOpen = (subsidiary) => {
    setInfoSubsidiary(subsidiary);
    setOpenShowDialog(true);
  };

  const onLoadMap = (map) => {
    setMap(map);
  };

  const { setHead } = useContext(HeadContext);

  useEffect(() => {
    setHead({
      title: 'Dashboard',
    });
  }, [setHead]);

  return (
    <>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={15}
        center={initialRegion}
        onLoad={onLoadMap}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {data.subsidiariesOfCurrentCompany.map((subsidiary) => (
              <Marker
                key={subsidiary.id}
                title={subsidiary.name}
                onClick={() => handleShowDiagolOpen(subsidiary)}
                position={{
                  lat: subsidiary.address.lat,
                  lng: subsidiary.address.lng,
                }}
              />
            ))}
          </>
        )}
      </GoogleMap>
      <Tooltip title="Agregar Sucursal">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleFormDialogOpen}
          style={{ position: 'absolute', top: 100, right: 50 }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>
      <SubsidiaryForm
        openDialog={openFormDialog}
        setOpenDialog={setOpenFormDialog}
      />
      <SubsidiaryShow
        openDialog={openShowDialog}
        setOpenDialog={setOpenShowDialog}
        data={infoSubsidiary}
      />
    </>
  );
};

export default ManageIndex;
