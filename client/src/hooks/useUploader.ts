import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useStorage } from './storage/useStorage';
import Jimp from 'jimp';

export interface IUploaderResponse {
    mediaId: string;
    width: number;
    height: number;
    mimeType: string;
}

export const useUploader = () => {
    const { mediaDb } = useStorage();

    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
        const workerNew = new Worker(
            new URL('../workers/imageProcessor.worker.ts', import.meta.url)
            // new URL('../workers/test.worker.ts', import.meta.url)
        );

        setWorker(workerNew);
    }, []);

    const uploadMediaAsset = useCallback(
        (file: File, onProcess: (fileProcessed: File, mediaData: IUploaderResponse) => boolean) => {
            const mediaId = nanoid();

            if (!worker) return undefined;

            worker.postMessage({ file });

            worker.onerror = (e) => {
                console.error(e);
            };

            worker.onmessage = async (e: MessageEvent<{ base64: string }>) => {
                const base64 = e.data.base64;

                // Convert base64 to Jimp object if you need Jimp functionalities
                const image = await Jimp.read(base64);

                // Store in mediaDb
                const result = await mediaDb
                    .setItem(mediaId, base64)
                    .then(() => {
                        // TODO Error Catching
                        onProcess(file, {
                            mediaId: mediaId,
                            height: image.getHeight(),
                            width: image.getWidth(),
                            mimeType: image.getMIME(),
                        });
                    })
                    .catch((err) => {
                        // Handle the error here
                        console.error('An error occurred:', err);
                    });

                return result;
            };
        },
        [mediaDb, worker]
    );

    return { uploadMediaAsset };
};
