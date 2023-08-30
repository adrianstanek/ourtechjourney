import { Transition } from '@headlessui/react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedMoment, getStorageUpdate } from '../../recoil/appState';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import { FreeMode, Pagination } from 'swiper';
import ShareRow from '../ShareRow/ShareRow';
import { Author } from '../Author/Author';
import { AuthorMocks } from '../../mock/AuthorMocks';
import { IAuthor } from '../../interfaces/IAuthor';
import { AddMediaBox } from './AddMediaBox';
import { ModalPopUp } from '../Modals/ModalPopUp';
import { MediaImage } from '../MediaImage';

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

    // const [assets, setAssets] = useState<{ [key: string]: string }>({});
    // const [assetsSet, setAssetsSet] = useState(false);
    //
    // useEffect(() => {
    //     if (assetsSet) return undefined;
    //
    //     moment?.media.forEach((media) => {
    //         if (!media.mediaId) return undefined;
    //
    //         void getMediaAsset(media.mediaId).then((asset: string | null) => {
    //             setAssets((prevState) => {
    //                 const oldState = { ...prevState };
    //                 if (media.mediaId && asset) oldState[media.mediaId] = asset;
    //                 return { ...prevState, ...oldState };
    //             });
    //         });
    //
    //         setAssetsSet(true);
    //     });
    // }, [assets, assetsSet, getMediaAsset, moment?.media]);

    const media = useMemo(() => {
        if (storageUpdate) {
            return moment?.media ?? [];
        }
    }, [moment?.media, storageUpdate]);

    return (
        <>
            <ModalPopUp show={moment !== null} closeAction={close}>
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
                        <section className="relative mt-0 flex w-full flex-row flex-nowrap gap-x-10">
                            {moment && media && media.length > 0 && (
                                <>
                                    {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
                                    {/* @ts-ignore */}
                                    <Swiper
                                        className="relative flex h-max max-h-[70svh] w-full flex-row bg-primary-light/10"
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
                                        {media.map((mediaItem) => {
                                            return (
                                                <SwiperSlide key={`${moment.id}-${mediaItem.id}`}>
                                                    <MediaImage media={mediaItem} />
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

                        <h2 className="mt-4 font-display text-2xl text-primary">{moment?.label}</h2>

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
            </ModalPopUp>
        </>
    );
};
