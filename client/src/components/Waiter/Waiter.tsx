import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';

interface IWaiter {}

export const Waiter: React.FC<IWaiter> = () => {
    return (
        <>
            <div className="relative flex h-full w-full items-center justify-center">
                <FontAwesomeIcon icon={faSync} className="h-12 w-12 animate-spin text-body/50" />
            </div>
        </>
    );
};
