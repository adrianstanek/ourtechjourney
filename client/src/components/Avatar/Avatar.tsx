import React, { useMemo } from 'react';
import { IAuthor } from '../../interfaces/IAuthor';
import Image from 'next/image';

export interface IAvatar {
    author: IAuthor;
    small?: boolean;
}

export const Avatar: React.FC<IAvatar> = (props) => {
    const { author, small } = props;

    const ringColor = useMemo(() => {
        if (author.vip) return 'ring-primary';
        return 'ring-neutral-400';
    }, [author.vip]);

    const size = useMemo(() => {
        if (small) return 'h-10 w-10';

        return 'h-16 w-16';
    }, [small]);

    return (
        <>
            {author.avatar && (
                <div
                    className={`relative flex aspect-[1/1] flex-col items-center justify-center gap-1 overflow-hidden rounded-full ring-2 ${ringColor} ${size}`}
                >
                    <Image
                        className=""
                        src={author?.avatar.url ?? ''}
                        alt=""
                        width={author?.avatar?.width}
                        height={author?.avatar?.height}
                        placeholder="blur"
                        // https://png-pixel.com/
                        blurDataURL="/assets/blur/1x1-dcdcdc51.png"
                    />
                </div>
            )}
        </>
    );
};

Avatar.defaultProps = {
    small: false,
};
