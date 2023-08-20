import React, { Fragment, PropsWithChildren } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { nanoid } from 'nanoid';

export interface IPopOverMenuItem {
    id?: string;
    Component: JSX.Element;
}

interface IPopOverMenu extends PropsWithChildren {
    items: IPopOverMenuItem[];
}

export const PopOverMenu: React.FC<IPopOverMenu> = (props) => {
    const { items, children } = props;

    return (
        <>
            <div className="fixed relative z-[100] w-full">
                <Popover className="relative">
                    {() => (
                        <>
                            <Popover.Button className="" data-test-id="headerProfileAvatarButton">
                                {children}
                            </Popover.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-200"
                                enterFrom="opacity-0 translate-y-1"
                                enterTo="opacity-100 translate-y-0"
                                leave="transition ease-in duration-150"
                                leaveFrom="opacity-100 translate-y-0"
                                leaveTo="opacity-0 translate-y-1"
                            >
                                <Popover.Panel className="absolute top-8 right-0 z-[100] mt-2 w-[200px] shadow">
                                    <nav className="relative flex min-h-[100px] w-full flex-col gap-4 bg-white px-4 py-4 pl-6">
                                        {items &&
                                            items.map((item) => {
                                                return (
                                                    <div key={`menu-item-${item.id ?? nanoid()}`}>
                                                        {item.Component}
                                                    </div>
                                                );
                                            })}
                                    </nav>
                                </Popover.Panel>
                            </Transition>
                        </>
                    )}
                </Popover>
            </div>
        </>
    );
};
