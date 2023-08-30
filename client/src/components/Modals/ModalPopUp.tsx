import { Transition } from '@headlessui/react';
import React, { PropsWithChildren, useEffect, useMemo, useState } from 'react';

export interface IModalPopUp extends PropsWithChildren {
    show: boolean;
    closeButton: boolean;
    closeAction: () => void;
}

export const ModalPopUp: React.FC<IModalPopUp> = (props) => {
    const { show, children, closeButton, closeAction } = props;

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
        return previewMode ? 'h-[calc(100svh-250px)]' : 'h-[calc(100svh-40px)]';
    }, [previewMode]);

    return (
        <>
            <Transition
                show={show}
                appear={show}
                as={'div'}
                className={`duration-750 fixed bottom-0 left-0 z-[1000] w-screen overflow-x-hidden overflow-y-scroll bg-white p-2 ${height}`}
                enter="transition-all ease-in-out"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                {/*{previewMode && (*/}
                {/*    <div className="relative flex w-full flex-row gap-1">*/}
                {/*        <div className="w-max bg-white px-4 py-1">*/}
                {/*            <FontAwesomeIcon*/}
                {/*                icon={faChevronDoubleUp}*/}
                {/*                className="h-4 text-neutral-500"*/}
                {/*            />*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*)}*/}

                {children}
            </Transition>
        </>
    );
};
