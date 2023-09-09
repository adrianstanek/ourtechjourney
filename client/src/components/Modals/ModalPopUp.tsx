import { Transition } from '@headlessui/react';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import {
    faDownLeftAndUpRightToCenter,
    faUpRightAndDownLeftFromCenter,
} from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IModalPopUp extends PropsWithChildren {
    show: boolean;
    closeAction: () => void;
    previewModeDefault?: boolean;
}

export const ModalPopUp: React.FC<IModalPopUp> = (props) => {
    const { show, children, closeAction, previewModeDefault } = props;

    const [previewMode, setPreviewMode] = useState(previewModeDefault ?? true);

    useEffect(() => {
        // Push the current state to create a new history entry
        window.history.pushState(null, document.title, window.location.href);

        // Define your callback function
        const handleBackButton = () => {
            closeAction();

            // Push the state again to effectively nullify the back button
            window.history.pushState(null, document.title, window.location.href);
        };

        // Attach the event listener
        window.addEventListener('popstate', handleBackButton);

        // Cleanup the event listener when the component is unmounted
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [closeAction]);

    const height = useMemo(() => {
        return previewMode
            ? 'h-[calc(100svh-250px)] top-[250px]'
            : 'h-[calc(100svh-60px)] top-[60px]';
    }, [previewMode]);

    return (
        <>
            <Transition
                show={show}
                appear={show}
                id="test1"
                as={'div'}
                className={`duration-750 fixed left-0 z-[100000000] ${height} w-screen overflow-x-hidden overflow-y-scroll bg-white transition-all`}
                enter="transition-all ease-in-out"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                <div className={`relative flex w-full flex-col gap-1 transition-all `}>
                    {/* Fullscreen Button (Preview-Off) */}
                    <button
                        className="absolute right-1 top-1 z-50 flex h-8 w-8 flex-row items-center justify-center gap-1"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode && (
                            <FontAwesomeIcon
                                icon={faUpRightAndDownLeftFromCenter}
                                className="h-4 text-neutral-200"
                            />
                        )}
                        {!previewMode && (
                            <FontAwesomeIcon
                                icon={faDownLeftAndUpRightToCenter}
                                className="h-4 text-neutral-200"
                            />
                        )}
                    </button>

                    {children}
                </div>
            </Transition>
        </>
    );
};
