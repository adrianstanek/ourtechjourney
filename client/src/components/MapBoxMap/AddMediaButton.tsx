import React, { useCallback, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { getSelectedMoment } from '../../recoil/appState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/pro-duotone-svg-icons';
import { usePrepareForUpload } from '../../hooks/usePrepareForUpload';

interface IAddMediaButton {}

export const AddMediaButton: React.FC<IAddMediaButton> = () => {
    const moment = useRecoilValue(getSelectedMoment);

    const { prepareAndUploadPhoto } = usePrepareForUpload();

    const uploadRef = useRef<null | HTMLInputElement>(null);
    const captureRef = useRef<null | HTMLInputElement>(null);

    const openCamera = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log(moment);
        captureRef.current?.click();
    }, [moment]);

    const upload = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log(moment);
        uploadRef.current?.click();
    }, [moment]);

    return (
        <div className="relative flex w-full flex-row items-center justify-center gap-4">
            <button onClick={openCamera}>
                <img
                    src="/assets/icons/noun-photo-6015903-527970.svg"
                    alt="camera"
                    className="h-6"
                />
            </button>
            <button onClick={upload}>
                <FontAwesomeIcon icon={faUpload} className="relative top-[1px] h-5 text-primary" />
            </button>

            <div className="hidden">
                <input
                    type="file"
                    accept="image/jpeg"
                    capture="environment"
                    ref={captureRef}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0] && moment) {
                            const file = e.target.files[0];
                            void prepareAndUploadPhoto(file, moment);
                        }
                    }}
                />

                <input
                    type="file"
                    accept="image/jpeg"
                    ref={uploadRef}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0] && moment) {
                            const file = e.target.files[0];
                            void prepareAndUploadPhoto(file, moment);
                        }
                    }}
                />
            </div>
        </div>
    );
};
