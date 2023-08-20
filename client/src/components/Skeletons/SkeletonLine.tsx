import React from 'react';

interface ISkeletonLine {
    height?: 'small' | 'large' | number;
    width?: number;
    additionalCss?: string;
}

export const SkeletonLine: React.FC<ISkeletonLine> = (props) => {
    const { height, width, additionalCss } = props;

    return (
        <>
            <div
                className={`relative block w-full animate-pulse bg-neutral-500/10 duration-200 ${
                    height === 'small' ? 'h-10' : 'h-32'
                } ${additionalCss ?? ''}`}
                style={{
                    height: typeof height === 'number' ? `${height}px` : undefined,
                    width: typeof height === 'number' ? `${String(width)}px` : undefined,
                }}
            ></div>
        </>
    );
};

SkeletonLine.defaultProps = {
    height: 'small',
    width: undefined,
};
