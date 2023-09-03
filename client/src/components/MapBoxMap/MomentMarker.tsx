import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Marker, MarkerDragEvent } from 'react-map-gl';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { IMedia } from '../../interfaces/Media.interfaces';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment } from '../../recoil/appState';
import { useStorage } from '../../hooks/storage/useStorage';
import { useMoments } from '../../hooks/storage/useMoments';
import { ImageCustom } from '../ImageCustom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

interface IMomentMarker {
    moment: IMoment;
    inactive?: boolean;
}

export const MomentMarker: React.FC<IMomentMarker> = (props) => {
    const { moment, inactive } = props;

    const { updateMoment, flyToMoment, getMomentHasProcessingMedia } = useMoments();

    const setAppState = useSetRecoilState(appStateRecoil);
    const selectedMoment = useRecoilValue(getSelectedMoment);

    const { mediaDb } = useStorage();

    const [isFocused, setIsFocused] = useState(false);

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

        flyToMoment(moment);
    }, [flyToMoment, moment, setAppState]);

    useEffect(() => {
        if (!isSelected) setIsFocused(false);

        if (isFocused) return undefined;

        if (isSelected) {
            setIsFocused(true);
            flyToMoment(moment);
        }
    }, [flyToMoment, isFocused, isSelected, moment]);

    const activeStyles = useMemo(() => {
        return inactive ? 'opacity-30 ring-1 ' : 'opacity-100 ring-2';
    }, [inactive]);

    const [base64Url, setBase64Url] = useState<string | null>(null);

    useEffect(() => {
        if (base64Url || !heroImage?.thumbnail.mediaId) return undefined;

        void mediaDb.getItem(heroImage?.thumbnail.mediaId).then((value) => {
            setBase64Url(value as string);
        });
    }, [base64Url, heroImage?.thumbnail.mediaId, mediaDb]);

    const onMarkerDragStart = useCallback(() => {
        // event: MarkerDragEvent
        // Implement any logic you need here
        // TODO Hide current Marker; because of flickering
        // TODO Tell state that there's a drag in progress, otherwise a marker will be created
    }, []);

    const onMarkerDrag = useCallback(() => {
        // event: MarkerDragEvent
        // Implement any logic you need here

        sessionStorage.setItem('isDragging', moment.id);
    }, [moment.id]);

    const isProcessing = useMemo(() => {
        return getMomentHasProcessingMedia(moment);
    }, [getMomentHasProcessingMedia, moment]);

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

    const [mediaCount, setMediaCount] = useState(0);
    const [mediaCountBlink, setMediaCountBlink] = useState(false);

    const mediaCountBlinkStyles = useMemo(() => {
        return mediaCountBlink ? 'duration-250 scale-150 opacity-50' : 'scale-100';
    }, [mediaCountBlink]);

    useEffect(() => {
        if (mediaCount !== moment.media.length) {
            setMediaCountBlink(true);

            setTimeout(() => {
                setMediaCountBlink(false);
            }, 500);
        }

        setMediaCount(moment.media.length);
    }, [mediaCount, moment.media.length]);

    const pulseStyles = useMemo(() => {
        return !isSelected ? '' : 'bg-tertiary-light animate-ping';
    }, [isSelected]);

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
                    <div
                        className={`absolute left-0 top-0 aspect-[1/1] w-full rounded-full transition-all ${pulseStyles}`}
                    />
                    <button
                        onClick={click}
                        className={`relative aspect-[1/1] rounded-full bg-neutral-200  ring-offset-2  transition-all ${size} ${activeStyles}`}
                    >
                        {heroImage && base64Url && (
                            <figure className="relative flex aspect-[1/1] h-full w-full overflow-hidden rounded-full">
                                <ImageCustom
                                    className="h-full w-full object-cover"
                                    src={base64Url}
                                    alt={heroImage.alt ?? ''}
                                    height={heroImage.thumbnail.height ?? 100}
                                    width={heroImage.thumbnail.width ?? 100}
                                />
                            </figure>
                        )}

                        {isProcessing && (
                            <figure className="absolute left-0 top-0 z-30 flex aspect-[1/1] h-full w-full items-center justify-center overflow-hidden rounded-full bg-neutral-400">
                                <FontAwesomeIcon
                                    icon={faSync}
                                    className="h-4 animate-spin text-white"
                                />
                            </figure>
                        )}

                        {!heroImage && !isProcessing && (
                            <figure className="relative flex aspect-[1/1] h-full w-full items-center justify-center overflow-hidden rounded-full bg-primary">
                                <img
                                    className="relative flex w-[70%]"
                                    src="/assets/icons/noun-landscape-1999043-E4F9F5.svg"
                                    alt={'Photo Placeholder'}
                                />
                            </figure>
                        )}
                    </button>

                    {/* Count Tag */}
                    {mediaCount > 1 && !inactive && (
                        <div
                            className={`absolute -bottom-[5px] -right-[5px] flex  aspect-[1/1] h-4 w-4  items-center justify-center rounded-full bg-primary p-1  text-[8px] text-white transition-all ${mediaCountBlinkStyles}`}
                        >
                            {mediaCount}
                        </div>
                    )}
                </Marker>
            )}
        </>
    );
};
