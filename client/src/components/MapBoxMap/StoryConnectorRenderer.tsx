import React, { useCallback, useMemo } from 'react';
import { useStories } from '../../hooks/storage/useStories';
import { Layer, Source } from 'react-map-gl';
import { ITailwindConfig } from '../../interfaces/Tailwind.interfaces';
import tailwindConfig from '../../../tailwind.config';

interface IStoryConnectorRenderer {}

export const StoryConnectorRenderer: React.FC<IStoryConnectorRenderer> = () => {
    const { currentStory } = useStories();

    const momentsToLineString = useCallback((): GeoJSON.Feature<GeoJSON.LineString> => {
        const coordinates = currentStory?.moments
            .filter((moment) => moment.latitude !== null && moment.longitude !== null)
            .map((moment) => [moment.longitude, moment.latitude]) as [number, number][];

        // If no valid coordinates, return a dummy GeoJSON feature.
        if (!coordinates || coordinates.length === 0) {
            return {
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: [],
                },
            };
        }

        return {
            type: 'Feature',
            properties: {},
            geometry: {
                type: 'LineString',
                coordinates,
            },
        };
    }, [currentStory?.moments]);

    const geoJSON = React.useMemo(() => momentsToLineString(), [momentsToLineString]);

    const color = useMemo(() => {
        const config = tailwindConfig as ITailwindConfig;

        return config.theme.extend.colors.primary.light ?? 'black';
    }, []);

    return (
        <>
            {currentStory && currentStory.moments.length > 0 && (
                <Source id="momentPath" type="geojson" data={geoJSON}>
                    <Layer
                        id="lineLayer"
                        type="line"
                        source="momentPath"
                        layout={{
                            'line-join': 'round',
                            'line-cap': 'round',
                        }}
                        paint={{
                            'line-color': color,
                            'line-width': 4,
                            'line-opacity': 0.5, // Set opacity
                            'line-dasharray': [0.5, 2], // Create dashed line
                        }}
                    />
                </Source>
            )}
        </>
    );
};
