import React, { useMemo } from 'react';
import { IAuthor } from '../../interfaces/IAuthor';
import { ImageCustom } from '../ImageCustom';

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
                    <ImageCustom
                        src={author?.avatar.url ?? ''}
                        alt=""
                        width={author?.avatar?.width ?? 100}
                        height={author?.avatar?.height ?? 100}
                    />
                </div>
            )}
        </>
    );
};

Avatar.defaultProps = {
    small: false,
};
