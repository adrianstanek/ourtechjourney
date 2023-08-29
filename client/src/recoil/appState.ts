import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { IMoment } from '../interfaces/Moment.interfaces';
import { IStory } from '../interfaces/Story.interfaces';
import dayjs from 'dayjs';

export interface IAppState {
    headerCollapsed: boolean;
    selectedMoment: IMoment | null;
    selectedStory: IStory | null;
    showStories: boolean;
    storageUpdate: string;
}

export const appStateRecoil = atom<IAppState>({
    key: `app-state-state/${nanoid()}`,
    default: {
        headerCollapsed: false,
        selectedMoment: null,
        selectedStory: null,
        // selectedStory: StoryMock[0] as IStory,
        showStories: false,
        storageUpdate: dayjs().toISOString(),
    },
});

export const getHeaderCollapsed = selector<boolean>({
    key: `/get-header-collapsed-${nanoid()}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).headerCollapsed;
    },
});

export const getSelectedMoment = selector<IMoment | null>({
    key: `/get-selected-moment-${nanoid()}`,
    get: ({ get }): IMoment | null => {
        return get(appStateRecoil).selectedMoment;
    },
});

export const getSelectedStory = selector<IStory | null>({
    key: `/get-selected-story-${nanoid()}`,
    get: ({ get }): IStory | null => {
        return get(appStateRecoil).selectedStory;
    },
});

export const getShowStories = selector<boolean>({
    key: `get-show-stories/${nanoid()}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).showStories;
    },
});

export const getStorageUpdate = selector<string>({
    key: `/get-storage-update${nanoid()}`,
    get: ({ get }): string => {
        return get(appStateRecoil).storageUpdate;
    },
});
