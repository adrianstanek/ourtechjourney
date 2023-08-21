import { useState, useEffect } from 'react';

interface GeoLocationState {
    latitude: number | null;
    longitude: number | null;
    accuracy: number | null;
    error: string | null;
}

const useGeoLocation = (): GeoLocationState => {
    const [location, setLocation] = useState<GeoLocationState>({
        latitude: null,
        longitude: null,
        accuracy: null,
        error: null,
    });

    const handleSuccess = (position: GeolocationPosition) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            error: null,
        });
    };

    const handleError = (error: GeolocationPositionError) => {
        setLocation({
            latitude: null,
            longitude: null,
            accuracy: null,
            error: error.message,
        });
    };

    useEffect(() => {
        if (navigator.geolocation) {
            const watcher = navigator.geolocation.watchPosition(handleSuccess, handleError);

            return () => {
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
