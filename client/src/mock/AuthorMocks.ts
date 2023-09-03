import { IAuthor } from '../interfaces/IAuthor';

export const AuthorMocks: { [key: string]: IAuthor } = {
    jenny: {
        id: '1',
        vip: true,
        userName: 'Wanderwoman',
        instagram: {
            name: 'jensta',
            url: 'https://instagram.com',
        },
        avatar: {
            mediaId: '999',
            image: {
                url: '/assets/avatar/wanderwoman.jpg',
                mediaId: '999',
                width: 2208,
                height: 2944,
                mimeType: 'image/jpeg',
            },
            thumbnail: {
                mediaId: '999',
                url: '/assets/avatar/wanderwoman.jpg',
                width: 2208,
                height: 2944,
                mimeType: 'image/jpeg',
            },
            original: {
                url: '/assets/avatar/wanderwoman.jpg',
                mediaId: '999',
                width: 2208,
                height: 2944,
                mimeType: 'image/jpeg',
            },
        },
    },
};
