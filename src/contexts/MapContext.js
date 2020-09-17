import React, { createContext, useState }from 'react';
import { useLoadScript } from '@react-google-maps/api'; 

export const GOOGLE_MAPS_API = {
    googleMapsApiKey: 'AIzaSyAIc3lygf3YkpNC09MksffMc8_PM89GNKE',
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