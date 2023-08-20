import React, { PropsWithChildren } from 'react';
import Link from 'next/link';

interface INavigationItem extends PropsWithChildren {
    href: string;
    target?: string;
}

export const NavigationItem: React.FC<INavigationItem> = (props) => {
    const { href, children } = props;

    return (
        <>
            <Link href={href} className="text-base text-primary  md:text-lg">
                {children}
            </Link>
        </>
    );
};

NavigationItem.defaultProps = {
    target: '_self',
};
