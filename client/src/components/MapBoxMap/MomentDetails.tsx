import { Transition } from '@headlessui/react';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment, getStorageUpdate } from '../../recoil/appState';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { Autoplay, FreeMode, Pagination } from 'swiper';
import ShareRow from '../ShareRow/ShareRow';
import { Author } from '../Author/Author';
import { AuthorMocks } from '../../mock/AuthorMocks';
import { IAuthor } from '../../interfaces/IAuthor';
import { AddMediaBox } from './AddMediaBox';
import { ModalPopUp } from '../Modals/ModalPopUp';
import { MediaImage } from '../MediaImage';
import { AddMediaButton } from './AddMediaButton';

export interface IMomentDetails {}

export const MomentDetails: React.FC<IMomentDetails> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);
    const moment = useRecoilValue(getSelectedMoment);

    const storageUpdate = useRecoilValue(getStorageUpdate);

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
        }, 250);

        return () => {
            setShowContent(false);
        };
    }, [moment]);

    const media = useMemo(() => {
        if (storageUpdate) {
            return moment?.media ?? [];
        }
    }, [moment?.media, storageUpdate]);

    const swiperRef =
        useRef<
            React.MutableRefObject<
                | SwiperRef
                | React.FunctionComponent<React.RefAttributes<SwiperRef> & SwiperProps>
                | null
            >
        >(null); // Create a ref to hold the swiper instance

    return (
        <>
            <ModalPopUp show={moment !== null} closeAction={close}>
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
                        <section className="relative z-0 mt-1 flex w-full flex-row items-center justify-center gap-1 px-2 py-2 pb-4">
                            <AddMediaButton />
                        </section>

                        <section className="relative mt-0 flex w-full flex-row flex-nowrap gap-x-10">
                            {moment && media && media.length > 0 && (
                                <>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <Swiper
                                        ref={swiperRef as never}
                                        className="relative flex h-max max-h-[70svh] w-full flex-row bg-primary-light/10"
                                        modules={[FreeMode, Pagination, Autoplay]}
                                        spaceBetween={10}
                                        loop={false}
                                        centeredSlidesBounds={false}
                                        slidesPerView={1}
                                        freeMode={false}
                                        pagination={{
                                            clickable: true,
                                        }}
                                        onSwiper={(swiper) => {
                                            swiper.wrapperEl.addEventListener('mousedown', (e) => {
                                                if (swiper.autoplay) {
                                                    swiper.autoplay.stop();
                                                }
                                                e.preventDefault();
                                            });
                                            swiper.wrapperEl.addEventListener('touchstart', (e) => {
                                                if (swiper.autoplay) {
                                                    swiper.autoplay.stop();
                                                }
                                                e.preventDefault();
                                            });
                                            swiper.wrapperEl.addEventListener('mouseup', (e) => {
                                                if (swiper.autoplay) {
                                                    swiper.autoplay.start();
                                                }
                                                e.preventDefault();
                                            });
                                            swiper.wrapperEl.addEventListener('touchend', (e) => {
                                                if (swiper.autoplay) {
                                                    swiper.autoplay.start();
                                                }
                                                e.preventDefault();
                                            });
                                        }}
                                        autoplay={{
                                            delay: 5000, // 5 seconds
                                            disableOnInteraction: false,
                                            pauseOnMouseEnter: true,
                                        }}
                                    >
                                        {media
                                            .slice()
                                            .reverse()
                                            .map((mediaItem) => {
                                                return (
                                                    <SwiperSlide
                                                        key={`${moment.id}-${mediaItem.id}`}
                                                        id={`slide-${mediaItem.id}`}
                                                    >
                                                        <MediaImage media={mediaItem} />
                                                    </SwiperSlide>
                                                );
                                            })}
                                    </Swiper>
                                </>
                            )}

                            {moment?.media && moment?.media.length === 0 && (
                                <div className="relative mx-auto flex w-full max-w-[300px] px-2">
                                    <AddMediaBox moment={moment} />
                                </div>
                            )}
                        </section>

                        <section className="relative z-0 mt-1 flex w-full flex-row items-center justify-center gap-1 px-2">
                            <ShareRow />
                        </section>

                        <section className="relative flex flex-col gap-1 px-2">
                            <h2 className="mt-4 font-display text-2xl text-primary">
                                {moment?.label}
                            </h2>

                            <Author author={AuthorMocks.jenny as IAuthor} />

                            {moment?.description && (
                                <div
                                    className="relative mt-4 flex flex-col gap-3"
                                    dangerouslySetInnerHTML={{
                                        __html: moment?.description.replace(/\n/gi, '<br/>'),
                                    }}
                                />
                            )}
                        </section>
                    </Transition>
                )}
            </ModalPopUp>
        </>
    );
};
