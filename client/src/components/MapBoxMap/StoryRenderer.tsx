import React from 'react';
import { IStory } from '../../interfaces/Story.interfaces';
import { MomentMarker } from './MomentMarker';

export interface IStoryRenderer {
    story: IStory;
}

export const StoryRenderer: React.FC<IStoryRenderer> = (props) => {
    const { story } = props;

    return (
        <>
            {story.moments.map((moment) => {
                return <MomentMarker moment={moment} key={moment.id} />;
            })}
        </>
    );
};
