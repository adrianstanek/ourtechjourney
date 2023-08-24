import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/pro-duotone-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';
import { useMap } from 'react-leaflet';

export interface ICurrentPositionButton {}

export const CurrentPositionButton: React.FC<ICurrentPositionButton> = () => {
    const { latitude, longitude, accuracy } = useGeolocation();

    const map = useMap();

    const setPosition = useCallback(() => {
        if (accuracy && latitude && longitude) {
            // Prevent wobbling animation for too short flights
            const doAnimate = map.getCenter().distanceTo([latitude, longitude]) > 100;

            map.flyTo([latitude, longitude], map.getZoom(), {
                animate: doAnimate,
                duration: 1.0,
            });
        }
    }, [accuracy, latitude, longitude, map]);

    return (
        <>
            <button
                onClick={setPosition}
                className="fixed bottom-20 left-3 z-[1500] flex items-center justify-center rounded-full bg-primary-dark p-2"
                id="test"
            >
                <FontAwesomeIcon icon={faLocationCrosshairs} className="h-4 text-secondary" />
            </button>
        </>
    );
};
