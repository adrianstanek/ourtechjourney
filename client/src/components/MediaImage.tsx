import React, { useEffect, useState } from 'react';
import { IMedia } from '../interfaces/Media.interfaces';
import { useStorage } from '../hooks/storage/useStorage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { ImageCustom } from './ImageCustom';

export interface IMediaImage {
    media: IMedia;
}

export const MediaImage: React.FC<IMediaImage> = (props) => {
    const { media } = props;

    const { mediaDb } = useStorage();

    const [base64Url, setBase64Url] = useState<string | null>(null);

    useEffect(() => {
        if (base64Url || !media.image.mediaId) return undefined;

        void mediaDb.getItem(media.image.mediaId).then((value) => {
            setBase64Url(value as string);
        });
    }, [base64Url, media.image.mediaId, mediaDb]);

    return (
        <>
            {(base64Url ?? media.image.url) && (
                <>
                    <ImageCustom
                        className={`relative z-20 aspect-[1/1] max-h-[70vh] w-full object-contain transition-all ${
                            media.trash ? 'opacity-30' : 'opacity-100'
                        }`}
                        src={base64Url ?? media.image.url ?? ''}
                        alt=""
                        width={media?.image.width ?? 100}
                        height={media?.image.height ?? 100}
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
