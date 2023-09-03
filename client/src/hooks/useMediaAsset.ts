import { useCallback } from 'react';
import { useStorage } from './storage/useStorage';
import { IMoment } from '../interfaces/Moment.interfaces';
import { useMoments } from './storage/useMoments';
import { IMedia } from '../interfaces/Media.interfaces';

export const useMediaAsset = () => {
    const { mediaDb } = useStorage();

    const { updateMoment } = useMoments();

    const getMediaAsset = useCallback(
        async (mediaId: string) => {
            const result: string | null = await mediaDb.getItem(mediaId);
            return result;
        },
        [mediaDb]
    );

    const moveMediaToTrash = useCallback(
        async (moment: IMoment, mediaId: string) => {
            const mediaIndex = moment.media.findIndex((item) => item.mediaId === mediaId);

            if (mediaIndex !== -1) {
                const newMediaArray = [...moment.media];
                const newMedia = { ...(newMediaArray[mediaIndex] as IMedia) };

                newMedia.trash = !newMedia.trash;
                newMediaArray[mediaIndex] = newMedia;

                const newMoment = { ...moment, media: newMediaArray };

                await updateMoment(newMoment);
            }
        },
        [updateMoment]
    );

    // TODO
    const removeMediaFinal = useCallback(() => {}, []);

    return { getMediaAsset, moveMediaToTrash, removeMediaFinal };
};
