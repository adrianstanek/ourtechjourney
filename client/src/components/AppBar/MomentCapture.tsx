import React, { useCallback, useRef } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { useSetRecoilState } from 'recoil';
import { appStateRecoil } from '../../recoil/appState';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { useStories } from '../../hooks/storage/useStories';
import { useMoments } from '../../hooks/storage/useMoments';
import { usePrepareForUpload } from '../../hooks/usePrepareForUpload';

interface IMomentCapture {}

export const MomentCapture: React.FC<IMomentCapture> = () => {
    const { accuracy, latitude, longitude } = useGeolocation();

    const { currentStory } = useStories();

    const { prepareAndUploadPhoto } = usePrepareForUpload();

    const { createMoment } = useMoments();

    const setAppState = useSetRecoilState(appStateRecoil);

    const captureRef = useRef<null | HTMLInputElement>(null);

    const capture = useCallback(
        (file: File) => {
            setAppState((currVal) => {
                return { ...currVal, selectedMoment: null };
            });

            const momentId = nanoid();

            const order = currentStory?.moments.length ?? 0;

            const newMoment = {
                id: momentId,
                media: [],
                longitude: longitude,
                latitude: latitude,
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

                // TODO Double timeout callback instead?
                setTimeout(() => {
                    void prepareAndUploadPhoto(file, newMoment);
                }, 550);
            }, 250);
        },
        [
            createMoment,
            currentStory?.id,
            currentStory?.moments.length,
            latitude,
            longitude,
            prepareAndUploadPhoto,
            setAppState,
        ]
    );

    return (
        <>
            <button
                disabled={!accuracy || accuracy > 200}
                className={`relative -top-2  flex aspect-[1/1] h-16 items-center justify-center rounded-full bg-primary-dark text-secondary ring-2 ring-offset-2 ring-offset-white focus:outline-0 focus:ring disabled:opacity-30`}
                onClick={() => {
                    captureRef?.current?.click();
                }}
                id="captureMomentButton"
                role="button"
                aria-label="Capture new Moment"
            >
                <img
                    src="/assets/icons/noun-moment-2700515-E4F9F5.svg"
                    className="h-12"
                    alt="Create a Moment"
                />
            </button>

            <input
                type="file"
                className="hidden"
                accept="image/jpeg"
                capture="environment"
                ref={captureRef}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        void capture(file);
                    }
                }}
            />
        </>
    );
};
