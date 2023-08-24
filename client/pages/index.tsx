import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { HeroHeader } from '../src/components/HeroHeader/HeroHeader';
import { Scene } from '../src/components/Scene/Scene';
import dynamic from 'next/dynamic';
import { AppBar } from '../src/components/AppBar/AppBar';

const Map = dynamic(() => import('../src/components/Map/MapLeaflet'), { ssr: false });

const Home: NextPage = () => {
    return (
        <div className="relative">
            <Head>
                <title>🫙JourneyJar</title>
            </Head>

            <HeroHeader />

            <Scene>
                <div className="relative z-0 flex h-[calc(100svh-80px)] w-full">
                    <Map zoom={18 ?? null} />
                </div>
                <div className="fixed bottom-0 z-10 w-full">
                    <AppBar />
                </div>
            </Scene>
        </div>
    );
};
export default Home;
