interface ColorGroup {
    DEFAULT: string;
    light?: string;
    dark?: string;
}

interface ScreenSizes {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
}

interface ThemeExtend {
    fontFamily: {
        sans: string[];
        serif: string[];
        display: string[];
        body: string[];
    };
    colors: {
        primary: ColorGroup;
        secondary: ColorGroup;
        tertiary: ColorGroup;
        success: ColorGroup;
        info: ColorGroup;
        invert: string;
        copy: string;
        linkedin: string;
        spotify: string;
        youtube: string;
    };
}

interface Theme {
    screens: ScreenSizes;
    extend: ThemeExtend;
}

export interface ITailwindConfig {
    mode: 'jit';
    content: string[];
    darkMode: 'media';
    theme: Theme;
    variants: {
        extend: Record<string, unknown>; // Could be more specific if known
    };
    plugins: unknown[]; // Could be more specific if known
}
