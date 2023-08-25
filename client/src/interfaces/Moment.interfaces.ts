import { IMedia } from './Media.interfaces';

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
}
