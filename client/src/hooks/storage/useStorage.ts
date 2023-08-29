import { useCallback, useEffect, useMemo } from 'react';
import localforage from 'localforage';
import { StoryMock } from '../../mock/StoryMock';
import { momentsMock } from '../../mock/MomentsMock';
import { MediaMock } from '../../mock/MediaMock';

export const useStorage = () => {
    const storyDb = useMemo(() => {
        return localforage.createInstance({
            name: 'stories',
            version: 4,
        });
    }, []);

    const momentDb = useMemo(() => {
        return localforage.createInstance({
            name: 'moments',
            version: 4,
        });
    }, []);

    const mediaDb = useMemo(() => {
        return localforage.createInstance({
            name: 'media',
            version: 4,
        });
    }, []);

    const createMockData = useCallback(() => {
        StoryMock.forEach((story) => {
            if (story.id && story.id.length > 0) {
                void storyDb.setItem(story.id, story);
            }
        });

        momentsMock.forEach((moment) => {
            if (moment.id && moment.id.length > 0) {
                void momentDb.setItem(moment.id, moment);
            }
        });

        void mediaDb.setItem('1', MediaMock[0]);
        void mediaDb.setItem('2', MediaMock[0]);

        // TODO Translate url into buffer for Mocks
    }, [mediaDb, momentDb, storyDb]);

    const initializeStorage = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log('initialize storage.');

        createMockData();

        localStorage.setItem('storageInit', '1');
    }, [createMockData]);

    useEffect(() => {
        if (localStorage.getItem('storageInit') !== '1') {
            void initializeStorage();
        }
    }, [initializeStorage]);

    return { momentDb, storyDb, mediaDb };
};
