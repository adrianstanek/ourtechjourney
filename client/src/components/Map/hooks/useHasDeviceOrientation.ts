import { useState, useEffect } from 'react';
export const useHasDeviceOrientation = () => {
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        // Check if the 'deviceorientation' event name exists in the window
        if ('ondeviceorientation' in window) {
            const handler = () => {
                setIsAvailable(true);
                window.removeEventListener('deviceorientation', handler);
            };
            window.addEventListener('deviceorientation', handler);

            // Clean up
            return () => window.removeEventListener('deviceorientation', handler);
        }
    }, []);

    return isAvailable;
};
