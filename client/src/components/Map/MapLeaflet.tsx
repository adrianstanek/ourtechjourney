import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MeMarker } from './MeMarker';
import { MapDebug } from './MapDebug';
import { homePosition } from '../../positions/positions';
import useGeolocation from '../../hooks/useGeolocation';
import { CurrentPositionButton } from './CurrentPositionButton';

export interface ILngLat {
    longitude: number;
    latitude: number;
}

export const mapDefaultZoom = 18;

interface IMapLeaflet {
    lat?: number | null;
    lng?: number | null;
    zoom?: number | null;
    noPadding?: boolean;
    maxZoom?: number;
    minZoom?: number;
}

const MapLeaflet: React.FC<IMapLeaflet> = (props) => {
    const { lng, lat, zoom, noPadding, maxZoom, minZoom } = props;

    const { latitude, longitude, accuracy } = useGeolocation();

    const [currentPosition, setCurrentPosition] = useState(false);

    // Define max bounds as limit
    // const corner1 = L.latLng(48.300459, 7.668912);
    // const corner2 = L.latLng(48.2007816138456, 7.797442830399354);
    // const bounds = L.latLngBounds(corner1, corner2);

    const [latLng, setLatLng] = useState({
        latitude: homePosition.latitude,
        longitude: homePosition.longitude,
    });

    useEffect(() => {
        if (accuracy && !currentPosition && latitude && longitude) {
            setCurrentPosition(true);
            setLatLng({
                latitude: latitude,
                longitude: longitude,
            });
        }
    }, [accuracy, currentPosition, latitude, longitude]);

    return (
        <>
            {!noPadding && <div className={'block h-12'}></div>}
            <MapContainer
                center={[lat ?? latLng.latitude, lng ?? latLng.longitude]}
                zoom={zoom ?? mapDefaultZoom}
                className={'h-full w-full'}
                // maxBounds={bounds}
                maxZoom={maxZoom ?? 18}
                minZoom={minZoom ?? 12}
            >
                <>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                    <CurrentPositionButton />

                    <MapDebug active={false} />

                    <MeMarker />
                </>
            </MapContainer>
        </>
    );
};

MapLeaflet.defaultProps = {
    noPadding: false,
};

export default React.memo(MapLeaflet);
