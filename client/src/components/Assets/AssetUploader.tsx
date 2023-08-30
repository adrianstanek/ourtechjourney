import React, { useCallback, useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { getCaptureRef, getUploadRef, uploaderStateRecoil } from './hook/uploaderState';
import { useStorage } from '../../hooks/storage/useStorage';
import { nanoid } from 'nanoid';
import Jimp from 'jimp';

export interface IAssetUploader {
    accept: string;
    capture: 'environment' | 'user';
    onProcess: (file: File) => void;
}

export const AssetUploader: React.FC<IAssetUploader> = (props) => {
    const { capture, accept, onProcess } = props;

    const { mediaDb } = useStorage();

    const captureRefLocal = useRef<HTMLInputElement | null>(null);
    const uploadRefLocal = useRef<HTMLInputElement | null>(null);

    const captureRef = useRecoilValue(getCaptureRef);
    const uploadRef = useRecoilValue(getUploadRef);

    const setUploadState = useSetRecoilState(uploaderStateRecoil);

    useEffect(() => {
        if (captureRef === null) {
            setUploadState((currVal) => {
                return { ...currVal, captureRef: captureRefLocal };
            });
        }

        if (uploadRef === null) {
            setUploadState((currVal) => {
                return { ...currVal, uploadRef: uploadRefLocal };
            });
        }
    }, [captureRef, setUploadState, uploadRef]);

    const processFile = useCallback(
        async (file: File) => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = Buffer.from(arrayBuffer);
            const image = await Jimp.read(buffer);
            const mediaId = nanoid();
            await mediaDb.setItem(mediaId, image.getBase64Async(image.getMIME())).then(() => {
                // eslint-disable-next-line no-console
                console.log('onProcess');
                onProcess(file);
            });
        },
        [mediaDb, onProcess]
    );

    return (
        <>
            <input
                type="file"
                className="hidden"
                accept={accept}
                capture={capture}
                ref={captureRefLocal}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        void processFile(file);
                    }
                }}
            />
            <input
                className="hidden"
                type="file"
                accept={accept}
                ref={uploadRefLocal}
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        void processFile(file);
                    }
                }}
            />
        </>
    );
};
