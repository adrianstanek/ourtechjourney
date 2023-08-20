import { useMemo } from 'react';

export const useEnvironment = () => {
    const isDevelopment = useMemo(() => {
        const env = process.env.NODE_ENV ?? 'development';
        const memeImages = process.env.NEXT_PUBLIC_MEME_PRODUCTION_IMAGES ?? '0';

        return env === 'development' && memeImages === '0';
    }, []);

    return { isDevelopment };
};
