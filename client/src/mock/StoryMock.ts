import { IStory } from '../interfaces/Story.interfaces';
import { momentsMock } from './MomentsMock';
import dayjs from 'dayjs';

export const StoryMock: IStory[] = [
    {
        id: '1',
        moments: [...momentsMock],
        created: dayjs().toISOString(),
        label: '',
        description: '',
    },
];
