import React, { useCallback, useRef } from 'react';
import { Button } from '../Buttons/Button';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { usePrepareForUpload } from '../../hooks/usePrepareForUpload';

export interface IAddMediaBox {
    moment: IMoment;
}

export const AddMediaBox: React.FC<IAddMediaBox> = (props) => {
    const { moment } = props;

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
        <div className="relative flex aspect-[1/1] w-full flex-col items-center justify-center gap-4 border-4 border-dotted border-primary bg-primary-light/20">
            <button onClick={openCamera}>
                <img
                    src="/assets/icons/noun-photo-6015903-527970.svg"
                    alt="camera"
                    className="h-24"
                />
            </button>
            <Button onClick={upload} color="primary">
                Hochladen
            </Button>

            <div className="hidden">
                <input
                    type="file"
                    accept="image/jpeg"
                    capture="environment"
                    ref={captureRef}
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
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
                        if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            void prepareAndUploadPhoto(file, moment);
                        }
                    }}
                />
            </div>
        </div>
    );
};
