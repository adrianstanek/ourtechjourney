/// <reference types="node" />

import Jimp from 'jimp';
import localforage from 'localforage';

export const sworker: Worker = self as unknown as Worker;

interface IInput {
    file: File;
    mediaId: string;
}

sworker.addEventListener('message', (e: MessageEvent<IInput>) => {
    void (async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const file: File = e.data.file;
            const mediaId: string = e.data.mediaId;

            const mediaDb = localforage.createInstance({
                name: 'media',
                version: 4,
            });

            const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

            // Get Jimp Image
            const buffer: Buffer = Buffer.from(arrayBuffer);
            const image = await Jimp.read(buffer);

            // Convert to base64
            image.getBase64(image.getMIME(), async (err, base64) => {
                if (err) {
                    console.error(err);
                    return;
                }

                // Store in mediaDb
                await mediaDb.setItem(mediaId, base64).then(() => {
                    // Post Message IMediaResponse data to onProcess function
                    sworker.postMessage({
                        mediaData: {
                            mediaId: mediaId,
                            height: image.getHeight(),
                            width: image.getWidth(),
                            mimeType: image.getMIME(),
                        },
                    });
                });
            });
        } catch (error) {
            console.error(error);
        }
    })();
});
