import { IMedia } from './Media.interfaces';

export interface IAuthor {
    id: string;
    userName: string;
    vip?: boolean;
    avatar: IMedia;
    email?: string;
    instagram?: {
        name: string;
        url: string;
    };
    x?: {
        name: string;
        url: string;
    };
    facebook?: {
        name: string;
        url: string;
    };
    whatsapp?: {
        phone: string;
    };
    linkedin?: {
        name: string;
        url: string;
    };
}
