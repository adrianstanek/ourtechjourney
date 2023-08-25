import { useCallback } from 'react';
import { useMap } from 'react-map-gl';

export const useFlyToPosition = () => {
    const { current: map } = useMap();

    const flyTo = useCallback(
        (latitude: number, longitude: number) => {
            if (map) {
                map.flyTo({
                    center: [longitude, latitude],
                    duration: 500, // Animate over 12 seconds
                    essential: true, // This animation is considered essential with
                    speed: 0.2,
                    zoom: 18,
                });
            }
        },
        [map]
    );

    return { flyTo };
};
