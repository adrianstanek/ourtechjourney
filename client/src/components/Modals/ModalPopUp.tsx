import { Transition } from '@headlessui/react';
import React, { PropsWithChildren } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/pro-thin-svg-icons';

export interface IModalPopUp extends PropsWithChildren {
    show: boolean;
    closeButton: boolean;
    closeAction: () => void;
}

export const ModalPopUp: React.FC<IModalPopUp> = (props) => {
    const { show, children, closeButton, closeAction } = props;

    return (
        <>
            <Transition
                show={show}
                appear={show}
                as={'section'}
                className="duration-750 fixed bottom-0 left-0 z-[1000] h-[calc(100svh-50px)] w-screen overflow-x-hidden overflow-y-scroll bg-white p-2"
                enter="transition-all ease-in-out"
                enterFrom="opacity-0 translate-y-24"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-24"
            >
                {closeButton && (
                    <button className="absolute right-3 top-5" onClick={closeAction}>
                        <FontAwesomeIcon icon={faXmark} className="h-8 text-neutral-500" />
                    </button>
                )}
                {children}
            </Transition>
        </>
    );
};
