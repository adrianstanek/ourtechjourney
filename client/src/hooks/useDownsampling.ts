import { useCallback } from 'react';
import Jimp from 'jimp';
import { toast } from 'react-toastify';

export interface IImageDimesions {
    width: number;
    height: number;
    mime: string;
    arrayBuffer: () => Promise<ArrayBuffer>;
}

const useDownsampling = () => {
    const downsamplePhoto = useCallback(async (input: ArrayBuffer | string) => {
        const maxWidth = Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_WIDTH) ?? 0;
        const maxHeight = Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_WIDTH) ?? 0;

        if (!input) return false;

        const image = await Jimp.read(input as Buffer).catch((e: Error) => {
            toast.error(`Fehler beim runterrechnen des Bildes: ${e.message ?? 'unbekannt'}`);
        });

        if (!image) return false;

        const imageLoaded = image as Jimp;

        // Reduce Quality
        imageLoaded.quality(Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_QUALITY) * 90);

        // Resize if too large
        if (imageLoaded.bitmap.width > maxWidth || imageLoaded.bitmap.height > maxHeight) {
            // eslint-disable-next-line no-console
            console.log(`Downsampling image to ${maxWidth} px ...`);

            if (imageLoaded.bitmap.width > maxWidth && maxWidth > 0)
                imageLoaded.resize(maxWidth, Jimp.AUTO);
            if (imageLoaded.bitmap.height > maxHeight && maxHeight > 0)
                imageLoaded.resize(Jimp.AUTO, maxHeight);
        }

        return {
            width: imageLoaded.bitmap.width,
            height: imageLoaded.bitmap.height,
            arrayBuffer: () =>
                imageLoaded.getBufferAsync(imageLoaded.getMIME()).then((res) => res.buffer),
            mime: imageLoaded.getMIME(),
        } as IImageDimesions;
    }, []);

    return { downsamplePhoto };
};

export default useDownsampling;
