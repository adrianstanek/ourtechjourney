export type MimeType = 'image/jpeg' | 'image/png' | 'video/x-msvideo' | 'video/mpeg';

export interface IMedia {
    mediaId: string | null;
    alt?: string;
    trash?: boolean;
    image: {
        mediaId: string | null;
        url?: string;
        width: number;
        height: number;
        mimeType: MimeType;
    };
    thumbnail: {
        mediaId: string | null;
        url?: string;
        width: number;
        height: number;
        mimeType: MimeType;
    };
    original: {
        mediaId: string | null;
        url?: string;
        width: number;
        height: number;
        mimeType: MimeType;
    };
}
