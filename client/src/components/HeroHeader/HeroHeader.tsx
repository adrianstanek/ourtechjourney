import { Transition } from '@headlessui/react';
import React, { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getHeaderCollapsed } from '../../recoil/appState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/pro-duotone-svg-icons';

export interface IHeroHeader {}

export const HeroHeader: React.FC<IHeroHeader> = () => {
    const collapsed = useRecoilValue(getHeaderCollapsed);
    const setAppState = useSetRecoilState(appStateRecoil);

    const [isInit, setIsInit] = useState(false);

    useEffect(() => {
        if (isInit) return undefined;

        setTimeout(() => {
            setIsInit(true);
        }, 100);
    }, [isInit]);

    const positionJar = useMemo(() => {
        return collapsed ? 'left-2 top-3' : 'left-[calc(50%-60px)] translate-y-24 ';
    }, [collapsed]);

    const sizeJar = useMemo(() => {
        return collapsed ? 'w-[30px]' : 'w-[120px]';
    }, [collapsed]);

    const positionTitle = useMemo(() => {
        return collapsed ? 'left-12 top-4' : 'left-0 top-60';
    }, [collapsed]);

    const sizeTitle = useMemo(() => {
        return collapsed ? 'w-[130px]' : 'w-full';
    }, [collapsed]);

    const heightHeader = useMemo(() => {
        return collapsed ? 'min-h-[60px]' : 'h-[100svh]';
    }, [collapsed]);

    const startJourney = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, headerCollapsed: true };
        });
    }, [setAppState]);

    return (
        <>
            <header
                className={`gradientPrimary sticky left-0 top-0 z-20 flex ${heightHeader} duration-750 w-full gap-1 transition-all delay-200`}
            >
                {/* Wrapper */}
                <div className="relative mx-auto flex w-full max-w-[360px] flex-col  items-center justify-center gap-1 md:max-w-full">
                    <div
                        className={`absolute top-0 ${positionJar} flex aspect-[1/1] ${sizeJar} items-center justify-center gap-1 transition-all duration-700`}
                    >
                        <Transition
                            as={Fragment}
                            show={isInit}
                            enter="transition ease-in-out duration-200 delay-100"
                            enterFrom="opacity-0 translate-y-4 scale-0"
                            enterTo="opacity-100 translate-y-0 scale-100"
                            leave="transition ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 scale-100"
                            leaveTo="opacity-0 translate-y-4 scale-100"
                        >
                            <img
                                src="/assets/logos/Logo.svg"
                                alt="logo"
                                className={`${sizeJar} transition-all duration-500`}
                            />
                        </Transition>
                    </div>

                    <div
                        className={`absolute flex items-center justify-center transition-all ${positionTitle} ${sizeTitle}`}
                    >
                        <img
                            src="/assets/logos/LogoTypo.svg"
                            alt="logo"
                            className="relative w-[200px]"
                        />
                    </div>

                    {!collapsed && (
                        <Transition
                            as={Fragment}
                            show={isInit && !collapsed}
                            enter="transition ease-in duration-1000 delay-600"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                        >
                            <div>
                                <span className="absolute bottom-3 left-0 flex w-full justify-center text-center text-xs uppercase text-secondary transition-all">
                                    Sealed Memories. Stories unveiled.
                                </span>

                                <div className="itemc absolute bottom-14 left-0 flex w-full justify-center text-center text-xs uppercase text-secondary transition-all">
                                    <button
                                        className={`bg-secondary px-8 py-4 text-xl font-medium text-primary-dark ring-offset-4 ring-offset-primary hover:ring-secondary focus:outline-0 focus:ring `}
                                        onClick={() => {
                                            setTimeout(() => {
                                                startJourney();
                                            }, 450);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            icon={faRocket}
                                            className="relative top-1 h-6 pr-2"
                                        />
                                        Start your Story
                                    </button>
                                </div>
                            </div>
                        </Transition>
                    )}
                </div>
            </header>
        </>
    );
};
