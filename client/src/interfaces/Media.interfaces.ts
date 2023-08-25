export type MimeType = 'image/jpeg' | 'image/png' | 'video/x-msvideo' | 'video/mpeg';

export interface IMedia {
    id: string;
    url: string | null;
    width?: number;
    height?: number;
    mimeType?: MimeType;
    alt?: string;
}
