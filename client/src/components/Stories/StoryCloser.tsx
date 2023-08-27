import React, { useMemo } from 'react';
import { useStories } from '../../hooks/storage/useStories';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface IStoryCloser {}

export const StoryCloser: React.FC<IStoryCloser> = () => {
    const { currentStory, resetStory } = useStories();

    const label = useMemo(() => {
        if (!currentStory?.label) return 'Namenlose Story';

        return currentStory?.label.length > 30
            ? currentStory?.label.substring(0, 30) + '&hellip;'
            : currentStory?.label;
    }, [currentStory?.label]);

    return (
        <>
            {currentStory && (
                <div className="absolute bottom-24 left-0 flex w-full flex-col items-center justify-center">
                    <button
                        onClick={() => resetStory()}
                        className="relative flex w-max flex-nowrap items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-primary-light/50 px-2 py-1 text-xs text-white"
                    >
                        <span dangerouslySetInnerHTML={{ __html: label }} />

                        <FontAwesomeIcon icon={faXmark} className="h-4 text-white" />
                    </button>
                </div>
            )}
        </>
    );
};
