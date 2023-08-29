import React, { useEffect, useRef, useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import { MeMarkerMB } from './MeMarkerMB';
import useGeolocation from '../../hooks/useGeolocation';
import { homePosition } from '../../positions/positions';
import { CurrentPositionButton } from './CurrentPositionButton';
import { StoryRenderer } from './StoryRenderer';
import { MomentDetails } from './MomentDetails';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment } from '../../recoil/appState';
import { useStories } from '../../hooks/storage/useStories';
import { MomentsRenderer } from './MomentsRenderer';
import { StoryCloser } from '../Stories/StoryCloser';
import { FlyToStory } from './FlyToStory';
import { StoryConnectorRenderer } from './StoryConnectorRenderer';

export interface IMapBoxMap {
    longitude: number;
    latitude: number;
}

export const MapBoxMap: React.FC<IMapBoxMap> = (props) => {
    const { latitude, longitude } = props;

    const { currentStory } = useStories();

    const selectedMoment = useRecoilValue(getSelectedMoment);

    const setAppState = useSetRecoilState(appStateRecoil);

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

    const holdTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);

    const handleMouseDown = (event) => {
        setAppState((currVal) => {
            return { ...currVal, selectedMoment: null };
        });

        holdTimeoutRef.current = setTimeout(() => {
            // Trigger your hold action here
            // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-member-access
            console.log('Map was held.', event.lngLat);
        }, 1000); // 1000ms (1s)
    };

    const handleMouseUp = () => {
        if (holdTimeoutRef.current !== null) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            clearTimeout(holdTimeoutRef.current);
        }
    };

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
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleMouseDown}
                    onTouchEnd={handleMouseUp}
                >
                    <MeMarkerMB />
                    <NavigationControl />
                    {selectedMoment === null && <CurrentPositionButton />}
                    {currentStory && <StoryRenderer story={currentStory} />}
                    <MomentsRenderer />
                    <FlyToStory />
                    <StoryConnectorRenderer />
                </Map>
            )}

            <MomentDetails />
            <StoryCloser />
        </>
    );
};
