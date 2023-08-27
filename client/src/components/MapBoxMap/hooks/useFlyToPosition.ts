import { useCallback } from 'react';
import { useMap } from 'react-map-gl';

export interface IFlyToOptions {
    zoom?: number;
    speed?: number;
    duration?: number;
    essential?: boolean;
}

export const useFlyToPosition = () => {
    const { current: map } = useMap();

    const flyTo = useCallback(
        (latitude: number, longitude: number, options?: IFlyToOptions) => {
            if (map) {
                map.flyTo({
                    center: [longitude, latitude],
                    essential: options?.essential ?? true,
                    duration: options?.duration ?? 1500,
                    speed: options?.speed ?? 0.2,
                    zoom: options?.zoom ?? 18,
                });
            }
        },
        [map]
    );

    return { flyTo };
};
