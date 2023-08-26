import React, { useCallback } from 'react';
import { Button } from '../Buttons/Button';
import { IMoment } from '../../interfaces/Moment.interfaces';

export interface IAddMediaBox {
    moment: IMoment;
}

export const AddMediaBox: React.FC<IAddMediaBox> = (props) => {
    const { moment } = props;

    const openCamera = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log(moment);
    }, [moment]);

    const upload = useCallback(() => {
        // eslint-disable-next-line no-console
        console.log(moment);
    }, [moment]);

    return (
        <div className="relative flex aspect-[1/1] w-full flex-col items-center justify-center gap-4 border-4 border-dotted border-primary bg-primary-light/20">
            <button onClick={openCamera}>
                <img
                    src="/assets/icons/noun-photo-6015903-527970.svg"
                    alt="camera"
                    className="h-24"
                />
            </button>
            <Button onClick={upload} color="primary">
                Hochladen
            </Button>
        </div>
    );
};
