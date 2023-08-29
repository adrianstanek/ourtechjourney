import React, { useEffect, useState } from 'react';
import { IMedia } from '../interfaces/Media.interfaces';
import Image from 'next/image';
import { useStorage } from '../hooks/storage/useStorage';

export interface IMediaImage {
    media: IMedia;
}

export const MediaImage: React.FC<IMediaImage> = (props) => {
    const { media } = props;

    const { mediaDb } = useStorage();

    const [base64Url, setBase64Url] = useState<string | null>(null);

    useEffect(() => {
        if (base64Url || !media.mediaId) return undefined;

        void mediaDb.getItem(media.mediaId).then((value) => {
            setBase64Url(value as string);
        });
    }, [base64Url, media.mediaId, mediaDb]);

    return (
        <>
            {(base64Url ?? media.url) && (
                <Image
                    className={`relative aspect-[1/1] max-h-[70svh] w-full border-b-neutral-200 object-contain transition-all`}
                    src={base64Url ?? media.url ?? ''}
                    alt=""
                    width={media?.width}
                    height={media?.height}
                    placeholder="blur"
                    // https://png-pixel.com/
                    blurDataURL="/assets/blur/1x1-dcdcdc51.png"
                />
            )}
        </>
    );
};
