import '../styles/globals.scss';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import React from 'react';

import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { MapProvider } from 'react-map-gl';
import { SWUpdater } from '../src/components/pwa/SWUpdater';
import { useStorage } from '../src/hooks/storage/useStorage';
import { StoryListModal } from '../src/components/Stories/StoryListModal';

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

    // Initialize Storage and Mock Data
    useStorage();

    return (
        <QueryClientProvider client={queryClient}>
            <RecoilRoot>
                <MapProvider>
                    <Component {...pageProps} />
                    <SWUpdater />
                    {/*/!*<ReactQueryDevtools />*!/*/}
                    {/*<ToastContainer*/}
                    {/*    position="top-center"*/}
                    {/*    autoClose={3500}*/}
                    {/*    hideProgressBar={false}*/}
                    {/*    newestOnTop={false}*/}
                    {/*    closeOnClick*/}
                    {/*    rtl={false}*/}
                    {/*    pauseOnFocusLoss*/}
                    {/*    draggable*/}
                    {/*    pauseOnHover*/}
                    {/*    transition={Flip}*/}
                    {/*/>*/}
                    <StoryListModal />
                </MapProvider>
            </RecoilRoot>
        </QueryClientProvider>
    );
};

export default MyApp;
