import { useCallback } from 'react';
import { useStorage } from './storage/useStorage';

export const useMediaAsset = () => {
    const { mediaDb } = useStorage();

    const getMediaAsset = useCallback(
        async (mediaId: string) => {
            const result: string | null = await mediaDb.getItem(mediaId);
            return result;
        },
        [mediaDb]
    );

    return { getMediaAsset };
};
