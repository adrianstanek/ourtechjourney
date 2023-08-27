import { useCallback, useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { IStory } from '../../interfaces/Story.interfaces';
import { useRecoilValue } from 'recoil';
import { getSelectedStory } from '../../recoil/appState';

export const useStories = () => {
    const { storyDb, momentDb } = useStorage();

    const selectedStory = useRecoilValue(getSelectedStory);

    const getStory = useCallback(
        async (storyId: string): Promise<IStory | null> => {
            const story = await storyDb.getItem<IStory>(storyId);

            if (!story) return null;

            const moments: IMoment[] = [];

            await momentDb.iterate((moment: IMoment) => {
                if (moment.parentStory === storyId) {
                    moments.push(moment);
                }
            });

            return { ...story, moments };
        },
        [momentDb, storyDb]
    );

    const [currentStory, setCurrentStory] = useState<IStory | null>(null);

    useEffect(() => {
        if (selectedStory) {
            void getStory(selectedStory.id).then((story) => {
                setCurrentStory(story);
            });
        }
    }, [getStory, selectedStory]);

    return { getStory, currentStory };
};
