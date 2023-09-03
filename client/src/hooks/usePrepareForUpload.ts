import { useCallback } from 'react';
import { nanoid } from 'nanoid';
import { IMedia, MimeType } from '../interfaces/Media.interfaces';
import { IMoment } from '../interfaces/Moment.interfaces';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getMomentsProcessing, getSelectedMoment } from '../recoil/appState';
import { useUploader } from './useUploader';
import { useMoments } from './storage/useMoments';

export const usePrepareForUpload = () => {
    const { uploadMediaAsset } = useUploader();

    const { updateMoment } = useMoments();

    const selectedMoment = useRecoilValue(getSelectedMoment);

    const setAppState = useSetRecoilState(appStateRecoil);
    const momentsProcessing = useRecoilValue(getMomentsProcessing);

    const prepareAndUploadPhoto = useCallback(
        (file: File, moment: IMoment) => {
            const mediaId = nanoid();

            // Add Moment to processing state
            if (moment) {
                const momentsProcessingNew: string[] = [...momentsProcessing, moment.id ?? ''];
                setAppState((currVal) => {
                    return { ...currVal, momentsProcessing: momentsProcessingNew };
                });
            }

            // TODO Rethink if the fileProcessed should be transfered here because of performance
            void uploadMediaAsset(
                file,
                (fileProcessed, mediaData) => {
                    // eslint-disable-next-line no-console
                    console.log('uploaded', fileProcessed);

                    // eslint-disable-next-line no-console
                    console.log('result mediaId:', mediaData);

                    const media: IMedia[] = [...(selectedMoment?.media ?? [])];

                    media.push({
                        mediaId: mediaData.image.mediaId,
                        image: {
                            mediaId: mediaData.image.mediaId,
                            height: mediaData.image.height,
                            width: mediaData.image.width,
                            mimeType: mediaData.image.mimeType as MimeType,
                        },
                        thumbnail: {
                            mediaId: mediaData.thumbnail.mediaId,
                            height: mediaData.thumbnail.height,
                            width: mediaData.thumbnail.width,
                            mimeType: mediaData.thumbnail.mimeType as MimeType,
                        },
                        original: {
                            mediaId: mediaData.original.mediaId,
                            height: mediaData.original.height,
                            width: mediaData.original.width,
                            mimeType: mediaData.original.mimeType as MimeType,
                        },
                        alt: '',
                    } as IMedia);

                    if (moment) {
                        // Remove processing
                        setAppState((currVal) => {
                            const momentsProcessingCurrent = [...currVal.momentsProcessing];

                            momentsProcessingCurrent.splice(
                                momentsProcessingCurrent.indexOf(moment.id ?? ''),
                                1
                            );

                            return { ...currVal, momentsProcessing: momentsProcessingCurrent };
                        });
                    }

                    if (selectedMoment) {
                        const updatedMoment: IMoment = { ...selectedMoment, media };

                        void updateMoment(updatedMoment);
                    }

                    return true;
                },
                mediaId
            );
        },
        [momentsProcessing, selectedMoment, setAppState, updateMoment, uploadMediaAsset]
    );

    return {
        prepareAndUploadPhoto,
    };
};
