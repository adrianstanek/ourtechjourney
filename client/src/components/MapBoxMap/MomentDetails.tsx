import { Transition } from '@headlessui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment } from '../../recoil/appState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-thin-svg-icons';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper';
import ShareRow from '../ShareRow/ShareRow';
import { Author } from '../Author/Author';
import { AuthorMocks } from '../../mock/AuthorMocks';
import { IAuthor } from '../../interfaces/IAuthor';
import { AddMediaBox } from './AddMediaBox';

export interface IMomentDetails {}

export const MomentDetails: React.FC<IMomentDetails> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);
    const moment = useRecoilValue(getSelectedMoment);

    const [showContent, setShowContent] = useState(false);

    const close = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, selectedMoment: null };
        });

        setShowContent(false);
    }, [setAppState]);

    useEffect(() => {
        setShowContent(false);

        setTimeout(() => {
            setShowContent(true);
        }, 800);

        return () => {
            setShowContent(false);
        };
    }, [moment]);

    return (
        <>
            <Transition
                show={moment !== null}
                appear={moment !== null}
                as={'section'}
                className="duration-750 fixed bottom-0 left-0 z-[1000] h-[calc(100svh-50px)] w-screen overflow-x-hidden overflow-y-scroll bg-white p-2"
                enter="transition-all ease-in-out duration-1000"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                <button className="absolute right-3 top-5" onClick={close}>
                    <FontAwesomeIcon icon={faXmark} className="h-8 text-neutral-500" />
                </button>

                <section className="relative z-0 mt-1 flex w-max flex-row gap-1">
                    <ShareRow />
                </section>
                {showContent && (
                    <Transition
                        show={showContent}
                        appear={showContent}
                        as={'div'}
                        enter="transition-all ease-in-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 "
                        leaveTo="opacity-0"
                    >
                        <section className="mt-0 flex w-full flex-row flex-nowrap gap-x-10">
                            {moment?.media && moment?.media.length > 0 && (
                                <>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <Swiper
                                        className="relative flex h-max w-full flex-row bg-primary-light/10"
                                        modules={[FreeMode, Pagination]}
                                        spaceBetween={10}
                                        loop={false}
                                        centeredSlidesBounds={false}
                                        slidesPerView={1}
                                        freeMode={false}
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
                                                        className={`relative aspect-[1/1] w-full border-b-neutral-200 object-contain shadow-2xl drop-shadow-lg transition-all`}
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
                                        <SwiperSlide key={`${moment.id}-new`}>
                                            <AddMediaBox moment={moment} />
                                        </SwiperSlide>
                                    </Swiper>
                                </>
                            )}

                            {moment?.media && moment?.media.length === 0 && (
                                <AddMediaBox moment={moment} />
                            )}
                        </section>

                        <h2 className="mt-4 font-display text-4xl text-primary">{moment?.label}</h2>

                        <Author author={AuthorMocks.jenny as IAuthor} />

                        {moment?.description && (
                            <section
                                className="relative mt-4 flex flex-col gap-3"
                                dangerouslySetInnerHTML={{
                                    __html: moment?.description.replace(/\n/gi, '<br/>'),
                                }}
                            />
                        )}
                    </Transition>
                )}
            </Transition>
        </>
    );
};
