import React, { useEffect, useState } from 'react';
import { useStories } from '../../hooks/storage/useStories';
import { useFlyToPosition } from './hooks/useFlyToPosition';
import { useMomentHelper } from '../../hooks/useMomentHelper';

interface IFlyToStory {}

export const FlyToStory: React.FC<IFlyToStory> = () => {
    const { currentStory } = useStories();

    const { flyTo } = useFlyToPosition();
    const { findMidpoint } = useMomentHelper();

    const [lastStoryId, setLastStoryId] = useState<string | null>(null);

    useEffect(() => {
        if (!currentStory) {
            setLastStoryId(null);
            return undefined;
        }
        if (lastStoryId === currentStory.id) return undefined;

        const midPoint = findMidpoint(currentStory.moments);

        if (midPoint && midPoint.latitude && midPoint.longitude) {
            flyTo(midPoint.latitude, midPoint.longitude, {
                zoom: 14,
                essential: true,
            });
        }

        setLastStoryId(currentStory.id);
    }, [currentStory, findMidpoint, flyTo, lastStoryId]);

    return <></>;
};
