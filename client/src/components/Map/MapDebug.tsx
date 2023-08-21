import React from 'react';
import { useMap, useMapEvents } from 'react-leaflet';

interface IMapDebug {
    active: boolean;
}

export const MapDebug: React.FC<IMapDebug> = (props) => {
    const { active } = props;

    const map = useMap();

    useMapEvents({
        move() {
            if (!active) return null;

            // eslint-disable-next-line no-console
            console.log(map.getCenter(), map.getZoom());
        },
        click(e) {
            // eslint-disable-next-line no-console
            console.log(e);
        },
    });

    return <></>;
};
