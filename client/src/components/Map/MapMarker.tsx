import React, { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

interface IMapMarker extends PropsWithChildren<unknown> {
    longitude: number;
    latitude: number;
    size?: 'small' | 'large';
    offsetX?: number;
    offsetY?: number;
}

interface IPixelPosition {
    x: number;
    y: number;
}

const MapMarker: React.FC<IMapMarker> = (props) => {
    const { latitude, longitude, children, size, offsetX, offsetY } = props;

    const map = useMap();

    const markerRef = useRef<HTMLDivElement | null>(null);

    const [pixelPosition, setPixelPosition] = useState<IPixelPosition | null>(null);

    const translatePixelPosition = useCallback(() => {
        if (map) {
            const t = map.latLngToContainerPoint([latitude, longitude]);

            setPixelPosition({
                x: t.x,
                y: t.y,
            });
        }
    }, [latitude, longitude, map]);

    useMapEvents({
        move() {
            translatePixelPosition();
        },
    });

    useEffect(() => {
        translatePixelPosition();
    }, [translatePixelPosition]);

    return (
        <>
            {pixelPosition && markerRef.current !== undefined && (
                <div
                    ref={markerRef}
                    className={`absolute ${
                        size === 'small' ? 'h-8 w-8' : 'h-16 w-16'
                    } z-[500] flex items-center justify-center`}
                    style={{
                        transform: `translate(${
                            pixelPosition?.x -
                            (markerRef?.current?.clientWidth ?? 32) / 2 +
                            (offsetX ?? 0)
                        }px,${
                            pixelPosition?.y -
                            (markerRef?.current?.clientHeight ?? 32) / 2 +
                            (offsetY ?? 0)
                        }px)`,
                    }}
                >
                    {children}
                </div>
            )}
        </>
    );
};

MapMarker.defaultProps = {
    size: 'small',
    offsetX: 0,
    offsetY: 0,
};

export default React.memo(MapMarker);
