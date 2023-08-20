import { useCallback } from 'react';

export type TFeatureFlags = 'CONTENT_FIRST_HOME';
export const useFeatureFlags = (flag: TFeatureFlags): boolean => {
    const flagUsed = useCallback(() => {
        return process.env[`NEXT_PUBLIC_FLAG_` + flag] as string;
    }, [flag]);

    return flagUsed() === '1' ?? false;
};
