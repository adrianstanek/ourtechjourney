// jest.config.ts
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // If you're using Babel, you might need the following line
    // transform: { '^.+\\.(ts|tsx)$': 'ts-jest' },
};

export default config;
