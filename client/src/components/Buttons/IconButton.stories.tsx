import '../../../styles/globals.scss';
import { ComponentMeta } from '@storybook/react';
import { IconButton, IIconButton } from './IconButton';
import { faLinkedin, faSpotify, faYoutube } from '@fortawesome/free-brands-svg-icons';

export default {
    title: 'buttons/IconButton',
    component: IconButton,
    parameters: {
        viewport: {
            //👇 Your own default viewport
            defaultViewport: 'desktop',
        },
    },
    argTypes: {
        color: ['text-youtube', 'text-linkedin', 'text-spotify', 'text-primary', 'text-white'],
    },
    args: {} as IIconButton,
};

export const IconButtonStory = () =>
    (
        <div className="relative flex w-max flex-row gap-5 p-4">
            <IconButton color={'text-youtube'} icon={faYoutube} href="" />
            <IconButton color={'text-spotify'} icon={faSpotify} href="" />
            <IconButton color={'text-linkedin'} icon={faLinkedin} href="" />
        </div>
    ) as ComponentMeta<typeof IconButton>;
