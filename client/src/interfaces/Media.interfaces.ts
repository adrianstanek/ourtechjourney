export type MimeType = 'image/jpeg' | 'image/png' | 'video/x-msvideo' | 'video/mpeg';

export interface IMedia {
    id: string;
    mediaId: string | null;
    width?: number;
    height?: number;
    mimeType?: MimeType;
    alt?: string;
    url?: string;
    trash?: boolean;
}
