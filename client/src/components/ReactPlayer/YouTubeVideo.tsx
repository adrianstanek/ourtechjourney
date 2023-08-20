import React from "react";
import ReactPlayer from 'react-player';

export const YouTubeVideo = ({url}: { url: string }) => {
    return <section className="relative w-full py-2 md:py-4 lg:py-8">
        <div className="mx-auto w-full max-w-5xl">
            <div className="relative pt-[56.25%]">
                <ReactPlayer url={url} loop={true} playing={true} muted={true} width="100%" height="100%" className="absolute top-0 left-0"/>
            </div>
        </div>
    </section>
}
