import { useCallback } from 'react';
import { IMoment } from '../interfaces/Moment.interfaces';

export const useMomentHelper = () => {
    const findMidpoint = useCallback(
        (moments: IMoment[]): { latitude: number; longitude: number } | null => {
            let totalLat = 0;
            let totalLng = 0;
            let count = 0;

            for (const moment of moments) {
                if (moment.latitude !== null && moment.longitude !== null) {
                    totalLat += moment.latitude;
                    totalLng += moment.longitude;
                    count++;
                }
            }

            if (count === 0) {
                return null;
            }

            const averageLat = totalLat / count;
            const averageLng = totalLng / count;

            return {
                latitude: averageLat,
                longitude: averageLng,
            };
        },
        []
    );

    return { findMidpoint };
};
