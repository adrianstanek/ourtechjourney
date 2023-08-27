import { useCallback } from 'react';
import FileSystemDirectoryHandle from 'wicg-file-system-access';
import { useLatest } from 'react-use';
import dayjs from 'dayjs';
import { deleteFileIDB, listIDBContentsByNeedle, readFileIDB, saveFileDB } from './filesystemIDB';
import { toast } from 'react-toastify';
import { useFilesystemContext } from '../../context/filesystemContext';

// https://webkit.org/blog/12257/the-file-system-access-api-with-origin-private-file-system/
// https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API
// https://storage.spec.whatwg.org/#storage-endpoints
// https://developers.google.com/web/updates/2011/08/Debugging-the-Filesystem-API
// filesystem:http://localhost:8700/temporary/

export interface IFileWrite {
    name: string;
    arrayBuffer: ArrayBuffer;
}

export interface IDirectoryContents {
    directories: string[];
    files: string[];
}

export interface IReadFile {
    url: string;
    file?: File;
    data?: string | null;
}

export type TFsType = 'filesystem' | 'indexedDB';

export const useFilesystem = () => {
    const [filesystem, setFilesystem] = useFilesystemContext();

    const filesystemLatest = useLatest(filesystem);

    const isSafari =
        typeof window === 'undefined' ||
        typeof window.navigator === 'undefined' ||
        typeof window.navigator.userAgent === 'undefined'
            ? false
            : /^((?!chrome|android).)*safari/i.test(window.navigator.userAgent);

    // For the fallback to indexedDB
    const isStorageAvailable =
        typeof window === 'undefined' ||
        typeof window.navigator === 'undefined' ||
        typeof window.navigator.storage === 'undefined' ||
        typeof window.navigator.storage.getDirectory === 'undefined'
            ? false
            : window.navigator.storage.getDirectory !== undefined;

    // const isStorageAvailable = false;
    const forceSafariToIndexedDB = true;

    const fsType: TFsType = 'indexedDB';

    const getDirectoryHandle = useCallback(
        async (path: string[], create = false): Promise<FileSystemDirectoryHandle | null> => {
            // eslint-disable-next-line no-console
            console.log('fs@ getDirectoryHandle');

            const rootHandle: FileSystemDirectoryHandle =
                await window.navigator.storage.getDirectory();

            let handle: FileSystemDirectoryHandle | null = rootHandle;

            for (const item of path) {
                if (handle) {
                    handle = await handle
                        .getDirectoryHandle(item, {
                            create: create,
                        })
                        .then((res) => {
                            return res;
                        })
                        .catch((e) => {
                            // eslint-disable-next-line no-console
                            console.log(e);
                            return null;
                        });
                }
            }

            return handle;
        },
        []
    );

    const updateFilesystem = useCallback(() => {
        setFilesystem({ ...filesystemLatest.current, lastUpdate: dayjs().toISOString() });
    }, [filesystemLatest, setFilesystem]);

    const readFileFS = useCallback(
        async (
            filename: string,
            path: string[],
            options?: {
                response: 'plain' | 'base64' | 'none';
            }
        ): Promise<IReadFile | null> => {
            // eslint-disable-next-line no-console
            console.log('fs@ readFileFS');

            const handle = await getDirectoryHandle(path);

            if (handle === null) return null;

            const fileHandle: FileSystemFileHandle | false = await handle
                .getFileHandle(filename, {
                    create: false,
                })
                .catch(() => false);
            if (!fileHandle) {
                return null;
            }

            const file = await fileHandle.getFile();

            let response: string | null = null;

            if (options?.response === 'plain') {
                response = Buffer.from(await file.arrayBuffer()).toString('utf-8');
            }

            if (options?.response === 'base64') {
                response = new Buffer(response as string, 'base64').toString('utf-8');
            }

            return {
                url: URL.createObjectURL(file),
                file: file,
                data: response,
            };
        },
        [getDirectoryHandle]
    );

    const saveFileFS = useCallback(
        async (
            file: IFileWrite,
            path: string[],
            options?: {
                onFinish: () => Promise<void> | void;
            }
        ) => {
            // eslint-disable-next-line no-console
            console.log('fs@ saveFileFS');

            const handle = await getDirectoryHandle(path, true);

            if (handle === null) return null;

            const fileHandle: FileSystemFileHandle = await handle.getFileHandle(file.name, {
                create: true,
            });

            const writableStream = await fileHandle.createWritable();

            await writableStream
                .write(file.arrayBuffer)
                .then(async () => {
                    await writableStream.close();

                    updateFilesystem();

                    // Callback
                    void options?.onFinish();
                })
                .catch((e) => {
                    toast.error('Fehler beim Speichern der Datei');
                    console.error(e);
                });
        },
        [getDirectoryHandle, updateFilesystem]
    );

    const deleteFilesInDirFS = useCallback(
        async (filenames: string | string[], path: string[]): Promise<boolean | null> => {
            // eslint-disable-next-line no-console
            console.log('fs@ deleteFilesInDirFS');

            const toDelete: Promise<void>[] = [];

            const handle = await getDirectoryHandle(path);

            if (!handle) return null;

            if (typeof filenames === 'string') {
                // Single String
                toDelete.push(handle.removeEntry(filenames, { recursive: true }));
            } else {
                // Array-Like
                filenames.forEach((fileName) => {
                    toDelete.push(handle.removeEntry(fileName, { recursive: true }));
                });
            }

            await Promise.all(toDelete)
                .then((res) => {
                    // eslint-disable-next-line no-console
                    console.log('successful delete', res);
                })
                .catch((e) => {
                    // eslint-disable-next-line no-console
                    console.log(e);
                })
                .finally(() => {
                    updateFilesystem();
                });

            return true;
        },
        [getDirectoryHandle, updateFilesystem]
    );

    const deleteFilesInDir = useCallback(
        async (filenames: string | string[], path: string[]): Promise<boolean | null> => {
            if (fsType === 'indexedDB') {
                const names = await listIDBContentsByNeedle(filenames as string, path);

                await deleteFileIDB({
                    filenames: names,
                    path: path,
                });

                return true;
            }

            if (isStorageAvailable) {
                await deleteFilesInDirFS(filenames, path);
            } else {
                await deleteFileIDB({
                    filenames: filenames,
                    path: path,
                });
            }

            return null;
        },
        [deleteFilesInDirFS, isStorageAvailable]
    );

    const getDirectoryContents = useCallback(
        async (path: string[]) => {
            // eslint-disable-next-line no-console
            console.log('fs@ getDirectoryContents');

            if (fsType === 'indexedDB') {
                return null;
            }

            const rootHandle: FileSystemDirectoryHandle = await navigator.storage.getDirectory();

            let handle: FileSystemDirectoryHandle | null;

            if (path.length === 0) {
                handle = rootHandle;
            } else {
                handle = await getDirectoryHandle(path);
            }

            if (handle === null) return null;

            const contents: IDirectoryContents = {
                directories: [],
                files: [],
            };

            for await (const subHandle of handle.values()) {
                if (subHandle.kind == 'directory') {
                    contents.directories.push(subHandle.name);
                } else {
                    contents.files.push(subHandle.name);
                }
            }

            return contents;
        },
        [getDirectoryHandle]
    );

    const createDirectory = useCallback(
        async (newDir: string, path: string[]) => {
            // eslint-disable-next-line no-console
            console.log('fs@ createDirectory');

            const handle = await getDirectoryHandle(path, true);

            if (handle) {
                return void (await handle
                    .getDirectoryHandle(newDir, {
                        create: true,
                    })
                    .finally(() => {
                        updateFilesystem();
                    }));
            }

            return null;
        },
        [getDirectoryHandle, updateFilesystem]
    );

    const readFile = useCallback(
        async (
            filename: string,
            path: string[],
            options?: {
                response: 'plain' | 'base64' | 'none';
            }
        ): Promise<IReadFile | null> => {
            // TODO Temporary
            if (fsType === 'indexedDB') {
                const fileResponse = readFileIDB({
                    filename: filename,
                    path: path,
                    options: options,
                });

                return fileResponse;
            }

            let FileData: IReadFile | null = null;
            if (
                (isStorageAvailable && isSafari && !forceSafariToIndexedDB) ||
                (isStorageAvailable && !isSafari)
            ) {
                FileData = await readFileFS(filename, path, options);

                return FileData;
            } else {
                const r = await readFileIDB({
                    filename: filename,
                    path: path,
                    options: options,
                });

                return r;
            }
        },
        [forceSafariToIndexedDB, isSafari, isStorageAvailable, readFileFS]
    );

    const saveFile = useCallback(
        async (
            file: IFileWrite,
            path: string[],
            options?: {
                onFinish: () => Promise<void> | void;
            }
        ) => {
            // TODO Temporary
            if (fsType === 'indexedDB') {
                const fileResponse = await saveFileDB({
                    file: file,
                    path: path,
                    options: options,
                });

                return fileResponse;
            }

            if (
                (isStorageAvailable && isSafari && !forceSafariToIndexedDB) ||
                (isStorageAvailable && !isSafari)
            ) {
                await saveFileFS(file, path, options);
            } else {
                await saveFileDB({
                    file: file,
                    path: path,
                    options: options,
                });
            }
        },
        [forceSafariToIndexedDB, isSafari, isStorageAvailable, saveFileFS]
    );

    return {
        readFile,
        saveFile,
        deleteFilesInDir,
        getDirectoryContents,
        createDirectory,
        updateFilesystem,
    };
};
