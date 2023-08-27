import { IStory } from '../interfaces/Story.interfaces';
import { momentsMock } from './MomentsMock';
import dayjs from 'dayjs';

export const StoryMock: IStory[] = [
    {
        id: '1',
        moments: [...momentsMock],
        created: dayjs().toISOString(),
        label: 'Hinterzarten Family Trip',
        description: '',
    },
    {
        id: '2',
        moments: [],
        created: dayjs().toISOString(),
        label: '',
        description: '',
    },
];
