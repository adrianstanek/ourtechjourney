import React, { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getWakeLock } from '../../recoil/appState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import { faBoltSlash } from '@fortawesome/pro-duotone-svg-icons';

interface IWakeLockButton {}

interface WakeLockSentinel extends EventTarget {
    readonly type: 'screen' | 'system';
    readonly released: boolean;
    release(): Promise<void>;
}

interface WakeLock {
    request(type: 'screen' | 'system'): Promise<WakeLockSentinel>;
    release(): Promise<void>;
}

export const WakeLockButton: React.FC<IWakeLockButton> = () => {
    const wakeLock = useRecoilValue(getWakeLock);
    const setAppState = useSetRecoilState(appStateRecoil);

    useEffect(() => {
        let wakeLockSentinel: WakeLockSentinel | null = null;

        const requestWakeLock = async () => {
            try {
                if ('wakeLock' in navigator) {
                    const WakeLock = navigator.wakeLock as WakeLock;
                    wakeLockSentinel = await WakeLock.request('screen');
                    setAppState((currVal) => {
                        return { ...currVal, wakeLock: true };
                    });
                    // eslint-disable-next-line no-console
                    console.log('Wake Lock activated');
                }
            } catch (error) {
                console.error(error);
            }
        };

        const releaseWakeLock = async () => {
            if (wakeLockSentinel) {
                try {
                    await wakeLockSentinel.release();
                    setAppState((currVal) => {
                        return { ...currVal, wakeLock: false };
                    });
                    // eslint-disable-next-line no-console
                    console.log('Wake Lock released');
                } catch (error) {
                    console.error(error);
                }
            }
        };

        if (wakeLock) {
            void requestWakeLock();
        } else {
            void releaseWakeLock();
        }

        return () => {
            void releaseWakeLock();
        };
    }, [setAppState, wakeLock]);

    return (
        <>
            <button
                className="relative flex aspect-[1/1] flex-col items-center justify-center gap-1"
                onClick={() => {
                    setAppState((currVal) => {
                        return { ...currVal, wakeLock: !wakeLock };
                    });
                }}
            >
                <FontAwesomeIcon
                    icon={!wakeLock ? faBoltSlash : faBolt}
                    className="w-6 text-white"
                />
            </button>
        </>
    );
};
