import { IMoment } from '../interfaces/Moment.interfaces';
import dayjs from 'dayjs';
export const momentsMock: IMoment[] = [
    {
        id: '1',
        type: 'place',
        latitude: 47.90243188821165,
        longitude: 8.103891370819525,
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
        media: [
            {
                id: '1',
                url: '/assets/mocks/outdoors/LandscapeViewBench.jpeg',
                alt: 'On the bench!',
                width: 1024,
                height: 485,
                mimeType: 'image/jpeg',
            },
            {
                id: '2',
                url: '/assets/mocks/outdoors/LandscapeViewBench2.jpeg',
                alt: 'Emi!',
                width: 2048,
                height: 970,
                mimeType: 'image/jpeg',
            },
            {
                id: '233',
                url: '/assets/mocks/outdoors/20230820_182735.jpg',
                alt: 'Emi!',
                width: 2184,
                height: 4608,
                mimeType: 'image/jpeg',
            },
        ],
        created: dayjs().toISOString(),
    },
    {
        id: '2',
        type: 'vista',
        latitude: 47.90052969099884,
        longitude: 8.1028543997364,
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
        media: [
            {
                id: '21',
                url: '/assets/mocks/outdoors/20230820_181143.jpg',
                alt: 'Emi!',
                width: 4608,
                height: 2184,
                mimeType: 'image/jpeg',
            },
        ],
        created: dayjs().toISOString(),
    },
    {
        id: '3',
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
