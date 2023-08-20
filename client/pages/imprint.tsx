import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { ImprintContent } from '../src/components/Contents/imprintContent';
import { Scene } from '../src/components/Scene/Scene';

const Imprint: NextPage = () => {
    return (
        <>
            <Head>
                <title>Imprint / Impressum</title>
            </Head>

            <Scene testId="imprint">
                <section className="min-h-screen w-full p-4 md:p-14">
                    <div className="mx-auto mt-4 mt-24 w-full max-w-4xl">
                        <ImprintContent />
                    </div>
                </section>
            </Scene>
        </>
    );
};
export default Imprint;
