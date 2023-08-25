import { IMoment } from './Moment.interfaces';

export interface IStory {
    id: string;
    label: string;
    description: string;
    created: string;
    moments: IMoment[];
}
