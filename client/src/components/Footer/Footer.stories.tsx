import '../../../styles/globals.scss';
import { ComponentMeta } from '@storybook/react';
import { Footer } from './Footer';

export default {
    title: 'Footer',
    component: Footer,
    parameters: {
        viewport: {
            //👇 Your own default viewport
            defaultViewport: 'desktop',
        },
    },
    argTypes: {},
    args: {},
};

export const FooterStory = (args) =>
    (
        <>
            <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-1">
                <Footer {...args} />
            </div>
        </>
    ) as ComponentMeta<typeof Footer>;
