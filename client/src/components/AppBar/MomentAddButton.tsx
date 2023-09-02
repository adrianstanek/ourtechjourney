import React, { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getPlaceMode } from '../../recoil/appState';

interface IMomentAddButton {}

export const MomentAddButton: React.FC<IMomentAddButton> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);

    const placeMode = useRecoilValue(getPlaceMode);

    const togglePlaceMode = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, placeMode: !currVal.placeMode };
        });
    }, [setAppState]);

    const styles = useMemo(() => {
        return placeMode ? 'bg-tertiary scale-125' : 'bg-primary-dark scale-100';
    }, [placeMode]);

    return (
        <>
            <button
                className={`relative -top-2 flex aspect-[1/1] h-8 items-center justify-center rounded-full text-secondary ring-2 ring-offset-2 ring-offset-white transition-all focus:outline-0 focus:ring disabled:opacity-30 ${styles}`}
                onClick={togglePlaceMode}
                id="newMomentButton"
                role="button"
                aria-label="Create new Moment"
            >
                <img
                    // src="/assets/icons/noun-add-4934435-E4F9F5.svg"
                    src="/assets/icons/noun-button-1999849-E4F9F5.svg"
                    className={`h-6 ${placeMode ? 'animate-pulse' : ''} transition-all`}
                    alt="Create a Moment"
                />
            </button>
        </>
    );
};
