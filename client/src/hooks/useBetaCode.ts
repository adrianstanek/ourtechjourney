import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { getUnlocked } from '../recoil/appState';

export const useBetaCode = () => {
    const [unlocked, setUnlocked] = useRecoilState(getUnlocked);

    const isUnlocked = useCallback(() => {
        if (typeof localStorage === 'undefined' || unlocked === undefined) return false;
        return localStorage.getItem('ul') === '1' || unlocked;
    }, [unlocked]);

    useEffect(() => {
        if (localStorage.getItem('ul') === '1') {
            setUnlocked(true);
        }
    }, [setUnlocked]);

    return { isUnlocked, unlocked, setUnlocked };
};
