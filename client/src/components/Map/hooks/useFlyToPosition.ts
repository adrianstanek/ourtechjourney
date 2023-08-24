import { useMap } from 'react-leaflet';
import { useCallback } from 'react';

export const useFlyToPosition = () => {
    const map = useMap();

    const flyTo = useCallback(
        (latitude: number, longitude: number) => {
            // Prevent wobbling animation for too short flights
            const doAnimate = map.getCenter().distanceTo([latitude, longitude]) > 100;

            map.flyTo([latitude, longitude], map.getZoom(), {
                animate: doAnimate,
                duration: 1.0,
            });
        },
        [map]
    );

    return { flyTo };
};
