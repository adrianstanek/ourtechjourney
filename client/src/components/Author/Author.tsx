import React from 'react';
import { Avatar } from '../Avatar/Avatar';
import { IAuthor } from '../../interfaces/IAuthor';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';

export interface IAuthorProps {
    author: IAuthor;
}

export const Author: React.FC<IAuthorProps> = (props) => {
    const { author } = props;

    return (
        <>
            <section className="relative flex flex-row items-center gap-2">
                <Avatar author={author} small={true} />
                <div className="relative flex flex-col gap-0">
                    <span className="flex w-full pt-1 font-medium text-primary-light">
                        {author.userName}
                    </span>
                    <div>
                        {author.instagram && (
                            <Link href={author.instagram?.url}>
                                <FontAwesomeIcon
                                    icon={faInstagram}
                                    className="h-6 text-primary-light"
                                />
                            </Link>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
