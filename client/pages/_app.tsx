import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Flip, ToastContainer } from 'react-toastify';
import React from 'react';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';

const MyApp = ({ Component, pageProps }: AppProps): unknown => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                cacheTime: Infinity, // 24 hours
                staleTime: 10000,
                retry: 3,
            },
            mutations: {
                retry: 1,
            },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <Component {...pageProps} />
                {/*<ReactQueryDevtools />*/}
                <ToastContainer
                    position="top-center"
                    autoClose={3500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    transition={Flip}
                />
            </RecoilRoot>
        </QueryClientProvider>
    );
};

export default MyApp;
