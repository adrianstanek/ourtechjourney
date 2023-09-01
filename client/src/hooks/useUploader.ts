import { useCallback, useEffect, useState } from 'react';
import { nanoid } from 'nanoid';

export interface IUploaderResponse {
    mediaId: string;
    width: number;
    height: number;
    mimeType: string;
}

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
        (file: File, onProcess: (fileProcessed: File, mediaData: IUploaderResponse) => boolean) => {
            const mediaId = nanoid();

            if (!worker) return undefined;

            worker.postMessage({ file, mediaId });

            worker.onerror = (e) => {
                console.error(e);
            };

            worker.onmessage = (e: MessageEvent<{ mediaData: IUploaderResponse }>) => {
                const mediaResponse = e.data.mediaData;

                // Receives file and mediaResponse
                onProcess(file, mediaResponse);
            };
        },
        [worker]
    );

    return { uploadMediaAsset };
};
