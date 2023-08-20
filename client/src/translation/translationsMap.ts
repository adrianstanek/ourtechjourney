import { generalTranslations } from './generalTranslations';

export interface ITranslation {
    [key: string]: {
        en: string;
        de: string;
    };
}

export const translationsMap: ITranslation = {
    ...generalTranslations,
};
