import React, { useEffect, useState } from 'react';
import { ILngLat } from './MapLeaflet';
import MapMarker from './MapMarker';
import useGeolocation from '../../hooks/useGeolocation';

export const MeMarker: React.FC = () => {
    const geoPos = useGeolocation();

    const [mePos, setMePos] = useState<ILngLat | null>(null);

    useEffect(() => {
        if (geoPos.accuracy && geoPos.latitude && geoPos.longitude) {
            setMePos({
                latitude: geoPos.latitude,
                longitude: geoPos.longitude,
            });
        }

        // Debug
        // Set position a little next to the fewo
        // setMePos({
        //     latitude: demoMePosition.latitude - 0.00008,
        //     longitude: demoMePosition.longitude - 0.0001,
        // });
    }, [geoPos]);

    return (
        <>
            {mePos && (
                <MapMarker latitude={mePos.latitude} longitude={mePos.longitude}>
                    <img
                        src="assets/icons/noun-smile-1074856-1CC3F4.svg"
                        alt="me icon"
                        className="pulse green relative h-8 w-8 rounded-full bg-secondary"
                    />
                </MapMarker>
            )}
        </>
    );
};
