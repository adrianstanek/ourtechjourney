import { atom, selector } from 'recoil';
import { IMoment } from '../interfaces/Moment.interfaces';
import { IStory } from '../interfaces/Story.interfaces';
import dayjs from 'dayjs';

export type TMapType = 'outdoors' | 'satellite';

export interface IAppState {
    headerCollapsed: boolean;
    selectedMoment: IMoment | null;
    selectedStory: IStory | null;
    showStories: boolean;
    storageUpdate: string;
    placeMode: boolean;
    momentsProcessing: string[];
    mapType: TMapType;
    wakeLock: boolean;
    unlocked: boolean;
}

export const appStateRecoil = atom<IAppState>({
    key: `app-state-state/}`,
    default: {
        headerCollapsed: false,
        selectedMoment: null,
        selectedStory: null,
        // selectedStory: StoryMock[0] as IStory,
        showStories: false,
        storageUpdate: dayjs().toISOString(),
        placeMode: false,
        momentsProcessing: [],
        mapType: 'outdoors',
        wakeLock: false,
        unlocked: false,
    },
});

export const getHeaderCollapsed = selector<boolean>({
    key: `/get-header-collapsed}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).headerCollapsed;
    },
});

export const getSelectedMoment = selector<IMoment | null>({
    key: `/get-selected-moment}`,
    get: ({ get }): IMoment | null => {
        return get(appStateRecoil).selectedMoment;
    },
});

export const getSelectedStory = selector<IStory | null>({
    key: `/get-selected-story}`,
    get: ({ get }): IStory | null => {
        return get(appStateRecoil).selectedStory;
    },
});

export const getShowStories = selector<boolean>({
    key: `get-show-stories/}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).showStories;
    },
});

export const getStorageUpdate = selector<string>({
    key: `/get-storage-update}`,
    get: ({ get }): string => {
        return get(appStateRecoil).storageUpdate;
    },
});

export const getPlaceMode = selector<boolean>({
    key: `get-place-mode/}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).placeMode;
    },
});

export const getMomentsProcessing = selector<string[]>({
    key: `get-moments-processing/}`,
    get: ({ get }): string[] => {
        return get(appStateRecoil).momentsProcessing;
    },
});

export const getMapType = selector<TMapType>({
    key: `/get-map-type}`,
    get: ({ get }): TMapType => {
        return get(appStateRecoil).mapType;
    },
});

export const getWakeLock = selector<boolean>({
    key: `/get-wake-lock}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).wakeLock;
    },
});

export const getUnlocked = selector<boolean>({
    key: `/get-unlocked}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).unlocked;
    },
    set: ({ set }, newValue): void => {
        set(appStateRecoil, (currVal) => {
            return { ...currVal, unlocked: newValue as boolean };
        });
    },
});
