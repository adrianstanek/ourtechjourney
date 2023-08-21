import React from 'react';

export interface IAppBar {}

export const AppBar: React.FC<IAppBar> = () => {
    return (
        <>
            <section className="relative flex h-16 w-full flex-row items-center justify-center gap-1">
                <button className="relative -top-2 mx-auto flex aspect-[1/1] h-16 items-center justify-center rounded-full bg-primary-dark text-secondary ring-2 ring-offset-2 ring-offset-white focus:outline-0 focus:ring">
                    <img
                        src="/assets/icons/noun-moment-2700515-E4F9F5.svg"
                        className="h-12"
                        alt="Create a Moment"
                    />
                </button>
            </section>
        </>
    );
};
