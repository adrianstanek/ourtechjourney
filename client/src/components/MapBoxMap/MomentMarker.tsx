import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Marker, MarkerDragEvent } from 'react-map-gl';
import { IMoment } from '../../interfaces/Moment.interfaces';
import Image from 'next/image';
import { IMedia } from '../../interfaces/Media.interfaces';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment } from '../../recoil/appState';
import { useStorage } from '../../hooks/storage/useStorage';
import { useMoments } from '../../hooks/storage/useMoments';
import { useFlyToPosition } from './hooks/useFlyToPosition';

interface IMomentMarker {
    moment: IMoment;
    inactive?: boolean;
}

export const MomentMarker: React.FC<IMomentMarker> = (props) => {
    const { moment, inactive } = props;

    const { updateMoment } = useMoments();

    const { flyTo } = useFlyToPosition();

    const setAppState = useSetRecoilState(appStateRecoil);
    const selectedMoment = useRecoilValue(getSelectedMoment);

    const { mediaDb } = useStorage();

    const heroImage = useMemo(() => {
        if (moment.media.length === 0) return null;

        return moment.media[0] as IMedia;
    }, [moment.media]);

    const isSelected = useMemo(() => {
        return selectedMoment && selectedMoment.id === moment.id;
    }, [moment.id, selectedMoment]);

    const size = useMemo(() => {
        return isSelected
            ? 'h-8 ring-blue-500 ring-offset-white'
            : 'h-6 ring-primary-light ring-offset-white';
    }, [isSelected]);

    const click = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, selectedMoment: moment };
        });

        // Target Zoom
        const zoom = 16;

        const referenceFactor = 380;
        const referenceScreenHeight = 660;

        const windowHeight = window.innerHeight;
        // const factor = innerHeight

        let newFactor = (windowHeight / referenceScreenHeight) * referenceFactor;
        if (windowHeight >= 800 && windowHeight < 1000) {
            newFactor += 70;
        } else if (windowHeight >= 1000 && windowHeight < 1200) {
            newFactor += 100;
        } else if (windowHeight >= 1200) {
            newFactor += 190;
        }

        const calculateOffsetLatitude = (latitude: number, zoomUsed: number) => {
            const latOffset = (1 / Math.pow(2, zoomUsed)) * newFactor; // The factor 40 can be adjusted based on your specific needs
            return latitude - latOffset / 4;
        };

        flyTo(calculateOffsetLatitude(moment?.latitude ?? 0, zoom), moment?.longitude ?? 0, {
            zoom: zoom,
            essential: true,
            duration: 500,
            speed: 0.2,
        });
    }, [flyTo, moment, setAppState]);

    const activeStyles = useMemo(() => {
        return inactive ? 'opacity-30 ring-1 ' : 'opacity-100 ring-2';
    }, [inactive]);

    const [base64Url, setBase64Url] = useState<string | null>(null);

    useEffect(() => {
        if (base64Url || !heroImage?.mediaId) return undefined;
        void mediaDb.getItem(heroImage?.mediaId).then((value) => {
            setBase64Url(value as string);
        });
    }, [base64Url, heroImage?.mediaId, mediaDb]);

    const onMarkerDragStart = useCallback((event: MarkerDragEvent) => {
        // Implement any logic you need here
        // TODO Hide current Marker; because of flickering
        // TODO Tell state that there's a drag in progress, otherwise a marker will be created
    }, []);

    const onMarkerDrag = useCallback(
        (event: MarkerDragEvent) => {
            // Implement any logic you need here

            sessionStorage.setItem('isDragging', moment.id);
        },
        [moment.id]
    );

    const onMarkerDragEnd = useCallback(
        (event: MarkerDragEvent) => {
            const longitude = event.lngLat.lng;
            const latitude = event.lngLat.lat;

            if (longitude !== undefined && latitude !== undefined) {
                void updateMoment({
                    ...moment,
                    longitude,
                    latitude,
                } as IMoment).then(() => {
                    // TODO Show current Marker again

                    setTimeout(() => {
                        sessionStorage.removeItem('isDragging');
                    }, 250);
                });
            }
        },
        [moment, updateMoment]
    );

    return (
        <>
            {moment.latitude && moment.longitude && (
                <Marker
                    longitude={moment.longitude}
                    latitude={moment.latitude}
                    draggable
                    onDragStart={onMarkerDragStart}
                    onDrag={onMarkerDrag}
                    onDragEnd={onMarkerDragEnd}
                >
                    <button
                        onClick={click}
                        className={`relative aspect-[1/1] rounded-full bg-neutral-200  ring-offset-2  transition-all ${size} ${activeStyles}`}
                    >
                        {heroImage && base64Url && (
                            <figure className="relative flex aspect-[1/1] h-full w-full overflow-hidden rounded-full">
                                <Image
                                    className="h-full w-full object-cover"
                                    src={base64Url}
                                    alt={heroImage.alt ?? ''}
                                    height={heroImage.height}
                                    width={heroImage.width}
                                />
                            </figure>
                        )}

                        {!heroImage && (
                            <figure className="relative flex aspect-[1/1] h-full w-full items-center justify-center overflow-hidden rounded-full bg-primary">
                                <img
                                    className="relative flex w-[70%]"
                                    src="/assets/icons/noun-landscape-1999043-E4F9F5.svg"
                                    alt={'Photo Placeholder'}
                                />
                            </figure>
                        )}
                    </button>

                    {moment.media.length > 1 && !inactive && (
                        <div className="absolute -bottom-[5px] -right-[5px] flex aspect-[1/1] h-4 w-4 items-center justify-center rounded-full bg-primary p-1 text-[8px] text-white">
                            {moment.media.length}
                        </div>
                    )}
                </Marker>
            )}
        </>
    );
};
