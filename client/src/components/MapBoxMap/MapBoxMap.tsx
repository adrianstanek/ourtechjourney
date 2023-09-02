import React, { useCallback, useEffect, useRef, useState } from 'react';
import Map, { NavigationControl } from 'react-map-gl';
import { MeMarkerMB } from './MeMarkerMB';
import useGeolocation from '../../hooks/useGeolocation';
import { homePosition } from '../../positions/positions';
import { CurrentPositionButton } from './CurrentPositionButton';
import { StoryRenderer } from './StoryRenderer';
import { MomentDetails } from './MomentDetails';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getPlaceMode, getSelectedMoment } from '../../recoil/appState';
import { useStories } from '../../hooks/storage/useStories';
import { MomentsRenderer } from './MomentsRenderer';
import { StoryCloser } from '../Stories/StoryCloser';
import { FlyToStory } from './FlyToStory';
import { StoryConnectorRenderer } from './StoryConnectorRenderer';
import { useMoments } from '../../hooks/storage/useMoments';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import { IMoment } from '../../interfaces/Moment.interfaces';

export interface IMapBoxMap {
    longitude: number;
    latitude: number;
}

interface IMapBoxEvent {
    lngLat: {
        lng: number;
        lat: number;
    };
}

export const MapBoxMap: React.FC<IMapBoxMap> = (props) => {
    const { latitude, longitude } = props;

    const placeMode = useRecoilValue(getPlaceMode);

    const { currentStory } = useStories();

    const { createMoment } = useMoments();

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
        // TODO still necessary
        if (accuracy && !currentPosition && geoLatitude && geoLongitude) {
            setCurrentPosition(true);
            setLatLng({
                latitude: geoLatitude,
                longitude: geoLongitude,
            });
        }
    }, [accuracy, currentPosition, geoLatitude, geoLongitude, latitude, longitude]);

    const holdTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);

    const handleMouseDown = useCallback(
        (event: IMapBoxEvent) => {
            if (sessionStorage.getItem('isDragging') !== null) return undefined;

            setAppState((currVal) => {
                return { ...currVal, selectedMoment: null };
            });

            // Place a new marker; this should be toggled in MomentAddButton.tsx
            if (placeMode) {
                const momentId = nanoid();

                const order = currentStory?.moments.length ?? 0;

                const newMoment = {
                    id: momentId,
                    media: [],
                    longitude: event.lngLat.lng,
                    latitude: event.lngLat.lat,
                    label: 'Neuer Moment',
                    type: 'vista',
                    created: dayjs().toISOString(),
                    parentStory: currentStory?.id ?? null,
                    description: '',
                    order: order,
                } as IMoment;

                void createMoment(newMoment);

                setAppState((currVal) => {
                    return { ...currVal, placeMode: false };
                });

                // Off the place mode
                setTimeout(() => {
                    setAppState((currVal) => {
                        return { ...currVal, selectedMoment: newMoment };
                    });
                }, 250);
            }

            holdTimeoutRef.current = setTimeout(() => {
                if (sessionStorage.getItem('isDragging') !== null) return undefined;

                // Trigger your hold action here
                // eslint-disable-next-line no-console,@typescript-eslint/no-unsafe-member-access
                console.log('Map was held.', event.lngLat);

                // TODO Removed because it was a bad UX
            }, 1000); // 1000ms (1s)
        },
        [createMoment, currentStory?.id, currentStory?.moments.length, placeMode, setAppState]
    );

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
