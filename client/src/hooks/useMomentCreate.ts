import { useCallback, useMemo } from 'react';
import useGeolocation from './useGeolocation';
import { IMoment } from '../interfaces/Moment.interfaces';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { useStories } from './storage/useStories';
import { useDeviceDirection } from './useDeviceDirection';
import { useMoments } from './storage/useMoments';
import Jimp from 'jimp';
import { IMedia } from '../interfaces/Media.interfaces';
import { useStorage } from './storage/useStorage';
import { useSetRecoilState } from 'recoil';
import { appStateRecoil } from '../recoil/appState';

export const useMomentCreate = () => {
    const { latitude: geoLatitude, longitude: geoLongitude } = useGeolocation();

    const setAppState = useSetRecoilState(appStateRecoil);

    const { currentStory } = useStories();
    const { rotation, hasDeviceOrientation } = useDeviceDirection();
    const { createMoment, getCloseMoments } = useMoments();

    const { mediaDb, momentDb } = useStorage();

    const currentRotation = useMemo(() => {
        if (!hasDeviceOrientation) return null;
        if (hasDeviceOrientation) return rotation;
    }, [hasDeviceOrientation, rotation]);

    const saveMoment = useCallback(
        async (file: File) => {
            // Create first Media
            const arrayBuffer = await file.arrayBuffer(); // Resolve the Promise
            const buffer = Buffer.from(arrayBuffer); // Convert ArrayBuffer to Buffer
            const image = await Jimp.read(buffer); // Now this should work
            const mediaId = nanoid();
            await mediaDb.setItem(mediaId, image.getBase64Async(image.getMIME()));

            const newMedia: IMedia = {
                id: mediaId,
                height: image.getHeight(),
                width: image.getWidth(),
                mimeType: 'image/jpeg',
                alt: '',
                mediaId: mediaId,
            };

            await getCloseMoments({
                latitude: geoLatitude ?? 0,
                longitude: geoLongitude ?? 0,
            }).then(async (moments) => {
                // Closest Moment existing in closer than 100m range
                if (moments[0]) {
                    const existingMoment: IMoment = { ...moments[0] };
                    existingMoment.media.push(newMedia);

                    await momentDb.setItem(existingMoment.id, existingMoment).then(() => {
                        setAppState((currVal) => {
                            return { ...currVal, storageUpdate: dayjs().toISOString() };
                        });
                    });
                } else {
                    // Create a new moment in storage
                    const newMoment: IMoment = {
                        id: nanoid(),
                        latitude: geoLatitude,
                        longitude: geoLongitude,
                        created: dayjs().toISOString(),
                        parentStory: currentStory?.id ?? null,
                        type: null,
                        media: [newMedia],
                        description: '',
                        label: '',
                        direction: currentRotation,
                    };

                    void createMoment(newMoment);
                }
            });
        },
        [
            createMoment,
            currentRotation,
            currentStory?.id,
            geoLatitude,
            geoLongitude,
            getCloseMoments,
            mediaDb,
            momentDb,
            setAppState,
        ]
    );

    return { saveMoment };
};
