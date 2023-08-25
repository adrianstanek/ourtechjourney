import React, { useEffect, useState } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { Marker } from 'react-map-gl';
import { useHasDeviceOrientation } from './hooks/useHasDeviceOrientation';
import { ILngLat } from './interfaces/ILngLat';

export const MeMarkerMB: React.FC = () => {
    const geoPos = useGeolocation();
    const [mePos, setMePos] = useState<ILngLat | null>(null);
    const [rotation, setRotation] = useState(0);

    const hasDeviceOrientation = useHasDeviceOrientation();

    useEffect(() => {
        if (geoPos.accuracy && geoPos.latitude && geoPos.longitude) {
            setMePos({
                latitude: geoPos.latitude,
                longitude: geoPos.longitude,
            });
        }
    }, [geoPos]);

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

    const triangleStyle: React.CSSProperties = {
        transform: `rotate(${rotation - 90}deg) translate(16px)`,
        position: 'absolute',
        top: '50%',
        left: '50%',
        transformOrigin: 'center',
        width: '12px', // Adjust based on the size of the triangle
        height: '12px', // Adjust based on the size of the triangle
        marginLeft: '-6px', // Half of width
        marginTop: '-6px', // Half of height
    };

    return (
        <>
            {mePos && (
                <Marker longitude={mePos.longitude} latitude={mePos.latitude}>
                    <figure className="relative aspect-[1/1] h-4 rounded-full bg-blue-500 ring-1 ring-blue-300 ring-offset-2 ring-offset-white">
                        <div className="aspect-[1/1] h-4 animate-ping rounded-full bg-blue-700 duration-1000" />

                        {/* This is the Triangle */}
                        {hasDeviceOrientation && (
                            <div style={triangleStyle}>
                                <img
                                    className="rotate-[91deg] transform"
                                    src="/assets/icons/geoLocations/noun-triangle-6011603-12B0FB.svg"
                                    alt="pointer"
                                />
                            </div>
                        )}
                    </figure>
                </Marker>
            )}
        </>
    );
};
