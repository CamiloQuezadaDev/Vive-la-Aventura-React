import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import DashboardIcon from '@material-ui/icons/Dashboard';
import RoomIcon from '@material-ui/icons/Room';

const ManageIndex = () => {

    const navigate = useNavigate();

    return (
        <>
            <ListItem button onClick={() => {    navigate('/dashboard')  }}>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
            <ListItem button onClick={() => {    navigate('/dashboard')  }}>
                <ListItemIcon>
                    <RoomIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </>
    )
}

export default ManageIndex;