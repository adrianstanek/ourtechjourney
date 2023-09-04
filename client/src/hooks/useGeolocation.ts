import { useState, useEffect } from 'react';

interface GeoLocationState {
    latitude: number | null;
    longitude: number | null;
    altitude?: number | null;
    accuracy: number | null;
    error: string | null;
}

const useGeoLocation = (): GeoLocationState => {
    const [location, setLocation] = useState<GeoLocationState>({
        latitude: null,
        longitude: null,
        altitude: null,
        accuracy: null,
        error: null,
    });

    const handleSuccess = (position: GeolocationPosition) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            altitude: position.coords.altitude,
            accuracy: position.coords.accuracy,
            error: null,
        });
    };

    const handleError = (error: GeolocationPositionError) => {
        setLocation({
            latitude: null,
            longitude: null,
            altitude: null,
            accuracy: null,
            error: error.message,
        });
    };

    // https://w3c.github.io/geolocation-api/#dom-positionoptions-enablehighaccuracy
    useEffect(() => {
        if (navigator.geolocation) {
            const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError, {
                enableHighAccuracy: true,
                timeout: 5000,
                maximumAge: 5000,
            });

            // // eslint-disable-next-line no-console
            // console.log('WATCHER update', watcher);

            return () => {
                // // eslint-disable-next-line no-console
                // console.log('CLEAR WATCHER');
                navigator.geolocation.clearWatch(watcher);
            };
        } else {
            setLocation((state) => ({
                ...state,
                error: 'Geolocation is not supported by this browser',
            }));
        }
    }, []);

    return location;
};

export default useGeoLocation;
