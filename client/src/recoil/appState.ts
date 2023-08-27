import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { IMoment } from '../interfaces/Moment.interfaces';
import { IStory } from '../interfaces/Story.interfaces';
import { StoryMock } from '../mock/StoryMock';

export interface IAppState {
    headerCollapsed: boolean;
    selectedMoment: IMoment | null;
    selectedStory: IStory | null;
}

export const appStateRecoil = atom<IAppState>({
    key: `app-state-state/${nanoid()}`,
    default: {
        headerCollapsed: false,
        selectedMoment: null,
        selectedStory: StoryMock[0] as IStory,
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
