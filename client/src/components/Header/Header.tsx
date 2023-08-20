import React from 'react';
import { NavigationItem } from './NavigationItem';
import { BurgerMenu } from './BurgerMenu';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';

interface IHeader {}

export const Header: React.FC<IHeader> = () => {
    return (
        <>
            <nav className="sticky top-0 left-0 z-50 flex h-[57px] w-screen flex-row gap-1 border-b bg-white py-2 shadow">
                <div className="relative mx-auto flex w-full max-w-7xl flex-row items-end gap-1 px-4 xl:px-0">
                    <Link href="/" className="relative flex flex-row flex-row items-end gap-1">
                        {/* Logo Icon */}
                        <div className="relative top-[1px] flex aspect-[1/1] h-[40px] w-[40px]">
                            <img src="/assets/logos/Wb-header-logo.svg" alt="webbar logo icon" />
                        </div>
                        {/* Logo Typo */}
                        <div className="relative -top-[1px] flex hidden h-[31px] w-[121px] lg:flex">
                            <img src="/assets/logos/Wb-header-typo.svg" alt="webbar logo icon" />
                        </div>
                    </Link>

                    {/* navigation */}
                    <div className="relative flex h-full w-max grow flex-row items-end justify-end gap-6 lg:top-2 lg:gap-10">
                        <div className="hidden">
                            <NavigationItem href="/cloudbar">
                                <span className="text-primary">cloud</span>
                                <span className="text-wbGray">bar</span>
                            </NavigationItem>
                        </div>

                        {/* CTO Fellow */}
                        <div className="hidden lg:inline-flex">
                            <NavigationItem href="/ctofellow">
                                <span className="text-primary">CTO</span>
                                <span className="text-wbGray">Fellow</span>
                            </NavigationItem>
                        </div>

                        {/* Blog */}
                        <NavigationItem href="/blog">
                            <span>blog</span>
                            <span className="absolute top-[6px] lg:top-[4px]">
                            </span>
                        </NavigationItem>

                        {/* Podcasts */}
                        <NavigationItem href="/videos">
                            <span className="text-primary">podcasts</span>
                        </NavigationItem>

                        {/* Team */}
                        <div className="hidden lg:inline-flex">
                            <NavigationItem href="/team">
                                <span>team</span>
                            </NavigationItem>
                        </div>

                        {/*<div className="hidden lg:inline-flex">*/}
                        {/*    <NavigationItem href="/about">*/}
                        {/*        <span>about</span>*/}
                        {/*    </NavigationItem>*/}
                        {/*</div>*/}

                        {/* LinkedIn */}
                        <NavigationItem
                            href="https://www.linkedin.com/company/webbar-dev"
                            target="wblinkedin"
                        >
                            <FontAwesomeIcon
                                icon={faLinkedin}
                                className="relative top-0.5 h-5 text-linkedin md:h-8"
                            />
                        </NavigationItem>
                        <div className="relative top-0.5 flex pr-1 lg:hidden">
                            <BurgerMenu />
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};
