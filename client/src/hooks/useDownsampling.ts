import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface IImageDimesions {
    width: number;
    height: number;
    mime: string;
    arrayBuffer: ArrayBuffer;
}

const useDownsampling = () => {
    const [worker, setWorker] = useState<Worker | null>(null);

    useEffect(() => {
        const newWorker = new Worker('/worker/imageProcessor.js'); // The path should be relative to the public directory
        setWorker(newWorker);

        return () => {
            newWorker.terminate();
        };
    }, []);

    const downsamplePhoto = useCallback(
        async (input: ArrayBuffer | string): Promise<IImageDimesions | null> => {
            if (!worker) return null;

            return new Promise((resolve, reject) => {
                worker.onmessage = (event) => {
                    const downsampledData: IImageDimesions = event.data as IImageDimesions;
                    resolve(downsampledData);
                };

                worker.onerror = (error) => {
                    toast.error(`Error during downsampling: ${error.message ?? 'unknown'}`);
                    reject(error);
                };

                worker.postMessage({ data: input });
            });
        },
        [worker]
    );

    return { downsamplePhoto };
};

export default useDownsampling;
