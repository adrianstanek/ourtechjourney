import { useCallback, useEffect, useState } from 'react';
import { useStorage } from './useStorage';
import { IMoment } from '../../interfaces/Moment.interfaces';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appStateRecoil, getSelectedStory, getStorageUpdate } from '../../recoil/appState';
import { nanoid } from 'nanoid';
import { ILngLat } from '../../components/MapBoxMap/interfaces/ILngLat';
import dayjs from 'dayjs';

export const useMoments = () => {
    const { momentDb } = useStorage();

    const selectedStory = useRecoilValue(getSelectedStory);

    const setAppState = useSetRecoilState(appStateRecoil);

    const storageUpdate = useRecoilValue(getStorageUpdate);

    const [lastUpdate, setLastUpdate] = useState<string>('');

    const getOtherMoments = useCallback(async () => {
        const moments: IMoment[] = [];

        await momentDb.iterate((value: IMoment) => {
            if (value.parentStory !== selectedStory?.id || selectedStory === null) {
                moments.push(value);
            }
        });

        return moments;
    }, [momentDb, selectedStory]);

    const [currentMoments, setCurrentMoments] = useState<null | IMoment[]>(null);

    useEffect(() => {
        if (storageUpdate !== lastUpdate) {
            void getOtherMoments().then((moments) => {
                setCurrentMoments(moments);
            });

            setLastUpdate(storageUpdate);
        }
    }, [getOtherMoments, lastUpdate, storageUpdate]);

    const createMoment = useCallback(
        async (moment: IMoment) => {
            const id = moment.id ?? nanoid();

            // Add Moment to DB
            await momentDb.setItem(id, moment).then(() => {
                setAppState((currVal) => {
                    return { ...currVal, storageUpdate: dayjs().toISOString() };
                });
            });
        },
        [momentDb, setAppState]
    );

    const updateMoment = useCallback(
        async (moment: IMoment) => {
            await momentDb.setItem(moment.id, moment).then(() => {
                // Fire Updates
                setAppState((currVal) => {
                    if (currVal.selectedMoment) {
                        return {
                            ...currVal,
                            storageUpdate: dayjs().toISOString(),
                            selectedMoment: moment,
                        };
                    }

                    return {
                        ...currVal,
                        storageUpdate: dayjs().toISOString(),
                    };
                });
            });
        },
        [momentDb, setAppState]
    );

    const haversineDistance = (coords1: ILngLat, coords2: ILngLat) => {
        const R = 6371e3; // Radius of the Earth in meters
        const lat1 = (coords1.latitude * Math.PI) / 180;
        const lat2 = (coords2.latitude * Math.PI) / 180;
        const dLat = ((coords2.latitude - coords1.latitude) * Math.PI) / 180;
        const dLon = ((coords2.longitude - coords1.longitude) * Math.PI) / 180;

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c; // Distance in meters
    };

    const momentIsNearExisting = useCallback((moment: IMoment, target: ILngLat) => {
        if (moment.latitude === null || moment.longitude === null) {
            return false;
        }

        return haversineDistance(
            { latitude: moment.latitude, longitude: moment.longitude },
            target
        );
    }, []);

    const getCloseMoments = useCallback(
        async (target: ILngLat) => {
            // TODO maybe implement storageUpdate here as well?

            const moments: IMoment[] = [];

            const distanceInMeter = 100;

            await momentDb.iterate((moment: IMoment) => {
                const distance = momentIsNearExisting(moment, target);

                if (
                    distance <= distanceInMeter &&
                    distance !== null &&
                    distance !== undefined &&
                    distance !== false
                ) {
                    moments.push({ ...moment, distanceToCurrent: distance });
                }
            });

            return moments.sort((a, b) => {
                if (a.distanceToCurrent === undefined && b.distanceToCurrent === undefined) {
                    return 0;
                }
                if (a.distanceToCurrent === undefined) {
                    return 1;
                }
                if (b.distanceToCurrent === undefined) {
                    return -1;
                }
                return a.distanceToCurrent - b.distanceToCurrent;
            });
        },
        [momentDb, momentIsNearExisting]
    );

    return { currentMoments, createMoment, getCloseMoments, updateMoment };
};
