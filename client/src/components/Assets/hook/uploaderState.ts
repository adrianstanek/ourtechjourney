import { atom, selector } from 'recoil';
import { nanoid } from 'nanoid';

export interface IUploaderState {
    accept: string;
    capture: 'environment' | 'user';
    captureRef: React.RefObject<HTMLInputElement> | null;
    uploadRef: React.RefObject<HTMLInputElement> | null;
}

export const uploaderStateRecoil = atom<IUploaderState>({
    key: `uploader-state-state/${nanoid()}`,
    default: {
        accept: 'image/jpeg',
        capture: 'environment',
        captureRef: null,
        uploadRef: null,
    },
});

export const getCaptureRef = selector<React.RefObject<HTMLInputElement> | null>({
    key: `/get-capture-ref${nanoid()}`,
    get: ({ get }): React.RefObject<HTMLInputElement> | null => {
        return get(uploaderStateRecoil).captureRef;
    },
});

export const getUploadRef = selector<React.RefObject<HTMLInputElement> | null>({
    key: `/get-upload-ref${nanoid()}`,
    get: ({ get }): React.RefObject<HTMLInputElement> | null => {
        return get(uploaderStateRecoil).uploadRef;
    },
});
