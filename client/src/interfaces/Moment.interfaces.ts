import { IMedia } from './Media.interfaces';

export type IMomentType = 'vista' | 'place' | null;

export interface IMoment {
    id: string;
    parentStory?: string | null;
    label: string;
    latitude: number | null;
    longitude: number | null;
    direction?: number | null;
    media: IMedia[];
    description: string;
    created: string;
    type: IMomentType | null;
    distanceToCurrent?: number;
    order: number;
}
