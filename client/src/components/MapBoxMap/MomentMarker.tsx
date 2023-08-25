import React, { useCallback, useMemo } from 'react';
import { Marker } from 'react-map-gl';
import { IMoment } from '../../interfaces/Moment.interfaces';
import Image from 'next/image';
import { IMedia } from '../../interfaces/Media.interfaces';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment } from '../../recoil/appState';

interface IMomentMarker {
    moment: IMoment;
}

export const MomentMarker: React.FC<IMomentMarker> = (props) => {
    const { moment } = props;

    const setAppState = useSetRecoilState(appStateRecoil);
    const selectedMoment = useRecoilValue(getSelectedMoment);

    const heroImage = useMemo(() => {
        if (moment.media.length === 0) return null;

        return moment.media[0] as IMedia;
    }, [moment.media]);

    const isSelected = useMemo(() => {
        return selectedMoment && selectedMoment.id === moment.id;
    }, [moment.id, selectedMoment]);

    const size = useMemo(() => {
        return isSelected
            ? 'h-12 ring-blue-500 ring-offset-white'
            : 'h-6 ring-primary-light ring-offset-white';
    }, [isSelected]);

    const click = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, selectedMoment: moment };
        });
    }, [moment, setAppState]);

    return (
        <>
            {moment.latitude && moment.longitude && (
                <Marker longitude={moment.longitude} latitude={moment.latitude}>
                    <button
                        onClick={click}
                        className={`relative aspect-[1/1] rounded-full bg-neutral-200 ring-1 ring-offset-2  transition-all ${size}`}
                    >
                        {heroImage && heroImage.url && (
                            <figure className="relative flex aspect-[1/1] h-full w-full overflow-hidden rounded-full">
                                <Image
                                    className="h-full w-full object-cover"
                                    src={heroImage.url}
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
                                    src={
                                        '/assets/icons/geolocations/noun-landscape-1999043-E4F9F5.svg'
                                    }
                                    alt={'Photo Placeholder'}
                                />
                            </figure>
                        )}
                    </button>
                </Marker>
            )}
        </>
    );
};
