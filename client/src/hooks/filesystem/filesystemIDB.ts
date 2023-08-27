import localforage from 'localforage';
import { IFileWrite, IReadFile } from './useFilesystem';

interface IReadFileIDB {
    filename: string;
    path: string[];
    options?: {
        response: 'plain' | 'base64' | 'none';
    };
}

interface ISaveFileIDB {
    file: IFileWrite;
    path: string[];
    options?: {
        onFinish: () => Promise<void> | void;
    };
}

interface IDeleteFileIDB {
    filenames: string[] | string;
    path: string[];
}

export const lfFilesystem = localforage.createInstance({
    name: 'filesystem',
    storeName: 'filesystem',
    version: 4,
});

export const readFileIDB = async (options: IReadFileIDB): Promise<IReadFile | null> => {
    const pathString = `${options.path.join('/')}/${options.filename}`;

    const base64 = (await lfFilesystem.getItem(pathString)) as string;

    // const buffer = Buffer.from(base64,"base64");

    if (base64) {
        const buffer = Buffer.from(base64, 'base64');
        const plain = buffer.toString('utf-8');
        const file = new File([buffer], options.filename, { type: 'image/jpeg' });

        return {
            data: options.options?.response === 'plain' ? plain : base64,
            url: URL.createObjectURL(file),
            file,
        };
    } else {
        return null;
    }
};

export const saveFileDB = async (options: ISaveFileIDB) => {
    const pathString = `${options.path.join('/')}/${options.file.name}`;

    const base64 = Buffer.from(options.file.arrayBuffer).toString('base64');

    await lfFilesystem.setItem(pathString, base64);

    if (options.options?.onFinish) {
        await options.options.onFinish();
    }
};

export const deleteFileIDB = async (options: IDeleteFileIDB) => {
    if (Array.isArray(options.filenames)) {
        options.filenames.forEach((filename) => {
            const pathString = `${options.path.join('/')}/${filename}`;

            lfFilesystem.removeItem(pathString).catch((e) => {
                // eslint-disable-next-line no-console
                console.log('LF Error delete', e);
            });
        });
    } else {
        const pathString = `${options.path.join('/')}/${options.filenames}`;
        await lfFilesystem.removeItem(pathString).catch((e) => {
            // eslint-disable-next-line no-console
            console.log('LF Error delete', e);
        });
    }
};

export const listIDBContentsByNeedle = async (
    needle: string,
    path: string[]
): Promise<string[]> => {
    const keys: string[] = [];

    // Assuming you have already initialized localforage with desired config

    // Get all the keys from the localforage index
    const allKeys: string[] = await lfFilesystem.keys();

    const realNeedle = `${path.join('/')}/${needle}`;

    // Iterate over the keys and check if they match the needle
    for (const key of allKeys) {
        if (key.includes(realNeedle)) {
            const keySplit = key.split('/');
            keys.push(keySplit[keySplit.length - 1] ?? '');
        }
    }

    return keys;
};
