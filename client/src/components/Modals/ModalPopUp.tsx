import { Transition } from '@headlessui/react';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { faCompress, faExpand } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IModalPopUp extends PropsWithChildren {
    show: boolean;
    closeAction: () => void;
}

export const ModalPopUp: React.FC<IModalPopUp> = (props) => {
    const { show, children, closeAction } = props;

    const [previewMode, setPreviewMode] = useState(true);

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
        return previewMode ? 'h-[calc(100svh-250px)]' : 'h-[calc(100svh-60px)]';
    }, [previewMode]);

    return (
        <>
            <Transition
                show={show}
                appear={show}
                id="test1"
                as={'div'}
                className={`duration-750 fixed bottom-0 left-0 z-[1000] h-max w-screen overflow-x-hidden overflow-y-scroll bg-white py-2 transition-all`}
                enter="transition-all ease-in-out"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                <div className={`relative flex w-full flex-col gap-1 transition-all ${height}`}>
                    {/* Fullscreen Button (Preview-Off) */}
                    <button
                        className="absolute right-1 top-3 z-50 flex h-8 w-8 flex-row items-center justify-center gap-1"
                        onClick={() => setPreviewMode(!previewMode)}
                    >
                        {previewMode && (
                            <FontAwesomeIcon icon={faExpand} className="h-6 text-neutral-500" />
                        )}
                        {!previewMode && (
                            <FontAwesomeIcon icon={faCompress} className="h-6 text-neutral-500" />
                        )}
                    </button>

                    {children}
                </div>
            </Transition>
        </>
    );
};
