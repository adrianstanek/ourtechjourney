import { IMedia } from './Media.interfaces';

export type IMomentType = 'vista' | 'place';

export interface IMoment {
    id: string;
    parentStory?: string;
    label: string;
    latitude: number | null;
    longitude: number | null;
    direction?: number;
    media: IMedia[];
    description: string;
    created: string;
    type: IMomentType | null;
}
