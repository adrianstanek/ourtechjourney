/// <reference types="node" />

import Jimp from 'jimp';

export const sworker: Worker = self as unknown as Worker;

sworker.addEventListener('message', (e) => {
    void (async () => {
        try {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            const file: File = e.data.file as File;

            const arrayBuffer: ArrayBuffer = await file.arrayBuffer();

            // Get Jimp Image
            const buffer: Buffer = Buffer.from(arrayBuffer);
            const image = await Jimp.read(buffer);

            // sworker.postMessage({ image });

            image.getBase64(image.getMIME(), (err, base64) => {
                if (err) {
                    console.error(err);
                    return;
                }

                sworker.postMessage({ base64 });
            });
        } catch (error) {
            console.error(error);
        }
    })();
});
