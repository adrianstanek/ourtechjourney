import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { IImageProcessorResponse } from '../workers/imageProcessor.worker';

export const useUploader = () => {
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
        const workerNew = new Worker(
            new URL('../workers/imageProcessor.worker.ts', import.meta.url)
            // new URL('../workers/test.worker.ts', import.meta.url)
        );

        setWorker(workerNew);
    }, []);

    const uploadMediaAsset = useCallback(
        (
            file: File,
            onProcess: (fileProcessed: File, mediaData: IImageProcessorResponse) => unknown,
            mediaId?: string | undefined
        ) => {
            const mediaIdUsed = mediaId ?? nanoid();

            if (!worker) return undefined;

            worker.postMessage({ file, mediaId: mediaIdUsed });

            worker.onerror = (e) => {
                console.error(e);
            };

            worker.onmessage = (e: MessageEvent<{ mediaData: IImageProcessorResponse }>) => {
                const mediaResponse = e.data.mediaData;

                // Receives file and mediaResponse
                onProcess(file, mediaResponse);
            };
        },
        [worker]
    );

    return { uploadMediaAsset };
};
