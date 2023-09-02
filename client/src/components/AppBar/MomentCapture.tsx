import React, { useRef } from 'react';
import useGeolocation from '../../hooks/useGeolocation';
import { useMomentCreate } from '../../hooks/useMomentCreate';

interface IMomentCapture {}

export const MomentCapture: React.FC<IMomentCapture> = () => {
    const { accuracy } = useGeolocation();
    const { saveMoment } = useMomentCreate();

    const captureRef = useRef<null | HTMLInputElement>(null);

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
                        void saveMoment(file);
                    }
                }}
            />
        </>
    );
};
