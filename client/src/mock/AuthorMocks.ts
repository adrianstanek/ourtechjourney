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
            id: '999',
            url: '/assets/avatar/wanderwoman.jpg',
            width: 2208,
            height: 2944,
            alt: '',
            mimeType: 'image/jpeg',
        },
    },
};
