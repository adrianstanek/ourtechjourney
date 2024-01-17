/** @type {import('next').NextConfig} */
// const runtimeCaching = require('next-pwa/cache');
// const defaultRuntimeCaching = require('next-pwa/cache');
const path = require('path');

const defaultRuntimeCaching = require('next-pwa/cache');

/** @type {import('next').NextConfig} */
const withPWA = require('next-pwa')({
    dest: 'public', // this will use the "public" directory for the service worker and assets
    disable: process.env.NODE_ENV === 'development', // Disable PWA for development
    register: true,
    skipWaiting: false, // installs new SW when available without a prompt, we only need to send a reload request to user.
    dynamicStartUrl: false, // recommend: set to false if your start url always returns same HTML document, then start url will be precached, this will help to speed up first load.
    reloadOnOnline: false, // Prevents reloads on offline/online switch
    sourcemap: true,
    sw: 'service-worker.js',
    maximumFileSizeToCacheInBytes: 10000000,
    buildExcludes: [
        /middleware-manifest\.json$/,
        /_middleware\.js$/,
        /_middleware\.js\.map$/,
        /middleware-runtime\.js$/,
        /middleware-runtime\.js\.map$/,
    ],
    runtimeCaching: [...defaultRuntimeCaching],
});

module.exports = withPWA({
    swcMinify: true,
    reactStrictMode: true,
    experimental: {
        externalDir: true,
    },
    productionBrowserSourceMaps: true,
    async redirects() {
        return [];
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    // webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false };
        return config;
    },
    env: {
        nextImageExportOptimizer_imageFolderPath: 'public/assets',
        nextImageExportOptimizer_exportFolderPath: 'out',
        nextImageExportOptimizer_quality: '90',
        nextImageExportOptimizer_storePicturesInWEBP: 'true',
        nextImageExportOptimizer_generateAndUseBlurImages: 'true',
    },
    serverRuntimeConfig: {},
    transpilePackages: ['next-image-export-optimizer'],
    images: {
        loader: 'custom',
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    },
    trailingSlash: true,
    async redirects() {
        return [];
    },
    exportPathMap: async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
        return {
            '/': { page: '/', __nextDefaultLocale: 'de' },
            '/imprint': { page: '/imprint', __nextDefaultLocale: 'de' },
            '/privacy': { page: '/privacy', __nextDefaultLocale: 'de' },
            '/_offline': { page: '/_offline', __nextDefaultLocale: 'de' },
        };
    },
});
