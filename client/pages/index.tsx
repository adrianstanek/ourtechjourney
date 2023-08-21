import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { HeroHeader } from '../src/components/HeroHeader/HeroHeader';
import { Scene } from '../src/components/Scene/Scene';

const Home: NextPage = () => {
    // const { translations } = useLocalisation();

    return (
        <div className="relative">
            <Head>
                <title>JourneyJar</title>
            </Head>

            <HeroHeader />
            <Scene>
                <div className="block h-[1000px]">1</div>
            </Scene>
        </div>
    );
};
export default Home;
