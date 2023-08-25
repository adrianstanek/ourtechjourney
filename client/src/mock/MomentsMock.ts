import { IMoment } from '../interfaces/Moment.interfaces';
import dayjs from 'dayjs';
export const momentsMock: IMoment[] = [
    {
        id: '1',
        latitude: 47.90243188821165,
        longitude: 8.103891370819525,
        direction: 60,
        description: '',
        label: 'Bench View',
        media: [
            {
                url: '/assets/mocks/outdoors/LandscapeViewBench.jpeg',
                alt: 'On the bench!',
                width: 1599,
                height: 758,
                mimeType: 'image/jpeg',
            },
        ],
        created: dayjs().toISOString(),
    },
    {
        id: '2',
        latitude: 47.90177823197263,
        longitude: 8.101629404758654,
        direction: 240,
        description: '',
        label: 'None',
        media: [],
        created: dayjs().toISOString(),
    },
];
