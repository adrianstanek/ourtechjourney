import React from 'react';
import { ModalPopUp } from '../Modals/ModalPopUp';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getShowStories } from '../../recoil/appState';
import { useStories } from '../../hooks/storage/useStories';

interface IStoryListModal {}

export const StoryListModal: React.FC<IStoryListModal> = () => {
    const show = useRecoilValue(getShowStories);
    const setAppState = useSetRecoilState(appStateRecoil);

    const { currentStories } = useStories();

    return (
        <>
            <ModalPopUp
                show={show}
                closeButton={true}
                closeAction={() => {
                    setAppState((currVal) => {
                        return { ...currVal, showStories: false };
                    });
                }}
            >
                <section className="relative flex w-full flex-col gap-1">
                    {currentStories?.map((story) => {
                        return (
                            <button
                                className="relative flex w-full flex-row gap-1 px-2 py-3"
                                onClick={() => {
                                    setAppState((currVal) => {
                                        return {
                                            ...currVal,
                                            selectedStory: null,
                                        };
                                    });

                                    setTimeout(() => {
                                        setAppState((currVal) => {
                                            return {
                                                ...currVal,
                                                selectedMoment: null,
                                                selectedStory: story,
                                                showStories: false,
                                            };
                                        });
                                    }, 100);
                                }}
                                key={`story-select-button-${story.id}`}
                            >
                                {story.label.length > 0 && story.label}
                                {story.label.length === 0 && (
                                    <span className="text-neutral-500">Namenlose Story</span>
                                )}
                            </button>
                        );
                    })}
                </section>
            </ModalPopUp>
        </>
    );
};
