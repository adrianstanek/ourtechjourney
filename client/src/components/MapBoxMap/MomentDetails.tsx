import { Transition } from '@headlessui/react';
import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment } from '../../recoil/appState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-thin-svg-icons';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper';

export interface IMomentDetails {}

export const MomentDetails: React.FC<IMomentDetails> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);
    const moment = useRecoilValue(getSelectedMoment);

    const close = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, selectedMoment: null };
        });
    }, [setAppState]);

    const getRandomRotation = useCallback(() => {
        const rotations = ['rotate-1', 'rotate-2', '-rotate-1', '-rotate-2'];
        const randomIndex = Math.floor(Math.random() * rotations.length);
        return rotations[randomIndex];
    }, []);

    return (
        <>
            <Transition
                show={moment !== null}
                appear={moment !== null}
                as={'section'}
                className="fixed bottom-0 left-0 z-[1000] h-screen max-h-[50svh] w-screen bg-white p-4"
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-10"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                <h2 className="font-display text-4xl text-primary">{moment?.label}</h2>
                <button className="absolute right-3 top-4" onClick={close}>
                    <FontAwesomeIcon icon={faXmark} className="h-8 text-neutral-500" />
                </button>
                <section className="flex h-full w-full flex-row flex-nowrap gap-x-10">
                    <>
                        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                        {/* @ts-ignore */}
                        <Swiper
                            className="relative flex w-full flex-row"
                            modules={[FreeMode, Pagination]}
                            spaceBetween={10}
                            loop={false}
                            centeredSlidesBounds={false}
                            slidesPerView={3}
                            freeMode={true}
                            pagination={{
                                clickable: true,
                            }}
                            // onSlideChange={() => console.log('slide change')}
                            // onSwiper={(swiper) => {
                            // }}
                        >
                            {moment?.media.map((media) => {
                                if (!media.url) return undefined;

                                return (
                                    <SwiperSlide key={`${moment.id}-${media.id}`}>
                                        <Image
                                            className={`relative aspect-[4/3] w-[300px] transition-all ${
                                                getRandomRotation() ?? ''
                                            } border-b-neutral-200 object-cover shadow-2xl drop-shadow-lg`}
                                            src={media?.url ?? ''}
                                            alt=""
                                            width={media?.width}
                                            height={media?.height}
                                            placeholder="blur"
                                            // https://png-pixel.com/
                                            blurDataURL="/assets/blur/1x1-dcdcdc51.png"
                                        />
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </>
                </section>
            </Transition>
        </>
    );
};
