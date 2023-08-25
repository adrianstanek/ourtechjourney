import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid';
import { IMoment } from '../interfaces/Moment.interfaces';

export interface IAppState {
    headerCollapsed: boolean;
    selectedMoment: IMoment | null;
}

export const appStateRecoil = atom<IAppState>({
    key: `app-state-state/${nanoid()}`,
    default: {
        headerCollapsed: false,
        selectedMoment: null,
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
