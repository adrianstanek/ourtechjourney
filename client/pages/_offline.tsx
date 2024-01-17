import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';

const Offline: NextPage = () => {
    return (
        <div className="relative">
            <Head>
                <title>Story App</title>
            </Head>
            <span>You are offline</span>
        </div>
    );
};
export default Offline;
