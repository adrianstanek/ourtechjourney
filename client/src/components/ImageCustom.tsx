import React, { useCallback } from 'react';

export interface IImageCustom {
    src: string;
    width: number;
    height: number;
    alt?: string;
    className?: string;
}

export const ImageCustom: React.FC<IImageCustom> = (props) => {
    const { src, height, width, alt, className } = props;

    const handleImageLoad = useCallback((event: React.SyntheticEvent<HTMLImageElement>) => {
        const imgElement = event.currentTarget;
        imgElement.style.filter = 'none'; // Remove the blur effect
        imgElement.style.background = 'none'; // Remove the background image
    }, []);

    return (
        <>
            <img
                className={className ?? ''}
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                    filter: 'blur(20px)', // Apply the initial blur effect
                    background: `url("/assets/blur/1x1-dcdcdc51.png")`, // Set the background image for the blurred version
                    backgroundSize: 'cover', // Make sure the background covers the entire element
                }}
                onLoad={handleImageLoad} // Call the event handler when the image loads
            />
        </>
    );
};
