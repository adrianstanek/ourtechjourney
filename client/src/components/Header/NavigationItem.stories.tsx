// /stories/pages/home.stories.jsx
import '../../../styles/globals.scss';
import React from 'react';
import { NavigationItem } from './NavigationItem';

export default {
    title: 'Header/NavigationItem',
    component: NavigationItem,
};

export const NavigationItemStory = () => (
    <>
        <div className="relative flex flex-row gap-8 p-10">
            <NavigationItem href="/">About us</NavigationItem>
            <NavigationItem href="/">
                <span className="text-primary">cloud</span>
                <span className="text-wbGray">bar</span>
            </NavigationItem>
        </div>
    </>
);
