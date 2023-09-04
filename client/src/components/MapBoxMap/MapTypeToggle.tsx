import React, { useCallback, useMemo } from 'react';
import { appStateRecoil, getMapType } from '../../recoil/appState';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import ExportedImage from 'next-image-export-optimizer';

interface IMapTypeToggle {}

export const MapTypeToggle: React.FC<IMapTypeToggle> = () => {
    const mapType = useRecoilValue(getMapType);

    const setAppState = useSetRecoilState(appStateRecoil);

    const src = useMemo((): HTMLImageElement['src'] => {
        return mapType === 'satellite'
            ? '/assets/map/mapTypeOutdoors.png'
            : '/assets/map/mapTypeSatellite.png';
    }, [mapType]);

    const toggle = useCallback(() => {
        setAppState((currVal) => {
            return {
                ...currVal,
                mapType: currVal.mapType === 'satellite' ? 'outdoors' : 'satellite',
            };
        });
    }, [setAppState]);

    return (
        <>
            <button
                className="absolute bottom-32 right-2 flex aspect-[1/1] h-12 w-12 flex-row gap-1 border-2 border-white focus:outline-0 focus:ring-2"
                onClick={toggle}
            >
                <ExportedImage
                    src={src}
                    alt=""
                    className="relative h-full w-full object-cover"
                    width={100}
                    height={100}
                />
            </button>
        </>
    );
};
