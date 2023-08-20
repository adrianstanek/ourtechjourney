import { useEffect, useMemo, useState } from 'react';
import { translationsMap } from './translationsMap';

export interface ITranslationParsed {
    [key: string]: string;
}

export const useLocalisation = (languageOverwrite?: string) => {
    const [navigatorLanguage, setNavigatorLanguage] = useState<string | null>(null);

    const languageCode = useMemo(() => {
        const language = languageOverwrite ?? navigatorLanguage ?? 'en';

        const cultureCodeRegEx = /\w{2}-\w{2}/;

        let languageCodeFinal = language;
        if (language.match(cultureCodeRegEx)) {
            languageCodeFinal = language.split('-')[0] ?? 'en';
        }
        if (languageCodeFinal !== 'de' && languageCodeFinal !== 'en') {
            languageCodeFinal = 'en';
        }

        return languageCodeFinal;
    }, [languageOverwrite, navigatorLanguage]);

    const translations = useMemo(() => {
        const mapped: ITranslationParsed = {};

        Object.keys(translationsMap).forEach((key) => {
            mapped[key] = (translationsMap?.[key]?.[languageCode] as string) ?? '';
        });

        return mapped;
    }, [languageCode]);

    useEffect(() => {
        if (navigator && navigatorLanguage === null) {
            setNavigatorLanguage(navigator.language ?? 'en');
        }
    }, [navigatorLanguage]);

    return { translations, languageCode };
};
