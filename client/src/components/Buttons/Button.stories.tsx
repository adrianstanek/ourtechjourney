// /stories/pages/home.stories.jsx
import '../../../styles/globals.scss';
import { Button } from './Button';
import React from 'react';

export default {
    title: 'Buttons/Button',
    component: Button,
};

export const ButtonStory = () => (
    <>
        <div className="relative grid w-full max-w-5xl grid-cols-2 gap-10 bg-neutral-700 p-8">
            <div className="relative flex flex-col gap-10">
                <label className="text-white">Small</label>
                <Button onClick={() => {}} color="primary">
                    Primary
                </Button>
                <Button onClick={() => {}} color="primary-light">
                    Primary Light
                </Button>
                <Button onClick={() => {}} color="default">
                    Default
                </Button>
                <Button onClick={() => {}} color="white">
                    White
                </Button>
                <Button onClick={() => {}} color="yellow">
                    Yellow
                </Button>

                <label className="text-white">Large</label>
                <Button onClick={() => {}} color="primary" size={'large'}>
                    Primary
                </Button>
                <Button onClick={() => {}} color="primary-light" size={'large'}>
                    Primary Light
                </Button>
                <Button onClick={() => {}} color="default" size={'large'}>
                    Default
                </Button>
                <Button onClick={() => {}} color="white" size={'large'}>
                    White
                </Button>
                <Button onClick={() => {}} color="yellow" size={'large'}>
                    Yellow
                </Button>
            </div>

            <div className="relative flex flex-col gap-10">
                <label className="text-white">Small / disabled</label>
                <Button onClick={() => {}} color="primary" disabled>
                    Primary (disabled)
                </Button>
                <Button onClick={() => {}} color="primary-light" disabled>
                    Primary Light (disabled)
                </Button>
                <Button onClick={() => {}} color="default" disabled>
                    Default (disabled)
                </Button>
                <Button onClick={() => {}} color="white" disabled>
                    White (disabled)
                </Button>
                <Button onClick={() => {}} color="yellow" disabled>
                    Yellow (disabled)
                </Button>

                <label className="text-white">Large / disabled</label>
                <Button onClick={() => {}} color="primary" disabled size={'large'}>
                    Primary (disabled)
                </Button>
                <Button onClick={() => {}} color="primary-light" disabled size={'large'}>
                    Primary Light (disabled)
                </Button>
                <Button onClick={() => {}} color="default" disabled size={'large'}>
                    Default (disabled)
                </Button>
                <Button onClick={() => {}} color="white" disabled size={'large'}>
                    White (disabled)
                </Button>
                <Button onClick={() => {}} color="yellow" disabled size={'large'}>
                    Yellow (disabled)
                </Button>
            </div>
        </div>
    </>
);
