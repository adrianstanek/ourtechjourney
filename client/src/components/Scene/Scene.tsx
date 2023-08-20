import React, { PropsWithChildren } from 'react';
import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';

interface IScene extends PropsWithChildren {
    testId?: string;
}

export const Scene: React.FC<IScene> = (props) => {
    const { testId, children } = props;

    return (
        <>
            <Header />
            <div className="relative flex w-screen flex-col">
                <div
                    className="relative h-full min-h-screen w-full"
                    data-test-id={testId ?? undefined}
                    id="headerWrapper"
                >
                    <div className="relative z-0 flex w-screen flex-col gap-10 md:gap-14 lg:gap-28">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

Scene.defaultProps = {};
