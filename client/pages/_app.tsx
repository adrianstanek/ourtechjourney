import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';

import { SWUpdater } from '../src/components/pwa/SWUpdater';

const MyApp = ({ Component, pageProps }: AppProps): unknown => {
    const [root, setRoot] = useState(null);

    useEffect(() => {
        if (typeof window.document !== 'undefined') {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            setRoot(document.getElementById('__next'));
        }
    }, [root]);

    return (
        <RecoilRoot>
            <Component {...pageProps} />
            <SWUpdater />
        </RecoilRoot>
    );
};

export default MyApp;
