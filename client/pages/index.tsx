import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Scene } from '../src/components/Scene/Scene';

const Home: NextPage = () => {
    // const { translations } = useLocalisation();

    return (
        <div className="relative">
            <Head>
                <title>Story App</title>
            </Head>
            <Scene testId="home"></Scene>
        </div>
    );
};
export default Home;
