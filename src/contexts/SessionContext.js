import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ME } from '../data/queries';

export const SessionContext = React.createContext();

export const SessionProvider = ({ children }) => {
    const { data, loading, refetch } = useQuery(ME); 
    if (loading) return <CircularProgress />; 

    return (
        <SessionContext.Provider value={{
            data,
            loading,
            refetch
            }}>
            {children}
        </SessionContext.Provider>
    );
}