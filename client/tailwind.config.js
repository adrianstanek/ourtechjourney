module.exports = {
    mode: 'jit',
    content: [
        './src/**/*.tsx',
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'media',
    theme: {
        screens: {
            xs: '460px', // Lager Phones
            sm: '640px', // => @media (min-width: 640px) { ... }
            md: '768px', // => @media (min-width: 768px) { ... }
            lg: '1024px', // => @media (min-width: 1024px) { ... }
            xl: '1280px', // => @media (min-width: 1280px) { ... }
            '2xl': '1536px', // => @media (min-width: 1536px) { ... }
        },
        extend: {
            fontFamily: {
                sans: ['Oxanium'],
                serif: ['Source Serif Pro', 'Oxanium'],
                display: ['Zeyada'],
                body: ['Oxanium'],
            },
            colors: {
                primary: {
                    DEFAULT: '#5B6865',
                    light: '#5B6865',
                    dark: '#3a4240',
                },
                secondary: {
                    DEFAULT: '#E4F9F5',
                    light: '#E4F9F5',
                    dark: '#E4F9F5',
                },
                tertiary: {
                    DEFAULT: '#898989',
                    light: '#898989',
                    dark: '#898989',
                },
                success: {
                    DEFAULT: '#368A03',
                    light: '#F2FFED',
                    dark: '#246200',
                },
                info: {
                    DEFAULT: '#0355c4',
                    light: '#c9dfff',
                    dark: '#054091',
                },
                invert: '#ffffff',
                copy: '#3d4653',
                linkedin: '#0072b1',
                spotify: '#1DB954',
                youtube: '#FF0000',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('@tailwindcss/aspect-ratio'),
        require('@tailwindcss/forms'),
    ],
};
