import { atom } from 'recoil';

export interface IAppState {}

export const appState = atom<IAppState>({
    key: `app-state`,
    default: {},
});
