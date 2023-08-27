import React from 'react';

export interface IAppBar {}

export const AppBar: React.FC<IAppBar> = () => {
    return (
        <>
            <section className="relative z-20 flex h-16 w-full flex-row items-center justify-center gap-4">
                <button
                    id="newMomentButton"
                    role="button"
                    aria-label="Create new Moment"
                    className="relative -top-2  flex aspect-[1/1] h-16 items-center justify-center rounded-full bg-primary-dark text-secondary ring-2 ring-offset-2 ring-offset-white focus:outline-0 focus:ring"
                >
                    <img
                        src="/assets/icons/noun-moment-2700515-E4F9F5.svg"
                        className="h-12"
                        alt="Create a Moment"
                    />
                </button>

                <button
                    id="newStoryButton"
                    role="button"
                    aria-label="Start new Story"
                    className="absolute right-2 top-2  flex aspect-[1/1] h-12 items-center justify-center rounded-full bg-primary-dark text-secondary ring-2 ring-offset-2 ring-offset-white focus:outline-0 focus:ring"
                >
                    <img
                        src="/assets/icons/noun-story-3203471-E4F9F5.svg"
                        className="relative -top-[1px] h-7"
                        alt="Create a Moment"
                    />
                </button>
            </section>
        </>
    );
};
