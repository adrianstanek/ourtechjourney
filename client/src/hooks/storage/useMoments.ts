import { useCallback, useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { useRecoilValue } from 'recoil';
import { getSelectedStory } from '../../recoil/appState';

export const useMoments = () => {
    const { momentDb } = useStorage();

    const selectedStory = useRecoilValue(getSelectedStory);

    const getOtherMoments = useCallback(async () => {
        const moments: IMoment[] = [];

        await momentDb.iterate((value: IMoment) => {
            if (value.parentStory !== selectedStory?.id || selectedStory === null) {
                moments.push(value);
            }
        });

        return moments;
    }, [momentDb, selectedStory]);

    const [currentMoments, setCurrentMoments] = useState<null | IMoment[]>(null);

    useEffect(() => {
        void getOtherMoments().then((moments) => {
            setCurrentMoments(moments);
        });
    }, [getOtherMoments]);

    return { currentMoments };
};
