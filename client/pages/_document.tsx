import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    static async getInitialProps(ctx: never) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    render() {
        return (
            <Html lang="de">
                <Head>
                    {/* end of google analytics scripts */}
                    <meta name="application-name" content="Storyfiy" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Storyfiy" />
                    <meta name="description" content="Storyfiy" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="theme-color" content="#478577" />

                    <link rel="apple-touch-icon" href="/manifest/favicon.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/manifest/iOS-152.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/manifest/iOS-180.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/manifest/iOS-167.png" />

                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/manifest/iOS-180.png" color="#478577" />
                    <link rel="shortcut icon" href="/manifest/favicon.png" />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://Storyfiy.dev" />
                    <meta name="twitter:title" content="Storyfiy.dev" />
                    <meta name="twitter:description" content="Sealed Memories. Stories unveiled." />
                    <meta
                        name="twitter:image"
                        content="https://Storyfiy.dev/Storyfiy-manifest-og-image.jpg"
                    />

                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Storyfiy.me" />
                    <meta property="og:description" content="Sealed Memories, Stories Unveiled" />
                    <meta property="og:site_name" content="Storyfiy.dev" />
                    <meta property="og:url" content="https://Storyfiy.dev" />
                    <meta
                        property="og:image"
                        content="https://Storyfiy.dev/Storyfiy-manifest-og-image.jpg"
                    />

                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/manifest/favicon-32.png"
                    />

                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/manifest/favicon-16.png"
                    />
                    <link rel="manifest" href="/manifest.json" />
                    <link rel="mask-icon" href="/manifest/iOS-180.png" color="#478577" />
                    <link rel="shortcut icon" href="/manifest/favicon.png" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
