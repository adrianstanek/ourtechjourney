import { IMedia } from '../interfaces/Media.interfaces';

export const MediaDataMock: IMedia[] = [
    {
        mediaId: '1',
        alt: 'On the bench!',
        image: {
            mediaId: '1',
            width: 1024,
            height: 485,
            mimeType: 'image/jpeg',
        },
        thumbnail: {
            mediaId: '1',
            width: 1024,
            height: 485,
            mimeType: 'image/jpeg',
        },
        original: {
            mediaId: '1',
            width: 1024,
            height: 485,
            mimeType: 'image/jpeg',
        },
    },
    {
        mediaId: '2',
        alt: 'Emi!',
        image: {
            mediaId: '2',
            width: 2048,
            height: 970,
            mimeType: 'image/jpeg',
        },
        thumbnail: {
            mediaId: '2',
            width: 2048,
            height: 970,
            mimeType: 'image/jpeg',
        },
        original: {
            mediaId: '2',
            width: 2048,
            height: 970,
            mimeType: 'image/jpeg',
        },
    },
    {
        mediaId: '3',
        alt: 'Blick über Hinterzarten',
        image: {
            mediaId: '2',
            width: 2048,
            height: 970,
            mimeType: 'image/jpeg',
        },
        thumbnail: {
            mediaId: '2',
            width: 2048,
            height: 970,
            mimeType: 'image/jpeg',
        },
        original: {
            mediaId: '2',
            width: 2048,
            height: 970,
            mimeType: 'image/jpeg',
        },
    },
];
