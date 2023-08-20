import React, { PropsWithChildren } from 'react';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IIconButton extends PropsWithChildren {
    icon?: IconDefinition;
    color:
        | string
        | 'text-youtube'
        | 'text-linkedin'
        | 'text-spotify'
        | 'text-primary'
        | 'text-white';
    href: string;
    target?: string;
}

export const IconButton: React.FC<IIconButton> = (props) => {
    const { icon, href, color, target, children } = props;

    return (
        <>
            <Link href={href} target={target} className="group relative">
                {icon && <FontAwesomeIcon icon={icon} className={`z-1 h-5 md:h-6 ${color}`} />}
                {!icon && children}
                <div className="absolute left-0 top-0 z-0 aspect-[1/1] h-5 w-5 rounded-full bg-neutral-300/50 opacity-0 transition-all group-hover:scale-125 group-hover:animate-ping group-hover:opacity-100 md:h-6 md:w-6" />
            </Link>
        </>
    );
};

IconButton.defaultProps = {
    target: '_self',
};
