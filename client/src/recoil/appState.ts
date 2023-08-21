import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid';

export interface IAppState {
    headerCollapsed: boolean;
}

export const appStateRecoil = atom<IAppState>({
    key: `app-state-state/${nanoid()}`,
    default: {
        headerCollapsed: false,
    },
});

export const getHeaderCollapsed = selector<boolean>({
    key: `/get-header-collapsed${nanoid()}`,
    get: ({ get }): boolean => {
        return get(appStateRecoil).headerCollapsed;
    },
});
