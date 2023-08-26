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
import ShareRow from '../ShareRow/ShareRow';
import { Author } from '../Author/Author';
import { AuthorMocks } from '../../mock/AuthorMocks';
import { IAuthor } from '../../interfaces/IAuthor';
import { Button } from '../Buttons/Button';

export interface IMomentDetails {}

export const MomentDetails: React.FC<IMomentDetails> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);
    const moment = useRecoilValue(getSelectedMoment);

    const close = useCallback(() => {
        setAppState((currVal) => {
            return { ...currVal, selectedMoment: null };
        });
    }, [setAppState]);

    return (
        <>
            <Transition
                show={moment !== null}
                appear={moment !== null}
                as={'section'}
                className="fixed bottom-0 left-0 z-[1000] h-[calc(100svh-50px)] w-screen overflow-x-hidden overflow-y-scroll bg-white p-2 duration-1000"
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
                            </Swiper>
                        </>
                    )}

                    {moment?.media && moment?.media.length === 0 && (
                        <div className="relative flex aspect-[1/1] w-full flex-col items-center justify-center gap-4 border-4 border-dotted border-primary bg-primary-light/20">
                            <img
                                src="/assets/icons/noun-photo-6015903-527970.svg"
                                alt="camera"
                                className="h-24"
                            />
                            <Button onClick={() => {}} color="primary">
                                Hochladen
                            </Button>
                        </div>
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
        </>
    );
};
