import * as Jimp from 'jimp';

/// <reference lib="webworker" />

interface IDownsampleInput {
    // Define properties of the data you'll send to the worker.
    // For example, it could be an ArrayBuffer or string, as in your original example.
    data: ArrayBuffer | string;
}

interface IDownsampleOutput {
    // Define the structure of the object that the worker will send back
    width: number;
    height: number;
    mime: string;
    arrayBuffer: ArrayBuffer;
}

async function downsample(input: ArrayBuffer | string): Promise<any> {
    const maxWidth = Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_WIDTH) ?? 0;
    const maxHeight = Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_WIDTH) ?? 0;

    if (!input) return;

    try {
        const image = await Jimp.read(input as Buffer);

        // Reduce Quality
        image.quality(Number(process.env.NEXT_PUBLIC_DOWNSAMPLE_TARGET_QUALITY) * 90);

        // Resize if too large
        if (image.bitmap.width > maxWidth || image.bitmap.height > maxHeight) {
            if (image.bitmap.width > maxWidth && maxWidth > 0) {
                image.resize(maxWidth, Jimp.AUTO);
            }
            if (image.bitmap.height > maxHeight && maxHeight > 0) {
                image.resize(Jimp.AUTO, maxHeight);
            }
        }

        const arrayBuffer = await image.getBufferAsync(image.getMIME()).then((res) => res.buffer);
        const mime = image.getMIME();

        const result: IDownsampleOutput = {
            width: image.bitmap.width,
            height: image.bitmap.height,
            mime,
            arrayBuffer,
        };

        return result;
    } catch (e) {
        // Handle the error, maybe send a message back to main thread
        return null;
    }
}

self.onmessage = async (event: MessageEvent<IDownsampleInput>) => {
    const input = event.data.data;
    const downsampledData = (await downsample(input)) as IDownsampleOutput | null;

    if (downsampledData) {
        self.postMessage(downsampledData); // No need for "as IDownsampleOutput" anymore
    }
};
