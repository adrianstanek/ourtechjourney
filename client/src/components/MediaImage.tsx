import React, { useEffect, useState } from 'react';
import { IMedia } from '../interfaces/Media.interfaces';
import Image from 'next/image';
import { useStorage } from '../hooks/storage/useStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';

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
                <>
                    <Image
                        className={`relative z-20 aspect-[1/1] max-h-[70svh] w-full object-contain transition-all ${
                            media.trash ? 'opacity-30' : 'opacity-100'
                        }`}
                        src={base64Url ?? media.url ?? ''}
                        alt=""
                        width={media?.width}
                        height={media?.height}
                        placeholder="blur"
                        // https://png-pixel.com/
                        blurDataURL="/assets/blur/1x1-dcdcdc51.png"
                    />

                    {media.trash && (
                        <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
                            <FontAwesomeIcon icon={faTrash} className="h-20 text-neutral-500" />
                        </div>
                    )}
                </>
            )}
        </>
    );
};
