import React, { useMemo } from 'react';
import { IPopOverMenuItem, PopOverMenu } from '../PopOver/PopOverMenu';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/pro-duotone-svg-icons';
import { NavigationItem } from './NavigationItem';

interface IBurgerMenu {}

export const BurgerMenu: React.FC<IBurgerMenu> = () => {
    const popOverItems = useMemo((): IPopOverMenuItem[] => {
        return [
            // {
            //     id: 'burgerMenu-cloudbar',
            //     Component: (
            //         <NavigationItem href="/cloudbar">
            //             <span className="text-primary">cloud</span>
            //             <span className="text-wbGray">bar</span>
            //         </NavigationItem>
            //     ),
            // },
            {
                id: 'burgerMenu-ctofellow',
                Component: (
                    <NavigationItem href="/ctofellow">
                        <span className="text-primary">CTO</span>
                        <span className="text-wbGray">Fellow</span>
                    </NavigationItem>
                ),
            },
            {
                id: 'burgerMenu-team',
                Component: (
                    <NavigationItem href="/team">
                        <span>team</span>
                    </NavigationItem>
                ),
            },
            // {
            //     id: 'burgerMenu-about',
            //     Component: (
            //         <NavigationItem href="/about">
            //             <span>about</span>
            //         </NavigationItem>
            //     ),
            // },
        ];
    }, []);

    return (
        <>
            <div className="relative">
                <PopOverMenu items={popOverItems}>
                    <FontAwesomeIcon icon={faBars} className="h-5 text-primary" />
                </PopOverMenu>
            </div>
        </>
    );
};
