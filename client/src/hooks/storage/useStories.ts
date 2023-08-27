import { useCallback, useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedStory } from '../../recoil/appState';
import { IStory } from '../../interfaces/Story.interfaces';
import { IMoment } from '../../interfaces/Moment.interfaces';

export const useStories = () => {
    const { storyDb, momentDb } = useStorage();

    const selectedStory = useRecoilValue(getSelectedStory);
    const setAppState = useSetRecoilState(appStateRecoil);

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

            return { ...story, moments: moments };
        },
        [momentDb, storyDb]
    );

    const getStories = useCallback(async () => {
        const stories: IStory[] = [];

        await storyDb.iterate((value: IStory) => {
            stories.push(value);
        });

        return stories;
    }, [storyDb]);

    const resetStory = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, selectedStory: null, selectedMoment: null };
        });
    }, [setAppState]);

    const [currentStory, setCurrentStory] = useState<IStory | null>(null);
    const [currentStories, setCurrentStories] = useState<IStory[] | null>(null);

    useEffect(() => {
        if (!selectedStory) setCurrentStory(null);

        if (selectedStory) {
            void getStory(selectedStory.id).then((story) => {
                setCurrentStory(story);
            });
        }
    }, [getStory, selectedStory]);

    useEffect(() => {
        void getStories().then((stories) => {
            setCurrentStories(stories);
        });
    }, [getStories]);

    return { getStory, currentStory, currentStories, resetStory };
};
