import React, { PropsWithChildren } from 'react';
import { useRecoilValue } from 'recoil';
import { getHeaderCollapsed } from '../../recoil/appState';

interface IScene extends PropsWithChildren {
    testId?: string;
}

export const Scene: React.FC<IScene> = (props) => {
    const { testId, children } = props;

    const collapsed = useRecoilValue(getHeaderCollapsed);

    return (
        <>
            <div className="relative flex w-screen flex-col">
                <div
                    className={`relative w-full ${collapsed ? '' : 'mt-[300px]'}`}
                    data-test-id={testId ?? undefined}
                    id="headerWrapper"
                >
                    {children}
                </div>
            </div>
        </>
    );
};

Scene.defaultProps = {};
