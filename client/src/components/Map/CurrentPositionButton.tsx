import React, { useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationCrosshairs } from '@fortawesome/pro-duotone-svg-icons';
import useGeolocation from '../../hooks/useGeolocation';
import { useFlyToPosition } from './hooks/useFlyToPosition';

export interface ICurrentPositionButton {}

export const CurrentPositionButton: React.FC<ICurrentPositionButton> = () => {
    const { latitude, longitude, accuracy } = useGeolocation();

    const { flyTo } = useFlyToPosition();

    const setPosition = useCallback(() => {
        if (accuracy && latitude && longitude) {
            flyTo(latitude, longitude);
        }
    }, [accuracy, flyTo, latitude, longitude]);

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
