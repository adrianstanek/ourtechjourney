import React, { useMemo } from 'react';
import useGeoLocation from '../../hooks/useGeolocation';

interface IGeoState {}

export const GeoState: React.FC<IGeoState> = () => {
    const { longitude, latitude, accuracy, altitude } = useGeoLocation();

    const color = useMemo(() => {
        if (!accuracy) return 'bg-neutral-300';
        if (accuracy > 80) return 'bg-red-500';
        if (accuracy <= 80 && accuracy > 40) return 'bg-orange-500';
        return 'bg-blue-500';
    }, [accuracy]);

    const label = useMemo(() => {
        if ((!altitude && !latitude) || !longitude) return '';
        if (!altitude && (latitude || longitude)) return '2d';
        return '3d';
    }, [altitude, latitude, longitude]);

    return (
        <>
            <figure
                className={`relative flex aspect-[1/1] h-6 w-8 items-center justify-center rounded text-sm text-white transition-all ${color}`}
            >
                {label}
            </figure>
        </>
    );
};
