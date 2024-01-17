import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Workbox } from 'workbox-window';
import { Transition } from '@headlessui/react';

export const SWUpdater: React.FC = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [sw, setSw] = useState<Workbox | null>(null);

    useEffect(() => {
        if ('serviceWorker' in window.navigator) {
            const wb = new Workbox('/service-worker.js');

            setSw(wb);

            wb.addEventListener('activated', (e) => {
                if (e.isUpdate) {
                    // eslint-disable-next-line no-console
                    console.log('Serviceworker successfully updated!');
                } else {
                    // eslint-disable-next-line no-console
                    console.log('Serviceworker installed! App is now available offline!');
                }
            });

            wb.addEventListener('controlling', (e) => {
                // eslint-disable-next-line no-console
                console.log('1', e);
                if (e.isUpdate) {
                    // eslint-disable-next-line no-console
                    console.log('Service worker announced an update. Reloading window!');
                    window.location.reload();
                }
            });

            wb.addEventListener('waiting', () => {
                setShow(true);
            });

            wb.register().catch((e) => {
                console.error('could not register sw', e);
            });
        }
    }, []);

    const reloadAndUpdate = useCallback(() => {
        // Must the singelton instance of sw in state
        if ('serviceWorker' in window.navigator && sw) {
            sw?.addEventListener('controlling', (e) => {
                // eslint-disable-next-line no-console
                console.log(e, 'Controlling!');
                window.location.reload();
            });

            // eslint-disable-next-line no-console
            console.log('messageSkipWaiting');
            // wb.messageSkipWaiting();

            sw?.messageSkipWaiting();
        }
    }, [sw]);

    const border = useMemo(() => {
        return 'shadow shadow-neutral-500 border border-primary rounded';
    }, []);

    const animation = useMemo(() => {
        return 'opacity-75 transition-all hover:opacity-100';
    }, []);

    return (
        <>
            {show && (
                <Transition
                    as={'div'}
                    className={`fixed bottom-2 right-2 z-50 w-[25ßpx] bg-white p-4 px-2 ${animation} ${border}`}
                    show={show ?? false}
                    appear={show ?? false}
                    enter="transition ease-in-out duration-500"
                    enterFrom="transform translate-x-full"
                    enterTo="transform opacity-100 translate-x-0"
                    leave="transition ease-out duration-300"
                    leaveFrom="transform opacity-100 translate-x-0"
                    leaveTo="transform opacity-0 translate-x-full"
                >
                    <div className={`relative flex w-full flex-col gap-1`}>
                        <span>New version available.</span>
                        <button
                            className=""
                            disabled={loading}
                            onClick={() => {
                                reloadAndUpdate();
                                setLoading(true);
                            }}
                            color={loading ? 'neutral' : 'primary'}
                        >
                            Reload
                        </button>
                    </div>
                </Transition>
            )}
        </>
    );
};
