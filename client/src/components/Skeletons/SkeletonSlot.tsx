import React from 'react';

export const SkeletonSlot: React.FC = () => {
    return (
        <>
            <div className="relative block h-11 min-w-[88px]  grow animate-pulse rounded-[4px] bg-neutral-500/10 lg:aspect-[48/24] lg:grow-0"></div>
        </>
    );
};
