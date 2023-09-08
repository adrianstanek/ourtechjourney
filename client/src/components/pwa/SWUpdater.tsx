import React, { useCallback, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { Workbox } from 'workbox-window';

export const SWUpdater: React.FC = () => {
    const [show, setShow] = useState(false);

    const [sw, setSw] = useState<Workbox | null>(null);

    useEffect(() => {
        const isDevelopment = process.env.NODE_ENV === 'development';

        if ('serviceWorker' in window.navigator && !isDevelopment) {
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
        const isDevelopment = process.env.NODE_ENV === 'development';

        // Must the singelton instance of sw in state
        if ('serviceWorker' in window.navigator && sw && !isDevelopment) {
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

    return (
        <>
            {show && (
                <div className="group fixed bottom-1 right-1 z-[20000] h-max w-max rounded border border-primary bg-white px-2 shadow shadow-neutral-500 transition-all">
                    <span className="inline-flex items-center justify-center gap-x-1 text-xs text-primary">
                        Neue Version installiert.{' '}
                        <button
                            onClick={() => {
                                reloadAndUpdate();
                            }}
                            className="inline underline"
                        >
                            Neu laden
                        </button>
                        <button
                            onClick={() => {
                                setShow(false);
                            }}
                            className="inline underline"
                        >
                            <FontAwesomeIcon
                                icon={faXmark}
                                className="ml-2 h-4 text-neutral-400 transition-all hover:text-primary"
                            />
                        </button>
                    </span>
                </div>
            )}

            {/*<Modal show={show} afterClose={() => {}} closeable={false}>*/}
            {/*    <section className=" relative mt-10 flex h-full w-full flex-col items-center justify-center p-6 sm:flex-row">*/}
            {/*        <div>*/}
            {/*            <h1 className="w-full text-center font-serif text-xl text-primary sm:text-left">*/}
            {/*                Eine neue Version ist verfügbar!*/}
            {/*            </h1>*/}
            {/*            <span className="mt-3 flex w-full max-w-[400px] text-center text-sm text-neutral-500 sm:text-left">*/}
            {/*                Die App muss neu geladen werden. Dazu kannst du einfach auf den Button*/}
            {/*                drücken. Die App wird daraufhin neustarten und das Update bereitstellen.*/}
            {/*            </span>*/}
            {/*        </div>*/}

            {/*        <img*/}
            {/*            src="/assets/icons/noun-happy-1603040-71D358.svg"*/}
            {/*            className="mt-4 w-32 sm:w-52"*/}
            {/*            alt="logo"*/}
            {/*        />*/}
            {/*    </section>*/}

            {/*    <section className="relative flex w-full items-center justify-center gap-2">*/}
            {/*        <button className="buttonLarge bg-success" onClick={() => reloadAndUpdate()}>*/}
            {/*            <span>Jetzt neustarten</span>*/}
            {/*        </button>*/}
            {/*    </section>*/}
            {/*</Modal>*/}
        </>
    );
};
