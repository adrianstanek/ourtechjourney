import React from 'react';
import { MomentMarker } from './MomentMarker';
import { useMoments } from '../../hooks/storage/useMoments';
import { useRecoilValue } from 'recoil';
import { getSelectedStory } from '../../recoil/appState';

export interface IMomentsRenderer {}

export const MomentsRenderer: React.FC<IMomentsRenderer> = () => {
    const { currentMoments } = useMoments();
    const selectedStory = useRecoilValue(getSelectedStory);

    return (
        <>
            {currentMoments &&
                currentMoments.map((moment) => {
                    return (
                        <MomentMarker
                            moment={moment}
                            key={moment.id}
                            inactive={selectedStory !== null}
                        />
                    );
                })}
        </>
    );
};
