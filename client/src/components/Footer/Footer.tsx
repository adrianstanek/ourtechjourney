import React from 'react';
import ExportedImage from 'next-image-export-optimizer';
import { IconButton } from '../Buttons/IconButton';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
import { useLocalisation } from '../../translation/useLocalisation';

export const Footer: React.FC = () => {
    const { translations } = useLocalisation();

    return (
        <>
            <footer className="relative flex aspect-[100/50] w-screen flex-col gap-1 md:aspect-[100/30] lg:aspect-[100/20] xl:aspect-[100/10]">
                <ExportedImage
                    className="absolute top-0 left-0 h-full w-full object-cover"
                    src="/assets/images/backgrounds/background-large2.png"
                    alt="blog hero background"
                    width={4416 / 2}
                    height={2295 / 2}
                    placeholder="blur"
                    // https://png-pixel.com/
                    blurDataURL="/shop/images/blur/1x1-dcdcdc51.png"
                />
                <div className="relative mx-auto flex h-full w-full max-w-5xl flex-col gap-1">
                    {/*<img*/}
                    {/*    src="/assets/logos/wb-logo-complete.svg"*/}
                    {/*    className="absolute top-6 right-10 z-10 w-[20%] opacity-20 lg:w-[15%] 2xl:top-10 2xl:w-[20%]"*/}
                    {/*    alt="webbar logo"*/}
                    {/*/>*/}

                    <img
                        src="/assets/claims/Transformingthe cloud-native way.svg"
                        className="absolute bottom-10 left-10 z-10 w-[40%]"
                        alt="Transforming the cloud-native way"
                    />

                    {/* Mobile */}
                    <section className="relative flex h-full w-full flex-col items-start justify-start gap-4 px-10 py-10 lg:hidden">
                        <div className="relative flex flex-row gap-5">
                            <IconButton
                                href="https://www.linkedin.com/company/webbar-dev"
                                color="text-white"
                                target="linkedin"
                                icon={faLinkedin}
                            />
                            <IconButton
                                href="https://www.youtube.com/channel/UC4a7Mxyq-ZHrh8QUqcXPHDw"
                                color="text-youtube"
                                target="youtube"
                            >
                                <img
                                    src="/assets/icons/youtube-icon.svg"
                                    className="z-1 relative top-1 h-4"
                                    alt="youtube link"
                                />
                            </IconButton>
                        </div>

                        <div className="relative -top-1 flex flex-col gap-3">
                            <Link href="/imprint" className="text-white">
                                {translations.generalImprint ?? 'Impressum'}
                            </Link>
                            <Link href="/privacy" className="text-white">
                                {translations.generalPrivacy ?? 'Datenschutz'}
                            </Link>
                        </div>
                    </section>

                    {/* Desktop */}
                    <section className="relative hidden h-full w-full flex-row items-end justify-end gap-20 px-10 py-10 lg:flex">
                        <div className="relative flex flex-row gap-5">
                            <IconButton
                                href="https://www.linkedin.com/company/webbar-dev"
                                color="text-white"
                                target="linkedin"
                                icon={faLinkedin}
                            />
                            <IconButton
                                href="https://www.youtube.com/channel/UC4a7Mxyq-ZHrh8QUqcXPHDw"
                                color="text-youtube"
                                target="youtube"
                            >
                                <img
                                    src="/assets/icons/youtube-icon.svg"
                                    className="z-1 relative top-1 h-4"
                                    alt="youtube link"
                                />
                            </IconButton>
                        </div>

                        <div className="relative -top-1 flex flex-row gap-5">
                            <Link href="/imprint" className="text-white">
                                {translations.generalImprint ?? 'Impressum'}
                            </Link>
                            <Link href="/privacy" className="text-white">
                                {translations.generalPrivacy ?? 'Datenschutz'}
                            </Link>
                        </div>
                    </section>
                </div>
            </footer>
        </>
    );
};
