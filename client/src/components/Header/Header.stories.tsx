// /stories/pages/home.stories.jsx
import '../../../styles/globals.scss';
import React from 'react';
import { Header } from './Header';

export default {
    title: 'Header/Header',
    component: Header,
};

export const HeaderStory = () => (
    <>
        <div className="relative flex h-screen w-screen">
            <Header />
        </div>
    </>
);
