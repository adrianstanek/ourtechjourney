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
                display: ['Oxanium'],
                body: ['Oxanium'],
            },
            colors: {
                primary: {
                    DEFAULT: '#119DA4',
                    light: '#4CDDE5',
                    dark: '#002C57',
                },
                secondary: {
                    DEFAULT: '#EBFF00',
                    light: '#c9d340',
                    dark: '#EBFF00',
                },
                wbLightBlue: {
                    DEFAULT: '#4CDDE5',
                    light: '#c9d340',
                    dark: '#EBFF00',
                },
                wbYellow: {
                    DEFAULT: '#EBFF00',
                    light: '#c9d340',
                    dark: '#707a13',
                },
                wbOrange: {
                    DEFAULT: '#FF7F00',
                },
                wbGray: {
                    DEFAULT: '#898989',
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
