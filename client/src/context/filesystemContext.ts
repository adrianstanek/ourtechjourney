import createStateContext from 'react-use/lib/factory/createStateContext';
import dayjs from 'dayjs';

export interface IFilesystemContext {
    lastUpdate: string;
}

export const DefaultFieldsValues: IFilesystemContext = {
    lastUpdate: dayjs().toISOString(),
};

export const [useFilesystemContext, FilesystemContextProvider] =
    createStateContext<IFilesystemContext>(DefaultFieldsValues);
