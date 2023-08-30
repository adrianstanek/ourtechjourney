import { useCallback } from 'react';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';
import { useStorage } from './storage/useStorage';
import Rotator from 'exif-auto-rotate';

export interface IUploaderResponse {
    mediaId: string;
    width: number;
    height: number;
    mimeType: string;
}

export const useUploader = () => {
    const { mediaDb } = useStorage();

    const uploadMediaAsset = useCallback(
        async (file: File, onProcess: (fileProcessed: File) => boolean) => {
            const mediaId = nanoid();

            // Remove Rotation
            const imageRotationRemoved = await Rotator.createRotatedImageAsync(file, 'blob').catch(
                () => false
            );
            const arrayBuffer = await (!imageRotationRemoved
                ? file
                : (imageRotationRemoved as Blob)
            ).arrayBuffer();

            // Get Jimp Image
            // const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const image = await Jimp.read(buffer);

            // Store in mediaDb
            const result = await mediaDb
                .setItem(mediaId, image.getBase64Async(image.getMIME()))
                .then((): IUploaderResponse => {
                    // TODO Error Catching

                    // eslint-disable-next-line no-console
                    console.log('onProcess');
                    onProcess(file);
                    return {
                        mediaId: mediaId,
                        height: image.getHeight(),
                        width: image.getWidth(),
                        mimeType: image.getMIME(),
                    };
                });

            return result;
        },
        [mediaDb]
    );

    return { uploadMediaAsset };
};
