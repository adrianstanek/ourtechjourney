import React, { useEffect, useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import { MeMarkerMB } from './MeMarkerMB';
import useGeolocation from '../../hooks/useGeolocation';
import { homePosition } from '../../positions/positions';
import { CurrentPositionButton } from './CurrentPositionButton';

export interface IMapBoxMap {
    longitude: number;
    latitude: number;
}

export const MapBoxMap: React.FC<IMapBoxMap> = (props) => {
    const { latitude, longitude } = props;

    const mapBoxPK = process.env.NEXT_PUBLIC_MAPBOX_PK ?? null;

    const { latitude: geoLatitude, longitude: geoLongitude, accuracy } = useGeolocation();

    const [currentPosition, setCurrentPosition] = useState(false);

    const [latLng, setLatLng] = useState({
        latitude: homePosition.latitude,
        longitude: homePosition.longitude,
    });

    useEffect(() => {
        if (accuracy && !currentPosition && geoLatitude && geoLongitude) {
            setCurrentPosition(true);
            setLatLng({
                latitude: geoLatitude,
                longitude: geoLongitude,
            });
        }
    }, [accuracy, currentPosition, geoLatitude, geoLongitude, latitude, longitude]);

    return (
        <>
            {mapBoxPK && (
                <Map
                    mapboxAccessToken={mapBoxPK}
                    projection={{
                        name: 'globe',
                    }}
                    initialViewState={{
                        latitude: latitude ?? latLng.latitude,
                        longitude: longitude ?? latLng.longitude,
                        zoom: 14,
                    }}
                    style={{ width: '100%', height: '100%' }}
                    // mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
                    mapStyle="mapbox://styles/mapbox/outdoors-v12"
                >
                    <MeMarkerMB />
                    <NavigationControl />
                    <CurrentPositionButton />
                </Map>
            )}
        </>
    );
};
