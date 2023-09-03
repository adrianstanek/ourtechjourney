/// <reference types="node" />

import Jimp from 'jimp';
import localforage from 'localforage';
import { nanoid } from 'nanoid';
import JPEG from 'jpeg-js';

export const sworker: Worker = self as unknown as Worker;

interface IInput {
    file: File;
    mediaId: string;
}

export interface IImageProcessorResponse {
    original: {
        mediaId: string;
        height: number;
        width: number;
        mimeType: string;
    };
    image: {
        mediaId: string;
        height: number;
        width: number;
        mimeType: string;
    };
    thumbnail: {
        mediaId: string;
        height: number;
        width: number;
        mimeType: string;
    };
}

Jimp.decoders['image/jpeg'] = (data: Buffer) => JPEG.decode(data, { maxMemoryUsageInMB: 5000 });

sworker.addEventListener('message', (e: MessageEvent<IInput>) => {
    void (async () => {
        try {
            const maxWidth = Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_WIDTH) ?? 0;
            const maxHeight = Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_WIDTH) ?? 0;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const file: File = e.data.file;
            const imageId: string = e.data.mediaId;
            const originalId: string = nanoid();
            const thumbnailId: string = nanoid();

            const mediaDb = localforage.createInstance({
                name: 'media',
                version: 4,
            });

            const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

            // Get Jimp Image
            const buffer: Buffer = Buffer.from(arrayBuffer);

            // Save the original Image
            const originalImage = await Jimp.read(buffer);

            // This is the actual Image used later
            const image = originalImage.clone();

            // Reduce Quality
            image.quality(Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_QUALITY) * 90);

            // Resize if too large
            if (image.bitmap.width > maxWidth || image.bitmap.height > maxHeight) {
                // eslint-disable-next-line no-console
                console.log(`Downsampling image to ${maxWidth} px ...`);

                if (image.bitmap.width > maxWidth && maxWidth > 0)
                    image.resize(maxWidth, Jimp.AUTO);
                if (image.bitmap.height > maxHeight && maxHeight > 0)
                    image.resize(Jimp.AUTO, maxHeight);
            }

            // This is the thumbnail
            const thumbnailImage = image.clone();

            const base64Thumbnail = await thumbnailImage.getBase64Async(thumbnailImage.getMIME());
            const base64Original = await originalImage.getBase64Async(originalImage.getMIME());

            // TODO Error Handling
            await mediaDb.setItem(thumbnailId, base64Thumbnail);
            await mediaDb.setItem(originalId, base64Original);

            // Convert to base64
            image.getBase64(image.getMIME(), async (err, base64) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Store in mediaDb
                await mediaDb.setItem(imageId, base64).then(() => {
                    const newMediaData: IImageProcessorResponse = {
                        image: {
                            mediaId: imageId,
                            height: image.getHeight(),
                            width: image.getWidth(),
                            mimeType: image.getMIME(),
                        },
                        thumbnail: {
                            mediaId: thumbnailId,
                            height: thumbnailImage.getHeight(),
                            width: thumbnailImage.getWidth(),
                            mimeType: thumbnailImage.getMIME(),
                        },
                        original: {
                            mediaId: originalId,
                            height: originalImage.getHeight(),
                            width: originalImage.getWidth(),
                            mimeType: originalImage.getMIME(),
                        },
                    };

                    // Post Message IMediaResponse data to onProcess function
                    sworker.postMessage({
                        mediaData: newMediaData,
                    });
                });
            });
        } catch (error) {
            console.error(error);
        }
    })();
});
