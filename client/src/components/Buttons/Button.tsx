import React, { PropsWithChildren, useMemo } from 'react';
import { IconDefinition } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

interface IButton extends PropsWithChildren {
    onClick?: () => void;
    href?: string;
    target?: string;
    addtionalCss?: string;
    color?:
        | 'primary'
        | 'primary-light'
        | 'secondary'
        | 'default'
        | 'danger'
        | 'white'
        | 'yellow'
        | 'orange';
    iconEnd?: IconDefinition;
    iconStart?: IconDefinition;
    iconSpin?: boolean;
    disabled?: boolean;
    size?: 'small' | 'large';
}

export const Button: React.FC<IButton> = (props) => {
    const {
        children,
        addtionalCss,
        onClick,
        color,
        iconEnd,
        iconStart,
        href,
        target,
        disabled,
        iconSpin,
        size,
    } = props;

    const colorUsed = useMemo(() => {
        switch (color) {
            case 'primary':
                return 'bg-primary hover:bg-primary-light';
            case 'yellow':
                return 'bg-wbYellow hover:bg-wbYellow-dark';
            case 'orange':
                return 'bg-wbOrange hover:bg-wbOrange-dark';
            case 'white':
                return 'bg-white hover:bg-primary';
            case 'primary-light':
                return 'bg-primary-light hover:bg-primary';
            case 'secondary':
                return 'bg-secondary hover:bg-secondary-light';
            case 'danger':
                return 'bg-red-700 bg-red-700/60';
        }

        return 'bg-neutral-300';
    }, [color]);

    const textColorUsed = useMemo(() => {
        switch (color) {
            case 'primary':
                return 'text-white';
            case 'white':
                return 'text-primary group-hover:text-white';
            case 'yellow':
                return 'text-primary-dark group-hover:text-white';
            case 'orange':
                return 'text-white group-hover:text-white';
            case 'primary-light':
                return 'text-primary-dark group-hover:text-white';
            case 'secondary':
                return 'text-white';
            case 'danger':
                return 'text-white';
        }

        return 'text-neutral-600';
    }, [color]);

    const iconSpinStyle = useMemo(() => {
        return iconSpin ? 'animate-spin' : '';
    }, [iconSpin]);

    const fontSize = useMemo(() => {
        if (size === 'large') return 'text-sm md:text-xl';

        return 'text-sm';
    }, [size]);

    const buttonSize = useMemo(() => {
        if (size === 'large') return 'h-10 md:h-10';

        return 'h-8';
    }, [size]);

    return (
        <>
            {onClick && !href && (
                <button
                    onClick={onClick}
                    role="button"
                    disabled={disabled}
                    className={`group relative flex items-center justify-center gap-2 rounded px-4 py-0 uppercase ring-wbYellow ring-offset-transparent transition-all hover:ring-2 ${colorUsed} ${buttonSize} ${
                        addtionalCss ?? ''
                    } ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                >
                    {iconStart && (
                        <FontAwesomeIcon
                            icon={iconStart}
                            className={`${textColorUsed} ${iconSpinStyle}`}
                        />
                    )}
                    <span className={`${fontSize} ${textColorUsed} flex-nowrap whitespace-nowrap `}>
                        {children}
                    </span>
                    {iconEnd && (
                        <FontAwesomeIcon
                            icon={iconEnd}
                            className={`${textColorUsed} ${iconSpinStyle}`}
                        />
                    )}
                </button>
            )}

            {href && (
                <Link
                    href={href}
                    onClick={onClick}
                    target={target}
                    className={`group relative flex items-center justify-center gap-2 rounded px-4 py-0 uppercase ring-wbYellow ring-offset-transparent transition-all hover:ring-2 ${colorUsed} ${buttonSize} ${
                        addtionalCss ?? ''
                    }`}
                >
                    {iconStart && (
                        <FontAwesomeIcon
                            icon={iconStart}
                            className={`${textColorUsed} ${iconSpinStyle}`}
                        />
                    )}
                    <span
                        className={`${fontSize} ${textColorUsed} flex-nowrap whitespace-nowrap font-semibold lg:font-medium`}
                    >
                        {children}
                    </span>
                    {iconEnd && (
                        <FontAwesomeIcon
                            icon={iconEnd}
                            className={`${textColorUsed} ${iconSpinStyle}`}
                        />
                    )}
                </Link>
            )}
        </>
    );
};

Button.defaultProps = {
    color: 'default',
    disabled: false,
    target: '_self',
    iconSpin: false,
    size: 'small',
};
