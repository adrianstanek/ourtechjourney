import type { NextPage } from 'next';
import React from 'react';
import Head from 'next/head';
import { Scene } from '../src/components/Scene/Scene';
import { AppBar } from '../src/components/AppBar/AppBar';
import { MapBoxMap } from '../src/components/MapBoxMap/MapBoxMap';
import { homePosition } from '../src/positions/positions';
import { HeroHeader } from '../src/components/HeroHeader/HeroHeader';
import { useRecoilValue } from 'recoil';
import { getSelectedMoment } from '../src/recoil/appState';
import { useBetaCode } from '../src/hooks/useBetaCode';

const MapBox: NextPage = () => {
    const selectedMoment = useRecoilValue(getSelectedMoment);
    const { unlocked } = useBetaCode();

    console.log(unlocked);

    return (
        <div className="relative">
            <Head>
                <title>Storyfiy</title>
            </Head>

            <HeroHeader />

            <Scene>
                <div className="relative z-0 flex h-[calc(100svh-50px)] w-full" key="mpwrapper">
                    {unlocked && (
                        <MapBoxMap
                            key="mp"
                            longitude={homePosition.longitude}
                            latitude={homePosition.latitude}
                        />
                    )}
                </div>
                {selectedMoment === null && (
                    <div className="fixed bottom-0  w-full">
                        <AppBar />
                    </div>
                )}
            </Scene>
        </div>
    );
};
export default MapBox;
