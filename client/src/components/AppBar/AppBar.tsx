import React, { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { appStateRecoil } from '../../recoil/appState';
import { MomentCapture } from './MomentCapture';
import { MomentAddButton } from './MomentAddButton';

export interface IAppBar {}

export const AppBar: React.FC<IAppBar> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);

    const showStories = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, showStories: true };
        });
    }, [setAppState]);

    return (
        <>
            <section className="relative z-20 flex h-16 w-full flex-row items-center justify-center gap-4">
                <MomentCapture />

                <MomentAddButton />

                <button
                    id="showStories"
                    role="button"
                    aria-label="Show my stories"
                    onClick={showStories}
                    className="absolute right-2 top-2 flex aspect-[1/1] h-12 items-center justify-center rounded-full bg-primary-dark text-secondary ring-2 ring-offset-2 ring-offset-white focus:outline-0 focus:ring"
                >
                    <img
                        src="/assets/icons/noun-story-3203471-E4F9F5.svg"
                        className="relative -top-[1px] h-7"
                        alt="stories"
                    />
                </button>
            </section>
        </>
    );
};
