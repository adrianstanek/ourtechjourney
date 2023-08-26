import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons/faFacebook';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons/faShareAlt';
import { faInstagram } from '@fortawesome/free-brands-svg-icons/faInstagram';
import Link from 'next/link';

const ShareRow: React.FC = () => {
    const [currentUrl, setCurrentUrl] = useState('');
    const [canShare, setCanShare] = useState(false);

    useEffect(() => {
        setCurrentUrl(window.location.href);
    }, []);

    const determineCanShare = useCallback(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setCanShare(typeof window.navigator.share === 'function');
    }, []);

    useEffect(() => {
        determineCanShare();
    }, [determineCanShare]);

    return (
        <>
            <div className="relative flex flex-row">
                <div className="relative p-3 text-2xl text-primary transition-all hover:text-primary">
                    <Link href="https://www.instagram.com/create/story" target="instagram">
                        <FontAwesomeIcon icon={faInstagram} />
                    </Link>
                </div>
                <div className="relative p-3 text-2xl text-primary transition-all hover:text-primary">
                    <TwitterShareButton url={currentUrl}>
                        <FontAwesomeIcon icon={faTwitter} />
                    </TwitterShareButton>
                </div>
                <div className="relative p-3 text-2xl text-primary transition-all hover:text-primary">
                    <FacebookShareButton url={currentUrl}>
                        <FontAwesomeIcon icon={faFacebook} />
                    </FacebookShareButton>
                </div>
                <div className="relative p-3 text-2xl text-primary transition-all hover:text-primary">
                    <WhatsappShareButton url={currentUrl}>
                        <FontAwesomeIcon icon={faWhatsapp} />
                    </WhatsappShareButton>
                </div>
                {canShare && (
                    <div className="relative p-3 text-2xl text-primary transition-all hover:text-primary">
                        <button
                            name="share"
                            aria-label="share"
                            type="button"
                            onClick={() => {
                                void navigator
                                    .share({ url: currentUrl })
                                    .then((value) => {
                                        // eslint-disable-next-line no-console
                                        console.log(value);
                                    })
                                    .catch((e) => {
                                        // eslint-disable-next-line no-console
                                        console.log(e);
                                    });
                            }}
                        >
                            <FontAwesomeIcon icon={faShareAlt} />
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default ShareRow;
