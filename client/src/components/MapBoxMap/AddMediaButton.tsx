import React, { useCallback, useRef } from 'react';
import { Button } from '../Buttons/Button';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { useUploader } from '../../hooks/useUploader';
import { useMoments } from '../../hooks/storage/useMoments';
import { useRecoilValue } from 'recoil';
import { getSelectedMoment } from '../../recoil/appState';
import { IMedia, MimeType } from '../../interfaces/Media.interfaces';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/pro-duotone-svg-icons';

interface IAddMediaButton {}

export const AddMediaButton: React.FC<IAddMediaButton> = () => {
    const { updateMoment } = useMoments();
    const { uploadMediaAsset } = useUploader();
    const moment = useRecoilValue(getSelectedMoment);

    const selectedMoment = useRecoilValue(getSelectedMoment);

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

    const preparePhoto = useCallback(
        (file: File) => {
            // TODO REthink if the fileProcessed should be transfered here because of performance
            void uploadMediaAsset(file, (fileProcessed, mediaData) => {
                // eslint-disable-next-line no-console
                console.log('uploaded', fileProcessed);

                // eslint-disable-next-line no-console
                console.log('result mediaId:', mediaData);

                const media: IMedia[] = [...(selectedMoment?.media ?? [])];

                media.push({
                    id: mediaData.mediaId,
                    mediaId: mediaData.mediaId,
                    height: mediaData.height,
                    width: mediaData.width,
                    mimeType: mediaData.mimeType as MimeType,
                    alt: '',
                } as IMedia);

                if (selectedMoment) {
                    const updatedMoment: IMoment = { ...selectedMoment, media };

                    void updateMoment(updatedMoment);
                }

                return true;
            });
        },
        [selectedMoment, updateMoment, uploadMediaAsset]
    );

    return (
        <div className="relative flex w-full flex-row items-center gap-4">
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
                        if (e.target.files && e.target.files[0]) {
                            const file = e.target.files[0];
                            void preparePhoto(file);
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
                            void preparePhoto(file);
                        }
                    }}
                />
            </div>
        </div>
    );
};
