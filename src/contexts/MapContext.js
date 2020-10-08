import React, { createContext, useState }from 'react';
import { useLoadScript } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../constants'; 


export const GOOGLE_MAPS_API = {
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    language: 'es',
    libraries: ['places'],
}

export const MapContext = createContext(); 

export const MapProvider = ({children}) => {
    const [map, setMap] = useState(null); 
    const { isLoaded } = useLoadScript({...GOOGLE_MAPS_API});

    if (!isLoaded) return <div><p>Loading...</p></div>

    return (
        <MapContext.Provider value={{
            map,
            setMap 
        }}>
            {children}
        </MapContext.Provider>
    )
}