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
                    <meta name="application-name" content="JourneyJar" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="JourneyJar" />
                    <meta name="description" content="JourneyJar" />
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
                    <meta name="twitter:url" content="https://JourneyJar.dev" />
                    <meta name="twitter:title" content="JourneyJar.dev" />
                    <meta
                        name="twitter:description"
                        content="Individuelle Digital Transformation als SaaS - Mit uns ist das cloudbar!"
                    />
                    <meta
                        name="twitter:image"
                        content="https://journeyjar.dev/JourneyJar-manifest-og-image.jpg"
                    />

                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="journeyjar.me" />
                    <meta property="og:description" content="Sealed Memories, Stories Unveiled" />
                    <meta property="og:site_name" content="JourneyJar.dev" />
                    <meta property="og:url" content="https://JourneyJar.dev" />
                    <meta
                        property="og:image"
                        content="https://JourneyJar.dev/JourneyJar-manifest-og-image.jpg"
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
                    <link rel="mask-icon" href="/manifest/iOS-180.png" color="#119DA4" />
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
