import { IMoment } from '../interfaces/Moment.interfaces';
import dayjs from 'dayjs';
import { MediaDataMock } from './MediaDataMock';
import { IMedia } from '../interfaces/Media.interfaces';

export const momentsMock: IMoment[] = [
    {
        id: '1',
        order: 0,
        type: 'place',
        latitude: 47.90243188821165,
        longitude: 8.103891370819525,
        parentStory: '1',
        direction: 60,
        description:
            '🗺 Explore the Wonders of Rocky Peak\n' +
            '\n' +
            "🏔 Welcome to Rocky Peak, a jewel of unspoiled wilderness set against a backdrop of awe-inspiring mountains! There's something here for everyone: from novice hikers to seasoned adventurers.\n" +
            '\n' +
            '🌲 Lush Forest Trails\n' +
            '\n' +
            '🚶‍♀️ Step into a world of natural beauty as you explore our lush forest trails. Walk beneath canopies of towering pine trees and hear the rustle of hidden creatures in the underbrush.',
        label: 'Bench View',
        media: [MediaDataMock[0] as IMedia, MediaDataMock[1] as IMedia],
        created: dayjs().toISOString(),
    },
    {
        id: '2',
        order: 1,
        type: 'vista',
        latitude: 47.90052969099884,
        longitude: 8.1028543997364,
        parentStory: '1',
        direction: 240,
        label: 'Blick über Hinterzarten',
        description:
            '🗺 Explore the Wonders of Rocky Peak\n' +
            '\n' +
            "🏔 Welcome to Rocky Peak, a jewel of unspoiled wilderness set against a backdrop of awe-inspiring mountains! There's something here for everyone: from novice hikers to seasoned adventurers.\n" +
            '\n' +
            '🌲 Lush Forest Trails\n' +
            '\n' +
            '🚶‍♀️ Step into a world of natural beauty as you explore our lush forest trails. Walk beneath canopies of towering pine trees and hear the rustle of hidden creatures in the underbrush.',
        media: [MediaDataMock[2] as IMedia],
        created: dayjs().toISOString(),
    },
    {
        id: '3',
        order: 1,
        type: 'place',
        latitude: 47.9017782301,
        longitude: 8.10162940423,
        direction: 181,
        description: '',
        label: 'None',
        media: [],
        created: dayjs().toISOString(),
    },
];
