import { useEffect, useState } from 'react';
import { useHasDeviceOrientation } from '../components/MapBoxMap/hooks/useHasDeviceOrientation';

export const useDeviceDirection = () => {
    const hasDeviceOrientation = useHasDeviceOrientation();

    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        if (!hasDeviceOrientation) return undefined;

        const handleOrientation = (event: DeviceOrientationEvent) => {
            const alpha = event.alpha || 0; // Compass direction in degrees from North
            setRotation(alpha);
        };

        window.addEventListener('deviceorientation', handleOrientation);

        return () => {
            window.removeEventListener('deviceorientation', handleOrientation);
        };
    }, [hasDeviceOrientation]);

    return { rotation, hasDeviceOrientation };
};
