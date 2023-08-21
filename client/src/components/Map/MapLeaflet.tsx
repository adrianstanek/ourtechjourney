import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MeMarker } from './MeMarker';
import { MapDebug } from './MapDebug';
import { homePosition } from '../../positions/positions';

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

    // Define max bounds as limit
    // const corner1 = L.latLng(48.300459, 7.668912);
    // const corner2 = L.latLng(48.2007816138456, 7.797442830399354);
    // const bounds = L.latLngBounds(corner1, corner2);
    return (
        <>
            {!noPadding && <div className={'block h-12'}></div>}
            <MapContainer
                center={[lat ?? homePosition.latitude, lng ?? homePosition.longitude]}
                zoom={zoom ?? mapDefaultZoom}
                className={'h-full w-full'}
                // maxBounds={bounds}
                maxZoom={maxZoom ?? 18}
                minZoom={minZoom ?? 12}
            >
                <>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

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
