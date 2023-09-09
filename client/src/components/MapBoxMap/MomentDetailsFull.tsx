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
import { useMediaAsset } from '../../hooks/useMediaAsset';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDoubleDown } from '@fortawesome/pro-duotone-svg-icons';

export interface IMomentDetailsFull {}

export const MomentDetailsFull: React.FC<IMomentDetailsFull> = () => {
    const setAppState = useSetRecoilState(appStateRecoil);
    const moment = useRecoilValue(getSelectedMoment);

    const scrollRef = useRef<HTMLDivElement>(null);

    const storageUpdate = useRecoilValue(getStorageUpdate);

    const { moveMediaToTrash } = useMediaAsset();

    const [showContent, setShowContent] = useState(false);

    const mediaList = useMemo(() => {
        return moment?.media.slice().reverse();
    }, [moment?.media]);

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

    const getMediaByIndex = useCallback(
        (index: number) => {
            if (!mediaList) return null;

            return mediaList[index];
        },
        [mediaList]
    );

    const scrollToContent = useCallback(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
            });
        }
    }, []);

    return (
        <>
            <ModalPopUp show={moment !== null} closeAction={close} previewModeDefault={false}>
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
                        <section className="relative mt-0 flex w-full flex-row flex-nowrap gap-x-10">
                            {moment && media && media.length > 0 && (
                                <>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <Swiper
                                        ref={swiperRef as never}
                                        className="relative flex h-full max-h-[calc(100svh-60px)] w-full flex-row bg-black"
                                        modules={[FreeMode, Pagination, Autoplay]}
                                        spaceBetween={10}
                                        loop={false}
                                        centeredSlidesBounds={false}
                                        slidesPerView={1}
                                        freeMode={false}
                                        onDoubleClick={(swiper) => {
                                            const mediaData = getMediaByIndex(swiper.activeIndex);

                                            // TODO Open Context Menu
                                            void moveMediaToTrash(
                                                moment,
                                                mediaData?.image.mediaId ?? ''
                                            );
                                        }}
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
                                        {mediaList &&
                                            mediaList.map((mediaItem, index) => {
                                                return (
                                                    <SwiperSlide
                                                        key={`${moment.id}-${
                                                            mediaItem.image.mediaId ?? index
                                                        } `}
                                                        id={`slide-${
                                                            mediaItem.image.mediaId ?? index
                                                        }`}
                                                    >
                                                        <div className="h-[calc(100svh-60px)] w-screen">
                                                            <MediaImage media={mediaItem} />
                                                        </div>
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

                            {/* Lower Button Bar */}
                            <div
                                className="absolute bottom-12 left-0 z-50 flex w-full flex-row items-center justify-center"
                                id="lowerButtonBar"
                            >
                                {/* TODO Hide, when scrollref is already scrolled  */}
                                <button
                                    className="relative flex h-max w-max"
                                    onClick={scrollToContent}
                                >
                                    <FontAwesomeIcon
                                        icon={faChevronDoubleDown}
                                        className="relative top-[1px] h-6 animate-pulse text-white/90"
                                    />
                                </button>
                            </div>
                        </section>

                        <section
                            ref={scrollRef}
                            className="relative z-0 mt-1 flex w-full flex-row items-center justify-center gap-1 px-2 py-2 pb-4"
                        >
                            {media && media.length > 0 && <AddMediaButton />}
                            {media && media.length === 0 && <div className="block h-8" />}
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

                        <section className="relative z-0 mt-1 flex w-full flex-row items-center justify-center gap-1 px-2">
                            <ShareRow />
                        </section>
                    </Transition>
                )}
            </ModalPopUp>
        </>
    );
};
